class RegistrationsController < ApplicationController
  skip_before_action :authenticate
  before_action :verify_captcha, only: [:create]

  def new
    @user = User.new
    render inertia: "Registrations/New", props: {
      user: sessionResource.new(@user)
    }
  end

  def create
    @user = User.new(user_params)

    if @user.save
      session_record = @user.sessions.create!
      cookies.signed.permanent[:session_token] = {
        value: session_record.id,
        httponly: true,
        secure: Rails.env.production?,
        same_site: :lax
      }

      send_email_verification
      redirect_to root_path, notice: "注册成功，欢迎您！"
    else
      render inertia: "Registrations/New",
        props: {user: sessionResource.new(@user)},
        status: :unprocessable_entity
    end
  end

  private

  def verify_captcha
    captcha = Captcha.new(params.delete(:recaptcha_token))
    unless captcha.valid?
      redirect_to new_registration_path,
        alert: "验证码验证失败，请重试",
        status: :unprocessable_entity
    end
  end

  def user_params
    params.permit(:email, :password, :password_confirmation)
  end

  def send_email_verification
    UserMailer.with(user: @user).email_verification.deliver_later
  end
end
