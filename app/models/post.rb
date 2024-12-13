# == Schema Information
#
# Table name: posts
#
#  id          :integer          not null, primary key
#  body        :text
#  content     :text
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
  has_one_attached :cover
  attribute :sub_title, :string
  include Ransackable

  RANSACK_ATTRIBUTES = %w[body content title created_at updated_at].freeze

  has_rich_text :content
  belongs_to :user
  belongs_to :category
end
