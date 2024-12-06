class RegistrationsController < ApplicationController
  skip_before_action :authenticate

  def new
    @user = User.new
    render inertia: 'Registrations/New', props: {
      user: serialize_post(@user)
    }
  end

  def create
    @user = User.new(user_params)

    if @user.save
      session_record = @user.sessions.create!
      cookies.signed.permanent[:session_token] = { value: session_record.id, httponly: true }

      send_email_verification
      redirect_to root_path, notice: '注册成功，欢迎您!'
    else
      render :new, inertia: { errors: @user.errors }
    end
  end

  private

  def user_params
    params.permit(:email, :password, :password_confirmation, :avatar).tap { |p| p.delete(:avatar) if p[:avatar].blank? }
  end

  def send_email_verification
    UserMailer.with(user: @user).email_verification.deliver_later
  end

  def serialize_post(user)
    user.as_json(only: %i[
                   email password password_confirmation
                 ])
  end

  # def attach_avatar
  #   @user.avatar.attach(params[:user][:avatar])
  # end
end
