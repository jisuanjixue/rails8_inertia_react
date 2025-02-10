module Users
  class RelationshipsController < ApplicationController
    before_action :set_user

    def create
      user = User.find(params[:followed_id])
      if @user.follow(user)
        redirect_to my_home_path, notice: "You are now following"
      else
        redirect_to my_home_path, alert: "Something went wrong"
      end
    end

    def destroy
      user = Relationship.find(params[:id]).followed
      if @user.unfollow(user)
        redirect_to my_home_path, notice: "You are no longer following"
      else
        redirect_to my_home_path, alert: "Something went wrong"
      end
    end

    private

    def set_user
      @user = Current.user
    end
  end
end
