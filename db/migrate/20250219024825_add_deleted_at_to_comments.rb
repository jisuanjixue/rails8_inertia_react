class AddDeletedAtToComments < ActiveRecord::Migration[8.0]
  def change
    add_column :comments, :deleted_at, :datetime
    add_index :comments, :deleted_at
  end
end
