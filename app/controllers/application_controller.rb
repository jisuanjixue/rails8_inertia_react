class ApplicationController < ActionController::Base
  inertia_config(encrypt_history: true)

  include Pagy::Backend

  include Auth
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  include InertiaCsrf
  include InertiaFlash
  include MeilisearchHandler
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
    recent_posts = Post.with_content.with_attachments.order(created_at: :desc).limit(4).map do |post|
      {
        id: post.id,
        title: post.title,
        post_cover_url: post&.post_cover&.attached? ? url_for(post&.post_cover) : nil,
        sub_title: post.sub_title
      }
    end
    if Current.user
      # profile = Current.user.profile
      # avatar_url = profile&.avatar&.attached? ? polymorphic_url(profile.avatar.variant(resize_to_fill: [64, 64])) : nil
      profile_picture_url = Current.user&.profile_picture&.attached? ? url_for(Current.user.profile_picture) : nil
      {currentUser: Current.user, session: Current.session, profile_picture_url: profile_picture_url, recent_posts: recent_posts}
    else
      {currentUser: nil, session: nil, profile_picture_url: nil, recent_posts: recent_posts}
    end
  }

  private

  def inertia_error_page(exception)
    raise exception if Rails.env.local?

    status = ActionDispatch::ExceptionWrapper.new(nil, exception).status_code

    render inertia: "Error", props: {status:}, status:
  end

  def current_ability
    @current_ability ||= Ability.new(Current.user)
  end
end
