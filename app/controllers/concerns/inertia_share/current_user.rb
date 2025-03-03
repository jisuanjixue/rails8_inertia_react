module InertiaShare
  module CurrentUser
    extend ActiveSupport::Concern

    included do
      inertia_share auth: -> { auth_data }
    end

    private

    def auth_data
      recent_posts = fetch_recent_posts
      if Current.user
        {
          currentUser: Current.user,
          session: Current.session,
          profile_picture_url: profile_picture_url,
          recent_posts: recent_posts
        }
      else
        {
          currentUser: nil,
          session: nil,
          profile_picture_url: nil,
          recent_posts: recent_posts
        }
      end
    end

    def fetch_recent_posts
      Post.with_attachments.with_content.order(created_at: :desc).limit(4).map do |post|
        {
          id: post.id,
          title: post.title,
          post_cover_url: post&.post_cover&.attached? ? url_for(post&.post_cover) : nil,
          sub_title: post.sub_title
        }
      end
    end

    def profile_picture_url
      Current.user.profile_picture.attached? ? url_for(Current.user.profile_picture) : nil
    end
  end
end
