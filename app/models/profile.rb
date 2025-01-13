# == Schema Information
#
# Table name: profiles
#
#  id              :integer          not null, primary key
#  available_for   :text
#  full_name       :string
#  location        :string
#  name            :string
#  profile_bio     :text
#  profile_tagline :string
#  social_profiles :json             not null
#  tech_stacks     :json             not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  user_id         :integer          not null
#
# Indexes
#
#  index_profiles_on_user_id  (user_id)
#
# Foreign Keys
#
#  user_id  (user_id => users.id)
#
class Profile < ApplicationRecord
  # has_one_attached :avatar
  belongs_to :user
  validates :full_name, presence: true

  include Ransackable

  include MeiliSearch::Rails

  meilisearch do
    attribute :full_name, :name, :tech_stacks
    searchable_attributes [:full_name, :name, :tech_stacks]
  end

  RANSACK_ATTRIBUTES = %w[name full_name location profile_tagline created_at updated_at].freeze

  # validate :avatar_is_web_image

  # private

  # def avatar_is_web_image
  #   return unless avatar.attached?
  #   return if avatar.content_type.in?(Rails.application.config.active_storage.web_image_content_types)

  #   errors.add(:avatar, 'Must be a .JPG, .PNG or .GIF file')
  # end
end
