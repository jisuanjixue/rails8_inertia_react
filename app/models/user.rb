# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  admin           :boolean          default(FALSE), not null
#  email           :string           not null
#  password_digest :string           not null
#  verified        :boolean          default(FALSE), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_users_on_email  (email) UNIQUE
#
class User < ApplicationRecord
  has_secure_password
  has_one :profile, dependent: :destroy

  # has_one_attached :avatar
  # after_save :attach_avatar, if: :avatar_attached?

  generates_token_for :email_verification, expires_in: 2.days do
    email
  end

  generates_token_for :password_reset, expires_in: 20.minutes do
    password_salt.last(10)
  end

  has_many :sessions, dependent: :destroy

  has_many :connected_accounts, dependent: :destroy
  has_many :posts, dependent: :destroy

  encrypts :email, deterministic: true

  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, allow_nil: true, length: { minimum: 6 }
  # validate :avatar_is_web_image

  normalizes :email, with: -> { _1.strip.downcase }

  before_validation if: :email_changed?, on: :update do
    self.verified = false
  end

  after_update if: :password_digest_previously_changed? do
    sessions.where.not(id: Current.session).delete_all
  end

  # private

  # def avatar_is_web_image
  #   return unless avatar.attached?
  #   return if avatar.content_type.in?(Rails.application.config.active_storage.web_image_content_types)

  #   errors.add(:avatar, 'Must be a .JPG, .PNG or .GIF file')
  # end
end
