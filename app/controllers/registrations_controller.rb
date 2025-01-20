class RegistrationsController < ApplicationController
  skip_before_action :authenticate
  # before_action :only_for_guests
  before_action :verify_captcha, only: [:create]

  def new
    @user = User.new
    render inertia: "Registrations/New", props: {
      user: serialize_post(@user)
    }
  end

  def create
    @user = User.new(user_params)

    if @user.save
      session_record = @user.sessions.create!
      cookies.signed.permanent[:session_token] = {value: session_record.id, httponly: true}

      send_email_verification
      redirect_to root_path, notice: "\u6CE8\u518C\u6210\u529F\uFF0C\u6B22\u8FCE\u60A8!"
    else
      render :new, inertia: {errors: @user.errors}
    end
  end

  private

  def verify_captcha
    captcha = Captcha.new(params.delete(:recaptcha_token))
    unless captcha.valid?
      redirect_to new_registration_path, error: "Erreur de validation du CAPTCHA. Veuillez réessayer."
    end
  end

  def user_params
    params.permit(:email, :password, :password_confirmation)
  end

  def send_email_verification
    UserMailer.with(user: @user).email_verification.deliver_later
  end

  def serialize_post(user)
    user.as_json(only: %i[
      email password password_confirmation
    ])
  end
end
