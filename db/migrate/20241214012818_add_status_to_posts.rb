class AddStatusToPosts < ActiveRecord::Migration[8.0]
  def change
    add_column :posts, :status, :integer, default: 0
  end
end
