class ApplicationController < ActionController::Base
  include Auth
  before_action do
    Debugbar.msg("before_action", {params: params.permit!.to_h, callee: __callee__})
  end
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  include InertiaCsrf
  include InertiaFlash
  include InertiaJson
  include InertiaErrors

  rescue_from ActiveRecord::RecordInvalid do |exception|
    raise exception unless request.inertia?
    session[:errors] = exception.record.errors
    redirect_back(fallback_location: root_path)
  end

  rescue_from ActionController::BadRequest do |exception|
    flash[:error] = exception.message
    redirect_back(fallback_location: root_path)
  end

  inertia_share auth: -> {{ currentUser: Current.user, session: Current.session } }
  
  def current_ability
    @current_ability ||= Ability.new(Current.user)
  end
end
