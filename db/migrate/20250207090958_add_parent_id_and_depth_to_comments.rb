class AddParentIdAndDepthToComments < ActiveRecord::Migration[8.0]
  def change
    add_column :comments, :parent_id, :integer
    add_column :comments, :depth, :integer, default: 0
    add_index :comments, :parent_id
  end
end
