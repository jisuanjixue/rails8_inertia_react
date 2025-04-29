module Users
  class ProfilePicturesController < InertiaController
    before_action :set_user

    def update
      profile_picture = ProfilePicture.new(profile_picture: params[:profile_picture])
      profile_picture.attach_to(@user)

      redirect_to user_setting_path, inertia: {errors: profile_picture.errors}
    end

    def destroy
      @user.profile_picture.purge_later

      redirect_to user_setting_path
    end

    private

    def set_user
      @user = Current.user
    end
  end
end
