# == Schema Information
#
# Table name: posts
#
#  id          :integer          not null, primary key
#  body        :text
#  content     :text
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
#  index_posts_on_user_id      (user_id)
#
# Foreign Keys
#
#  category_id  (category_id => categories.id)
#
class Post < ApplicationRecord
  include Post::PostCover

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

  scope :with_content, -> { includes(:rich_text_content) }
  scope :with_attachments, -> { includes(%i[category post_cover_attachment user]) }
  scope :with_current_user_posts, -> { includes(%i[category post_cover_attachment]) }

  RANSACK_ATTRIBUTES = %w[body content title created_at updated_at].freeze

  has_rich_text :content
  belongs_to :user
  belongs_to :category

  has_many :likes, as: :likeable, dependent: :destroy
  has_many :likers, through: :likes, source: :user

  # 确保默认状态为 draft
  after_initialize :set_default_status, if: :new_record?

  def likers_info
    likers.joins(:profile).select("users.id, profiles.name").limit(10).map do |user|
      {
        id: user.id,
        name: user.profile.name
        # avatar_url: user.profile_picture.attached? ? Rails.application.routes.url_helpers.url_for(user.profile_picture.variant(resize: "100x100").processed, only_path: true) : nil
      }
    end
  end

  private

  def set_default_status
    self.status ||= :draft
  end
end
