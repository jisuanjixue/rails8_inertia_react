module User::ProfilePicture
  extend ActiveSupport::Concern
  include ImageAttachment

  ALLOWED_CONTENT_TYPES = %w[image/png image/jpg image/jpeg image/webp].freeze

  included do
    self.max_size = 1.megabyte
    self.attachment_name = :profile_picture

    has_one_attached :profile_picture
  end
end
