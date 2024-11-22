class HomeController < ApplicationController
    # Let CanCanCan load and authorize the instance variables
  # load_and_authorize_resource
  before_action :set_user
  def index
    render inertia: "HomeIndex", props: {}
  end
  def change_password
    if @user.update(user_params)
      redirect_to root_path, notice: "Your password has been changed"
    else
      redirect_to root_path, notice: "Your password not changed"
    end
  end

  private
   
    def user_params
      params.permit(:password, :password_confirmation, :password_challenge).with_defaults(password_challenge: "")
    end

    def set_user
      @user = Current.user
    end
end
