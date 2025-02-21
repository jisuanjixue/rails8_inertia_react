# == Schema Information
#
# Table name: posts
#
#  id          :integer          not null, primary key
#  body        :text
#  content     :text
#  deleted_at  :datetime
#  status      :integer          default("draft")
#  sub_title   :string(100)      default("")
#  title       :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  category_id :integer          not null
#  user_id     :integer          not null
#
# Indexes
#
#  index_posts_on_category_id  (category_id)
#  index_posts_on_deleted_at   (deleted_at)
#  index_posts_on_user_id      (user_id)
#
# Foreign Keys
#
#  category_id  (category_id => categories.id)
#
class Post < ApplicationRecord
  acts_as_paranoid

  include Post::PostCover
  include Post::PostImages

  include Ransackable

  include MeiliSearch::Rails
  extend Pagy::Meilisearch

  enum :status, draft: 0, preview: 1, published: 2
  attribute :sub_title, :string

  meilisearch do
    attribute :title, :body, :content
    searchable_attributes [:title, :body, :content]
    filterable_attributes [:category_id]
  end

  scope :with_content, -> { preload(:rich_text_content, :category) }
  scope :with_attachments, -> { preload(:post_cover_attachment, :category) }
  scope :with_current_user_posts, -> { preload(:post_cover_attachment) }

  RANSACK_ATTRIBUTES = %w[body content title created_at updated_at].freeze

  has_rich_text :content
  belongs_to :user
  belongs_to :category

  has_many :likes, as: :likeable, dependent: :destroy
  has_many :likers, through: :likes, source: :user

  has_many :bookmarks, dependent: :destroy
  has_many :bookmarkers, through: :bookmarks, source: :user
  has_many :comments, dependent: :destroy

  # 确保默认状态为 draft
  after_initialize :set_default_status, if: :new_record?

  def likers_info
    likers.joins(:profile).select("users.id, profiles.name, profiles.profile_tagline").limit(10).map do |user|
      {
        id: user.id,
        name: user.profile.name,
        profile_tagline: user.profile.profile_tagline,
        # avatar_url: user.profile_picture.attached? ? Rails.application.routes.url_helpers.url_for(user.profile_picture) : nil
        avatar_url: user.profile_picture.attached? ? Rails.application.routes.url_helpers.rails_representation_url(user.profile_picture.variant(resize_to_limit: [100, 100]).processed, only_path: true) : nil
      }
    end
  end

  private

  def set_default_status
    self.status ||= :draft
  end
end
