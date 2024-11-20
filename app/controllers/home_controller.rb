class HomeController < ApplicationController
  before_action :set_user
  def index
    render inertia: "HomeIndex", props: {
      currentUser: @user,
      session: Current.session
    }
  end
  def change_password
    if @user.update(user_params)
      redirect_to root_path, notice: "Your password has been changed"
    else
      redirect_to root_path, notice: "Your password not changed"
    end
  end

  private
    def set_user
      @user = Current.user
    end

    def user_params
      params.permit(:password, :password_confirmation, :password_challenge).with_defaults(password_challenge: "")
    end
end
