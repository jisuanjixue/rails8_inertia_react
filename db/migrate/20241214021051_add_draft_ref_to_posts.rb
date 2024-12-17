class AddDraftRefToPosts < ActiveRecord::Migration[8.0]
  def change
    add_reference :posts, :draft, null: false, foreign_key: true
  end
end
