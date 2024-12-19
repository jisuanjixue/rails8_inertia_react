class CreateProfiles < ActiveRecord::Migration[8.0]
  def change
    create_table :profiles do |t|
      t.string :full_name
      t.string :profile_tagline
      t.string :location
      t.text :profile_bio
      t.json :tech_stacks, null: false, default: []
      t.check_constraint "JSON_TYPE(tech_stacks) = 'array'", name: 'profiles_tech_stacks_is_array'
      t.text :available_for
      t.json :social_profiles, null: false, default: []
      t.check_constraint "JSON_TYPE(social_profiles) = 'array'", name: 'profiles_social_profiles_is_array'
      t.string :name
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
