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
  enum :status, draft: 0, preview: 1, published: 2
  attribute :sub_title, :string
  include Ransackable

  scope :with_content, -> { includes(:rich_text_content) }
  scope :with_attachments, -> { includes(%i[category post_cover_attachment user]) }

  RANSACK_ATTRIBUTES = %w[body content title created_at updated_at].freeze

  has_rich_text :content
  belongs_to :user
  belongs_to :category

  # 确保默认状态为 draft
  after_initialize :set_default_status, if: :new_record?

  private

  def set_default_status
    self.status ||= :draft
  end
end
