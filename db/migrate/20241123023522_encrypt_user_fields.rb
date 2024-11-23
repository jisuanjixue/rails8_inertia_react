class EncryptUserFields < ActiveRecord::Migration[8.0]
  def up
    User.all.each do |user|
      user.encrypt
    end
  end

  def down
    User.all.each do |user|
      user.decrypt
    end
  end
end
