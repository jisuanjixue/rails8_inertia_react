require "active_support/concern"

module InertiaErrors
  extend ActiveSupport::Concern

  included do
    rescue_from ActiveRecord::RecordNotFound do
      render inertia: "Error", props: {status: 404}, status: :not_found
    end
    rescue_from ActionController::RoutingError do
      render inertia: "Error", props: {status: 404}, status: :not_found
    end
    # rescue_from StandardError do
    #   render inertia: "Error", props: {status: 500}, status: :internal_server_error
    # end
    rescue_from CanCan::AccessDenied do
      render inertia: "Error", props: {status: 403}, status: :forbidden
    end
  end
end
