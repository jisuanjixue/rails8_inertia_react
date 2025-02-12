class Users::TabsController < ApplicationController
  # load_and_authorize_resource
  before_action :set_user

  def index
    @posts = Current.user.posts.with_current_user_posts.with_content.includes(user: [:profile, :profile_picture_attachment]).accessible_by(current_ability)
    # # 根据请求参数中的 tab 来获取不同的数据
    # tab = params[:tab] || "my_posts" # 默认显示 posts
    # tab_lists = case tab
    # when "my_posts"
    #   @posts.map do |post|
    #     serialize_post(post).merge(
    #       category_name: post.category.name,
    #       post_cover_url: post&.post_cover&.attached? ? url_for(post&.post_cover) : nil,
    #       user: {
    #         id: post.user.id,
    #         name: post.user.profile&.name,
    #         profile_tagline: post.user.profile&.profile_tagline,
    #         avatar_url: post.user.profile_picture&.attached? ? url_for(post.user.profile_picture) : nil
    #       }
    #     )
    #   end
    # when "my_comments"
    #   []
    # when "my_collections"
    #   []
    # when "my_following"
    #   []
    # else
    #   []
    # end
    post_lists = @posts.map do |post|
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

    comments_lists = @user.comments.includes(:user).order(created_at: :desc).map do |comment|
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

    collections_lists = @user.bookmarked_posts.includes(:user).order(created_at: :desc).map do |collection|
      {
        id: collection.id,
        content: collection.content,
        created_at: collection.created_at,
        current_user_like_id: collection.likes.find_by(user_id: Current.user.id)&.id,
        user: {
          id: collection.user.id,
          name: collection.user.profile&.name,
          avatar_url: collection.user.profile_picture&.attached? ? url_for(collection.user.profile_picture) : nil
        }
      }
    end

    following_lists = @user.following.includes(:profile_picture_attachment).map do |following|
      {
        id: following.id,  # 直接使用 following.id
        name: following.profile&.name,  # 直接使用 following
        avatar_url: following.profile_picture&.attached? ? url_for(following.profile_picture) : nil
      }
    end

    followers_lists = @user.followers.includes(:profile_picture_attachment).map do |follower|
      {
        id: follower.id,
        name: follower.profile&.name,
        avatar_url: follower.profile_picture&.attached? ? url_for(follower.profile_picture) : nil
      }
    end

    render inertia: "MyHome/Index", props: {
      user: @user,
      user_profile: @profile,
      stats: {
        posts_count: @user.posts.count,
        comments_count: @user.comments.count,
        followers_count: @user.followers.count,
        following_count: @user.following.count,
        collections_count: @user.bookmarked_posts.count
      },
      posts: post_lists,
      comments: InertiaRails.defer { comments_lists },
      collections: InertiaRails.defer { collections_lists },
      following: InertiaRails.defer { following_lists },
      followers: InertiaRails.defer { followers_lists }
    }
  end

  private

  def set_user
    @user = Current.user
    @profile = @user.profile || @user.build_profile
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
