class PostResource < ApplicationResource
  attributes :id, :title, :body, :content, :sub_title, :created_at, :updated_at,
    :category_id, :status, :user_id

  attribute :likes_count do |post|
    post.likes.count
  end

  attribute :likers_info do |post|
    post.likers_info
  end

  attribute :category_name do |post|
    post.category&.name
  end

  attribute :post_cover_url do |post|
    if post&.post_cover&.attached?
      Rails.application.routes.url_helpers.rails_blob_path(post.post_cover, only_path: true)
    end
  end

  one :user, resource: UserResource do |post|
    {
      id: post.user.id,
      name: post.user.profile&.name,
      profile_tagline: post.user.profile&.profile_tagline,
      avatar_url: post.user.profile_picture&.attached? ?
        Rails.application.routes.url_helpers.rails_blob_path(post.user.profile_picture, only_path: true) : nil
    }
  end
end
