class Users::SettingController < ApplicationController
  before_action :set_user

  def index
    render inertia: 'User/Index', props: {
      user: @user,
      user_profile: @profile
      # avatar: @avatar
    }
  end

  private

  def set_user
    @user = Current.user
    @profile = @user.profile || @user.build_profile
    # avatar_url = polymorphic_url(@profile.avatar.variant(resize_to_fill: [64, 64]))
    # @avatar = @profile.avatar.attached? ? avatar_url : nil
  end

  # def user_params
  #   params.permit(:email, :name, :avatar).tap do |p|
  #     p.delete(:avatar) if p[:avatar].blank?
  #   end
  # end

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
