class Users::SettingController < ApplicationController
  before_action :set_user

  def index
    render inertia: 'User/Index', props: {
      user: @user,
      user_profile: @profile
    }
  end

  private

  def set_user
    @user = Current.user
    @profile = @user.profile || @user.build_profile
  end

  # def redirect_to_root
  #   if @user.email_previously_changed?
  #     resend_email_verification
  #     redirect_to user_setting_path, notice: 'Your email has been changed'
  #   else
  #     redirect_to root_path
  #   end
  # end

  # def resend_email_verification
  #   UserMailer.with(user: @user).email_verification.deliver_later
  # end
end
