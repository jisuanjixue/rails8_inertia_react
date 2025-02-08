class AddParentIdAndDepthToComments < ActiveRecord::Migration[8.0]
  def change
    add_reference :comments, :parent, foreign_key: { to_table: :comments }
    add_column :comments, :depth, :integer
  end
end
