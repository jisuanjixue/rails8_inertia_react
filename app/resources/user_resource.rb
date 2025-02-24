class UserResource < ApplicationResource
  attributes :id

  attribute :name do |user|
    user.profile&.name
  end

  attribute :avatar_url do |user|
    user.profile_picture&.attached? ? Rails.application.routes.url_helpers.rails_blob_path(user.profile_picture, only_path: true) : nil
  end
end
