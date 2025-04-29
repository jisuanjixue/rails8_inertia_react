# frozen_string_literal: true

class InertiaController < ApplicationController
  inertia_config default_render: true
  include InertiaJson
  include InertiaErrors
  include InertiaShare::CurrentUser
  include InertiaShare::Flash
  include InertiaCsrf

  private

  def inertia_errors(model, full_messages: true)
    {
      errors: model.errors.to_hash(full_messages).transform_values(&:to_sentence)
    }
  end

  def inertia_error_page(exception)
    raise exception if Rails.env.local?

    status = ActionDispatch::ExceptionWrapper.new(nil, exception).status_code

    render inertia: "Error", props: {status:}, status:
  end
end
