class AddSubTitleToPosts < ActiveRecord::Migration[8.0]
  def change
    add_column :posts, :sub_title, :string, limit: 100, null: true, default: ''
  end
end
