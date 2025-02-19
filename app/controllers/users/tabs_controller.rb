class Users::TabsController < ApplicationController
  # load_and_authorize_resource
  before_action :set_user

  def index
    @posts = Current.user.posts.with_current_user_posts.with_content.includes(:category, user: [:profile, :profile_picture_attachment]).preload(:likes).accessible_by(current_ability)

    # comments_lists = @user.comments.includes(:user, :likes, replies: [:user, :likes]).order(created_at: :desc).map do |comment|
    #   {
    #     id: comment.id,
    #     content: comment.content,
    #     created_at: comment.created_at,
    #     current_user_like_id: comment.likes.find_by(user_id: Current.user.id)&.id,
    #     user: {
    #       id: comment.user.id,
    #       name: comment.user.profile&.name,
    #       avatar_url: comment.user.profile_picture&.attached? ? url_for(comment.user.profile_picture) : nil
    #     },
    #     replies: comment.replies.order(created_at: :asc).map do |reply|
    #       {
    #         id: reply.id,
    #         content: reply.content,
    #         created_at: reply.created_at,
    #         depth: reply.depth,
    #         current_user_like_id: reply.likes.find_by(user_id: Current.user.id)&.id,
    #         user: {
    #           id: reply.user.id,
    #           name: reply.user.profile&.name,
    #           avatar_url: reply.user.profile_picture&.attached? ? url_for(reply.user.profile_picture) : nil
    #         }
    #       }
    #     end
    #   }
    # end

    # collections_lists = @user.bookmarked_posts.includes(:user, :likes).order(created_at: :desc).map do |collection|
    #   {
    #     id: collection.id,
    #     content: collection.content,
    #     created_at: collection.created_at,
    #     current_user_like_id: collection.likes.find_by(user_id: Current.user.id)&.id,
    #     user: {
    #       id: collection.user.id,
    #       name: collection.user.profile&.name,
    #       avatar_url: collection.user.profile_picture&.attached? ? url_for(collection.user.profile_picture) : nil
    #     }
    #   }
    # end

    # following_lists = @user.following.includes(:profile, :profile_picture_attachment).map do |following|
    #   {
    #     id: following.id,  # 直接使用 following.id
    #     name: following.profile&.name,  # 直接使用 following
    #     avatar_url: following.profile_picture&.attached? ? url_for(following.profile_picture) : nil
    #   }
    # end

    # followers_lists = @user.followers.includes(:profile, :profile_picture_attachment).map do |follower|
    #   {
    #     id: follower.id,
    #     name: follower.profile&.name,
    #     avatar_url: follower.profile_picture&.attached? ? url_for(follower.profile_picture) : nil
    #   }
    # end

    # 使用ActiveRecord的批量查询代替多次数据库查询
    comments = @user.comments
      .includes(:user, :likes, replies: [:user, :likes])
      .order(created_at: :desc)

    collections = @user.bookmarked_posts
      .includes(:user, :likes)
      .order(created_at: :desc)

    following = @user.following
      .includes(:profile, :profile_picture_attachment)

    followers = @user.followers
      .includes(:profile, :profile_picture_attachment)

    render inertia: "MyHome/Index", props: {
      user: @user,
      user_profile: @profile,
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
      collections: InertiaRails.defer { collections.map { |c| serialize_comment(c) } },
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
