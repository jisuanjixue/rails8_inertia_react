# == Schema Information
#
# Table name: comments
#
#  id         :integer          not null, primary key
#  content    :text
#  depth      :integer          default(0)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  parent_id  :integer
#  post_id    :integer          not null
#  user_id    :integer          not null
#
# Indexes
#
#  index_comments_on_parent_id  (parent_id)
#  index_comments_on_post_id    (post_id)
#  index_comments_on_user_id    (user_id)
#
# Foreign Keys
#
#  post_id  (post_id => posts.id)
#  user_id  (user_id => users.id)
#
class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :post

  has_many :likes, as: :likeable, dependent: :destroy
  has_many :likers, through: :likes, source: :user
  belongs_to :parent, class_name: "Comment", optional: true
  has_many :replies, class_name: "Comment", foreign_key: :parent_id, dependent: :destroy

  validates :content, presence: true

  def likers_info
    likers.joins(:profile).select("users.id, profiles.name, profiles.profile_tagline").limit(10).map do |user|
      {
        id: user.id,
        name: user.profile.name,
        profile_tagline: user.profile.profile_tagline,
        avatar_url: user.profile_picture.attached? ? Rails.application.routes.url_helpers.rails_representation_url(user.profile_picture.variant(resize_to_limit: [100, 100]).processed, only_path: true) : nil
      }
    end
  end
end
