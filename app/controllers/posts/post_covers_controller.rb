module Posts
  class PostCoversController < ApplicationController
    before_action :set_post, only: %i[update destroy]

    def update
      post_cover = PostCover.new(post_cover: params[:post_cover])
      if post_cover.attach_to(@post)
        redirect_to edit_post_url(@post), notice: "\u6587\u7AE0\u5C01\u9762\u5DF2\u6210\u529F\u66F4\u65B0."
      else
        redirect_to edit_post_url(@post), inertia: {errors: post_cover.errors}
      end
    end

    def create
      @post = Current.user.posts.create(status: :draft, category_id: Category.first.id)
      # Rails.logger.info "Post errors: #{@post.errors.full_messages}" # 添加这行
      if @post.persisted?
        post_cover = PostCover.new(post_cover: params[:post_cover])
        # Rails.logger.info "PostCover errors: #{post_cover.errors.full_messages}" if !post_cover.valid? # 添加这行
        if post_cover.attach_to(@post)
          # redirect_to new_post_url, notice: "文章封面已成功更新."
          render inertia: "Post/New", props: {post: PostResource.new(@post).serializable_hash, categories: Category.all, post_cover_url: @post&.post_cover&.attached? ? url_for(@post&.post_cover) : nil, post_images_url: @post&.post_images&.attached? ? url_for(@post&.post_images) : nil}
        else
          redirect_to new_post_url, inertia: {errors: post_cover.errors}
        end
      else
        redirect_to new_post_url, inertia: {errors: @post.errors}
      end
    end

    def destroy
      @post.post_cover.purge_later
      redirect_to edit_post_url(@post)
    end

    private

    def set_post
      @post = Current.user.posts.find(params[:post_id])
    end
  end
end
