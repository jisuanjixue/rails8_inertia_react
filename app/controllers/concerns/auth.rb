require "active_support/concern"

module Auth
  extend ActiveSupport::Concern

  included do
    before_action :set_current_request_details
    before_action :authenticate, only: ![:all_posts]
  end

  private

  def authenticate
    if session_record = Session.find_by_id(cookies.signed[:session_token])
      Current.session = session_record
    else
      redirect_to sign_in_path
    end
  end

  # 只允许访客访问（已登录用户不能注册）
  def only_for_guests
    redirect_to root_path, info: "你已经登录，请先退出后再进行操作" unless Current.user
  end

  def set_current_request_details
    Current.user_agent = request.user_agent
    Current.ip_address = request.ip
  end

  def after_sign_in_path_for(resource)
    stored_location_for(resource) || root_path
  end

  def after_sign_out_path_for(_resource_or_scope)
    new_user_session_path
  end
end
