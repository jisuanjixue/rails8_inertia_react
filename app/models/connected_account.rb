# == Schema Information
#
# Table name: connected_accounts
#
#  id           :integer          not null, primary key
#  access_token :string
#  expires_at   :datetime
#  provider     :string
#  uid          :string
#  username     :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  user_id      :integer          not null
#
# Indexes
#
#  index_connected_accounts_on_provider_and_uid       (provider,uid) UNIQUE
#  index_connected_accounts_on_provider_and_username  (provider,username) UNIQUE
#  index_connected_accounts_on_user_id                (user_id)
#
# Foreign Keys
#
#  user_id  (user_id => users.id)
#
class ConnectedAccount < ApplicationRecord
  belongs_to :user
end
