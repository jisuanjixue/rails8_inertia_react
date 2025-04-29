class Users::TabsController < InertiaController
  # load_and_authorize_resource
  before_action :set_user

  def index
    @posts = Current.user.posts
      .with_content
      .includes(user: [:profile, :profile_picture_attachment])
      .accessible_by(current_ability)

    github_repos = GithubService.user_repos(@user.github_username) if @user.github_username.present?

    # 使用ActiveRecord的批量查询代替多次数据库查询
    comments = @user.comments
      .includes(:likes, replies: [:likes])
      .order(created_at: :desc)

    collections = @user.bookmarked_posts
      .preload(:likes)
      .order(created_at: :desc)

    following = @user.following
      .includes(:profile, :profile_picture_attachment)

    followers = @user.followers
      .includes(:profile, :profile_picture_attachment)

    render inertia: "MyHome/Index", props: {
      user: @user,
      user_profile: @profile,
      github_repos: github_repos || [],
      stats: {
        posts_count: @user.posts.size,
        comments_count: @user.comments.size,
        followers_count: @user.followers.size,
        following_count: @user.following.size,
        collections_count: @user.bookmarked_posts.size
      },
      posts: @posts.map { |post|
        serialize_post(post).merge(
          category_name: post.category.name,
          post_cover_url: post.post_cover&.attached? ? url_for(post.post_cover) : nil,
          user: serialize_user(post.user)
        )
      },
      comments: InertiaRails.defer { comments.map { |c| serialize_comment(c) } },
      collections: InertiaRails.defer { collections.map { |c| serialize_post(c) } },
      following: InertiaRails.defer { following.map { |f| serialize_user(f) } },
      followers: InertiaRails.defer { followers.map { |f| serialize_user(f) } }
    }
  end

  private

  def set_user
    @user = Current.user
    @profile = @user.profile || @user.build_profile
  end

  def serialize_user(user)
    {
      id: user.id,
      name: user.profile&.name,
      avatar_url: user.profile_picture&.attached? ? url_for(user.profile_picture) : nil
    }
  end

  def serialize_comment(comment)
    {
      id: comment.id,
      content: comment.content,
      created_at: comment.created_at,
      current_user_like_id: comment.likes.find { |l| l.user_id == Current.user.id }&.id,
      user: serialize_user(comment.user),
      replies: comment.replies.map { |reply| serialize_reply(reply) }
    }
  end

  def serialize_reply(reply)
    {
      id: reply.id,
      content: reply.content,
      created_at: reply.created_at,
      depth: reply.depth,
      current_user_like_id: reply.likes.find { |l| l.user_id == Current.user.id }&.id,
      user: serialize_user(reply.user)
    }
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
