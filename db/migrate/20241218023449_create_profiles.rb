class CreateProfiles < ActiveRecord::Migration[8.0]
  def change
    create_table :profiles do |t|
      t.string :full_name
      t.string :profile_tagline
      t.string :location
      t.text :profile_bio
      t.text :tech_stack
      t.text :available_for
      t.text :social_profiles
      t.string :name
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
