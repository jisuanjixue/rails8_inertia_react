class Admin::UsersController < ApplicationController
  before_action :set_user, only: %i[show edit update destroy]

  inertia_share flash: -> { flash.to_hash }

  # GET /users
  def index
    begin
      @users = User.all.includes(%i[profile profile_picture_attachment])
      @q = @users.ransack(params[:q])
      @search_users = @q.result(distinct: true).order(created_at: :desc)
      pagy, paged_users = pagy(@search_users)
    rescue Pagy::OverflowError
      pagy = Pagy.new(count: @search_users.count, page: params[:page], items: params[:limit])
      paged_users = @search_users.offset(pagy.offset).limit(pagy.items)
    end

    render inertia: "Admin/User/Index", props: {
      users: InertiaRails.merge {
        paged_users.map do |user|
          serialize_user(user).merge(
            id: user.id,
            email: user.email,
            name: user.profile&.name,
            profile_tagline: user.profile&.profile_tagline,
            avatar_url: user.profile_picture&.attached? ? url_for(user.profile_picture) : nil,
            profile_bio: user.profile&.profile_bio,
            location: user.profile&.location,
            tech_stacks: user.profile&.tech_stacks,
            social_profiles: user.profile&.social_profiles
          )
        end
      },
      meta: pagy_metadata(pagy),
      total: @search_users.count
    }
  end

  # GET /users/1
  def show
    render inertia: "Admin/User/Show", props: {
      user: serialize_user(@user)
    }
  end

  # GET /users/1/edit
  def edit
    render inertia: "Admin/User/Edit", props: {
      user: serialize_user(@user)
    }
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      redirect_to admin_users_path, notice: "user was successfully updated."
    else
      redirect_to admin_users_path, inertia: {errors: @user.errors}
    end
  end

  # DELETE /users/1
  def destroy
    if @user.destroy!
      redirect_to admin_users_path, notice: "user was successfully destroyed."
    else
      redirect_to admin_users_path, inertia: {errors: @user.errors}
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :admin, :id)
  end

  def serialize_user(user)
    user.as_json(
      only: %i[id email admin created_at updated_at],
      include: user.profile ? {profile: {only: %i[full_name available_for location name profile_bio profile_tagline tech_stacks social_profiles user_id]}} : {}
    )
  end
end
