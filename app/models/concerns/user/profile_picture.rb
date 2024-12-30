module User::ProfilePicture
  extend ActiveSupport::Concern

  MAX_PROFILE_PICTURE_SIZE = 1.megabytes
  ALLOWED_CONTENT_TYPES = %w[image/png image/jpg image/jpeg image/webp].freeze

  included do
    has_one_attached :profile_picture

    validate :validate_profile_picture, if: -> { profile_picture.attached? }
  end

  private

  def validate_profile_picture
    if profile_picture.blob.byte_size > MAX_PROFILE_PICTURE_SIZE
      errors.add(:profile_picture, "文件大小必须小于 #{MAX_PROFILE_PICTURE_SIZE / 1.megabyte} MB")
    end

    unless profile_picture.content_type.in?(ALLOWED_CONTENT_TYPES)
      errors.add(:profile_picture, "文件类型必须是： #{formatted_allowed_content_types}")
    end
  end

  def formatted_allowed_content_types
    ALLOWED_CONTENT_TYPES.map { |type| type.split("/").last.upcase }.join(", ")
  end
end
