class Admin::UsersController < ApplicationController
  include Paginatable

  before_action :set_user, only: %i[show edit update destroy]

  inertia_share flash: -> { flash.to_hash }

  def index
    @users = User.includes([:profile, :profile_picture_attachment])
    @q = @users.ransack(params[:q])
    @search_users = @q.result(distinct: true).order(created_at: :desc)
    pagy, paged_users = paginate(@search_users)

    render inertia: "Admin/User/Index", props: {
      users: serialize_users(paged_users),
      meta: pagy_metadata(pagy),
      total: @search_users.count
    }
  end

  def show
    render inertia: "Admin/User/Show", props: {user: serialize_user(@user)}
  end

  def edit
    render inertia: "Admin/User/Edit", props: {user: serialize_user(@user)}
  end

  def update
    if @user.update(user_params)
      redirect_to_users_index("用户更新成功")
    else
      redirect_with_errors
    end
  end

  def destroy
    if @user.destroy!
      redirect_to_users_index("用户删除成功")
    else
      redirect_with_errors
    end
  end

  private

  def serialize_users(users)
    users.map { |user| serialize_user(user) }
  end

  def serialize_user(user)
    base_json = user.as_json(
      only: %i[id email admin created_at updated_at],
      include: user.profile ? {profile: {only: %i[full_name available_for location name profile_bio profile_tagline tech_stacks social_profiles user_id]}} : {}
    )

    base_json.merge(
      name: user.profile&.name,
      profile_tagline: user.profile&.profile_tagline,
      avatar_url: user.profile_picture&.attached? ? url_for(user.profile_picture) : nil,
      profile_bio: user.profile&.profile_bio,
      location: user.profile&.location,
      tech_stacks: user.profile&.tech_stacks,
      social_profiles: user.profile&.social_profiles
    )
  end

  def redirect_to_users_index(notice = nil)
    redirect_to admin_users_path, notice: notice
  end

  def redirect_with_errors
    redirect_to admin_users_path, inertia: {errors: @user.errors}
  end

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :admin, :id)
  end
end
