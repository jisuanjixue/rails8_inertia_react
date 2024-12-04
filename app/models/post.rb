# == Schema Information
#
# Table name: posts
#
#  id         :integer          not null, primary key
#  body       :text
#  content    :text
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer          not null
#
# Indexes
#
#  index_posts_on_user_id  (user_id)
#
class Post < ApplicationRecord
  include Ransackable

  RANSACK_ATTRIBUTES = %w[body content title created_at updated_at].freeze

  has_rich_text :content
  belongs_to :user
end
