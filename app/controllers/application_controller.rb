class ApplicationController < ActionController::Base
  before_action :permissions_policy_header
  inertia_config(encrypt_history: true)

  include Pagy::Backend

  include Auth
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  include MeilisearchHandler

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

  private

  def permissions_policy_header
    directives = Rails.application.config.permissions_policy.directives.map do |directive, sources|
      if sources.include?("'none'")
        "#{directive}=()"
      elsif sources.include?("'self'")
        "#{directive}=(self)"
      elsif sources.include?("'all'")
        "#{directive}=(*)"
      else
        "#{directive}=(#{sources.join(" ")})"
      end
    end.compact.join(", ")

    response.headers["Permissions-Policy"] = directives
  end

  def current_ability
    @current_ability ||= Ability.new(Current.user)
  end
end
