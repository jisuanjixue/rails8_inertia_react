class Users::ProfileController < ApplicationController
  before_action :set_profile, only: %i[edit update]

  def edit
  end

  def update
    if @user.update(profile_params)
      redirect_to user_setting_path, notice: 'Profile updated successfully'
    else
      redirect_to user_setting_path, inertia: { errors: @user.errors }
    end
  end

  private

  def set_profile
    @profile = current_user.profile || current_user.build_profile
  end

  # def user_params
  #   params.permit(:email, :name, :avatar).tap do |p|
  #     p.delete(:avatar) if p[:avatar].blank?
  #   end
  # end

  def profile_params
    params.require(:profile).permit(:full_name, :profile_tagline, :location, :profile_bio, :available_for,
                                    tech_stack: [], social_profiles: []).tap do |p|
      p.delete(:avatar) if p[:avatar].blank?
    end
  end

  # def redirect_to_root
  #   if @user.email_previously_changed?
  #     resend_email_verification
  #     redirect_to user_setting_path, notice: 'Your email has been changed'
  #   else
  #     redirect_to root_path
  #   end
  # end
end
