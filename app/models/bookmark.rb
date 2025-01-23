# == Schema Information
#
# Table name: bookmarks
#
#  id         :integer          not null, primary key
#  mark       :integer          default(0)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  post_id    :integer          not null
#  user_id    :integer          not null
#
# Indexes
#
#  index_bookmarks_on_post_id  (post_id)
#  index_bookmarks_on_user_id  (user_id)
#
# Foreign Keys
#
#  post_id  (post_id => posts.id)
#  user_id  (user_id => users.id)
#
class Bookmark < ApplicationRecord
  belongs_to :user
  belongs_to :post
end
