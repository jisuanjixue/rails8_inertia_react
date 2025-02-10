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
  include User::ProfilePicture
  has_secure_password
  # has_many :likes, dependent: :destroy
  has_many :liked_posts, through: :likes, source: :likeable, source_type: "Post"
  has_many :liked_comments, through: :likes, source: :likeable, source_type: "Comment"
  # alias association for user who submitted the like
  # has_many :submitted_likes, class_name: "Like", foreign_key: :user_id
  # association for user, instrument_post and comment that has the review
  has_many :likes, as: :likeable, dependent: :destroy
  has_one :profile, dependent: :destroy

  has_many :bookmarks, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :bookmarked_posts, through: :bookmarks, source: :post
  # 我关注的用户
  has_many :active_relationships, class_name: "Relationship", foreign_key: "follower_id", dependent: :destroy
  has_many :following, through: :active_relationships, source: :followed

  # 关注我的人
  has_many :passive_relationships, class_name: "Relationship", foreign_key: "followed_id", dependent: :destroy
  has_many :followers, through: :passive_relationships, source: :follower

  # has_many :followers
  # has_many :following

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

  validates :email, presence: true, uniqueness: true, format: {with: URI::MailTo::EMAIL_REGEXP}
  validates :password, allow_nil: true, length: {minimum: 6}

  normalizes :email, with: -> { _1.strip.downcase }

  before_validation if: :email_changed?, on: :update do
    self.verified = false
  end

  after_update if: :password_digest_previously_changed? do
    sessions.where.not(id: Current.session).delete_all
  end

  # 关注另一个用户
  def follow(other_user)
    active_relationships.create(followed_id: other_user.id)
  end

  # 取消关注另一个用户
  def unfollow(other_user)
    active_relationships.find_by(followed_id: other_user.id).destroy
  end

  # 如果当前用户关注了指定的用户，返回 true
  def following?(other_user)
    following.include?(other_user)
  end
end
