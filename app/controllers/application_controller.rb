class ApplicationController < ActionController::Base
  include Pagy::Backend

  include Auth
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  include InertiaCsrf
  include InertiaFlash
  include InertiaJson
  include InertiaErrors

  rescue_from StandardError, with: :inertia_error_page

  rescue_from ActiveRecord::RecordInvalid do |exception|
    raise exception unless request.inertia?

    session[:errors] = exception.record.errors
    redirect_back(fallback_location: root_path)
  end

  rescue_from ActionController::BadRequest do |exception|
    flash[:error] = exception.message
    redirect_back(fallback_location: root_path)
  end

  inertia_share auth: lambda {
    if Current.user
      profile = Current.user.profile
      avatar_url = profile&.avatar&.attached? ? polymorphic_url(profile.avatar.variant(resize_to_fill: [64, 64])) : nil
      { currentUser: Current.user, session: Current.session, avatar: avatar_url }
    else
      { currentUser: nil, session: nil, avatar: nil }
    end
  }

  private

  def inertia_error_page(exception)
    raise exception if Rails.env.local?

    status = ActionDispatch::ExceptionWrapper.new(nil, exception).status_code

    render inertia: 'Error', props: { status: }, status:
  end

  def current_ability
    @current_ability ||= Ability.new(Current.user)
  end
end
