class AddContentToPosts < ActiveRecord::Migration[8.0]
  def change
    add_column :posts, :content, :text
  end
end
