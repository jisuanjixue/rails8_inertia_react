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
#
class Post < ApplicationRecord
  has_rich_text :content
end
