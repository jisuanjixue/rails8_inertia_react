class Users::ProfileController < ApplicationController
  before_action :set_profile, only: %i[update upload_avatar]

  # def new
  #   @profile = Current.user.profile.new(avatar: nil) # 默认创建为草稿
  #   render inertia: 'User/Index', props: {
  #     user: Current.user,
  #     user_profile: @profile
  #     # avatar: @avatar
  #   }
  # end

  def update
    if @profile.update(profile_params)
      # @profile.avatar.attach(profile_params[:avatar]) if profile_params[:avatar].present?
      redirect_to user_setting_path, notice: 'Profile updated successfully'
    else
      redirect_to user_setting_path, inertia: { errors: @profile.errors }
    end
  end

  def upload_avatar
    if params[:avatar].present?
      @profile.avatar.attach(params[:avatar])
      render inertia: 'User/Index', props: {
        user: Current.user,
        user_profile: @profile.merge(avatar: polymorphic_url(@profile.avatar.variant(resize_to_fill: [64, 64])))
        # avatar: @avatar
      }
    else
      redirect_to user_setting_path, inertia: { errors: @profile.errors }
    end
  end

  private

  def set_profile
    @profile = Current.user.profile || Current.user.build_profile(profile_params.merge(avatar: nil))
  end

  def profile_params
    params.permit(:full_name, :profile_tagline, :location, :profile_bio, :available_for, :name,
                  tech_stacks: %i[id text], social_profiles: %i[id text])
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
