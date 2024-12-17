# == Schema Information
#
# Table name: drafts
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Draft < ApplicationRecord
end
