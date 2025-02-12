module Users
  class RelationshipsController < ApplicationController
    before_action :set_user

    def follow
      user = User.find_by(id: params[:followed_id])
      if user.nil?
        redirect_to request.referer || root_path, alert: "User not found"
        return
      end
      
      if @user.follow(user)
        redirect_to request.referer || root_path, notice: "You are now following"
      else
        redirect_to request.referer || root_path, alert: "Something went wrong"
      end
    end

    def unfollow
      user = User.find_by(id: params[:id])
      if user.nil?
        redirect_to request.referer || root_path, alert: "User not found"
        return
      end
      if @user.unfollow(user)
        redirect_to request.referer || root_path, notice: "You are no longer following"
      else
        redirect_to request.referer || root_path, alert: "Something went wrong"
      end
    end

    private

    def set_user
      @user = Current.user
    end
  end
end
