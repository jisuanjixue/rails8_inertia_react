class Identity::PasswordChangeController < InertiaController
  # Let CanCanCan load and authorize the instance variables

  before_action :set_user, only: [:change_password]

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
