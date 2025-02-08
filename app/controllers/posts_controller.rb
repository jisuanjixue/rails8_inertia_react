class PostsController < ApplicationController
  # before_action do
  #   Debugbar.msg('before_action', { params: params.permit!.to_h, callee: __callee__ })
  # end
  load_and_authorize_resource except: [:all_posts, :collections] # 保留其他方法的权限检查
  before_action :set_post, only: %i[show edit update destroy publish]
  before_action :set_categories, only: [:new, :edit]

  inertia_share flash: -> { flash.to_hash }

  def all_posts
    begin
      @posts = Post.all.with_content.with_attachments.includes(user: [:profile, :profile_picture_attachment])
      @q = @posts.ransack(params[:q])
      @search_posts = @q.result(distinct: true).order(created_at: :desc)
      pagy, paged_posts = pagy(@search_posts)
    rescue Pagy::OverflowError
      pagy = Pagy.new(count: @search_posts.count, page: params[:page], items: params[:limit])
      paged_posts = @search_posts.offset(pagy.offset).limit(pagy.items)
    end

    render inertia: "Post/List", props: {
      posts: InertiaRails.merge {
        paged_posts.map do |post|
          serialize_post(post).merge(
            category_name: post.category.name,
            post_cover_url: post&.post_cover&.attached? ? url_for(post&.post_cover) : nil,
            user: {
              id: post.user.id,
              name: post.user.profile&.name,
              profile_tagline: post.user.profile&.profile_tagline,
              avatar_url: post.user.profile_picture&.attached? ? url_for(post.user.profile_picture) : nil
            }
          )
        end
      },
      meta: pagy_metadata(pagy),
      total: @search_posts.count
    }
  end

  # GET /posts
  def index
    @posts = Current.user.posts.with_current_user_posts.with_content.includes(user: [:profile, :profile_picture_attachment]).accessible_by(current_ability)
    render inertia: "Post/Index", props: {
      posts: @posts.map do |post|
        serialize_post(post).merge(
          category_name: post.category.name,
          post_cover_url: post&.post_cover&.attached? ? url_for(post&.post_cover) : nil,
          user: {
            id: post.user.id,
            name: post.user.profile&.name,
            profile_tagline: post.user.profile&.profile_tagline,
            avatar_url: post.user.profile_picture&.attached? ? url_for(post.user.profile_picture) : nil
          }
        )
      end
    }
  end

  # GET /posts/1
  def show
    render inertia: "Post/Show", props: {
      post: serialize_post(@post).merge(
        category_name: @post.category.name,
        post_cover_url: @post&.post_cover&.attached? ? url_for(@post&.post_cover) : nil,
        user_id: Current.user.id,
        can_edit: can?(:edit, @post),
        can_destroy: can?(:destroy, @post),
        likes_count: @post.likes.count,
        likers_info: @post.likers_info,
        current_user_like_id: @post.likes.find_by(user_id: Current.user.id)&.id,
        bookmarks_count: @post.bookmarks.count,
        current_user_bookmark_id: @post.bookmarks.find_by(user_id: Current.user.id)&.id,
        comments: @post.comments.includes(:user).order(created_at: :desc).map do |comment|
          {
            id: comment.id,
            content: comment.content,
            created_at: comment.created_at,
            current_user_like_id: comment.likes.find_by(user_id: Current.user.id)&.id,
            user: {
              id: comment.user.id,
              name: comment.user.profile&.name,
              avatar_url: comment.user.profile_picture&.attached? ? url_for(comment.user.profile_picture) : nil
            },
            replies: comment.replies.order(created_at: :asc).map do |reply|
              {
                id: reply.id,
                content: reply.content,
                created_at: reply.created_at,
                depth: reply.depth,
                current_user_like_id: reply.likes.find_by(user_id: Current.user.id)&.id,
                user: {
                  id: reply.user.id,
                  name: reply.user.profile&.name,
                  avatar_url: reply.user.profile_picture&.attached? ? url_for(reply.user.profile_picture) : nil
                }
              }
            end
          }
        end
      )
    }
  end

  # GET /posts/new
  def new
    @post = Current.user.posts.with_content.new(status: :draft) # 默认创建为草稿
    @drafts = Current.user.posts.draft.order(created_at: :desc) # 获取用户的草稿列表
    render inertia: "Post/New", props: {
      post: serialize_post(@post),
      categories: InertiaRails.defer { @categories },
      drafts: InertiaRails.defer { @drafts.map { |draft| serialize_post(draft) } },
      post_cover_url: nil
    }
  end

  # GET /posts/1/edit
  def edit
    render inertia: "Post/Edit", props: {
      post: serialize_post(@post),
      categories: InertiaRails.defer { @categories },
      post_cover_url: @post&.post_cover&.attached? ? url_for(@post&.post_cover) : nil
    }
  end

  # POST /posts
  def create
    @post = Current.user.posts.new(post_params)
    @post.category = Category.find_by(id: post_params[:category_id])
    @post.status = :draft # 默认创建为草稿

    if @post.save
      redirect_to @post, notice: "Post was successfully created."
    else
      redirect_to new_post_url, inertia: {errors: @post.errors, categories: Category.all}
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.update(post_params)
      redirect_to @post, notice: "Post was successfully updated."
    else
      redirect_to edit_post_url(@post), inertia: {errors: @post.errors}
    end
  end

  # POST /posts/1/publish
  def publish
    if @post.update(status: :published)
      redirect_to @post, notice: "Post was successfully published."
    else
      redirect_to new_post_url, inertia: {errors: @post.errors, categories: Category.all}
    end
  end

  # DELETE /posts/1
  def destroy
    @post.destroy!
    redirect_to posts_url, notice: "Post was successfully destroyed."
  end

  def collections
    @posts = Current.user.bookmarked_posts.includes(:user).order(created_at: :desc)
    render inertia: "User/Collections", props: {
      posts: @posts.map do |post|
        serialize_post(post).merge(
          category_name: post.category.name,
          post_cover_url: post&.post_cover&.attached? ? url_for(post&.post_cover) : nil,
          user: {
            id: post.user.id,
            name: post.user.profile&.name,
            profile_tagline: post.user.profile&.profile_tagline,
            avatar_url: post.user.profile_picture&.attached? ? url_for(post.user.profile_picture) : nil
          }
        )
      end
    }
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_post
    @post = Post.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def post_params
    params.require(:post).permit(:title, :body, :content, :category_id, :sub_title, :status)
  end

  def set_categories
    @categories = Category.all
  end

  def serialize_post(post)
    post.as_json(only: %i[
      id title body content sub_title created_at updated_at category_id status likes_count
    ]).merge(
      user_id: post.user_id,
      likers_info: post.likers_info.as_json
    )
  end
end
