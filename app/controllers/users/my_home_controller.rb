module Users
  class MyHomeController < ApplicationController
    before_action :set_user

    def index
      render inertia: "MyHome/Index", props: {
        user: @user,
        user_profile: @profile,
        stats: {
          posts_count: @user.posts.count,
          comments_count: @user.comments.count,
          followers_count: @user.followers.count,
          following_count: @user.following.count,
          collections_count: @user.bookmarked_posts.count
        }
      }
    end

    private

    def set_user
      @user = Current.user
      @profile = @user.profile || @user.build_profile
    end
  end
end
