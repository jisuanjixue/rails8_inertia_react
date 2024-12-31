module Post::PostCover
  extend ActiveSupport::Concern

  MAX_POST_COVER_SIZE = 3.megabytes
  ALLOWED_CONTENT_TYPES = %w[image/png image/jpg image/jpeg image/webp].freeze

  included do
    has_one_attached :post_cover

    validate :validate_post_cover, if: -> { post_cover.attached? }
  end

  private

  def validate_post_cover
    if post_cover.blob.byte_size > MAX_POST_COVER_SIZE
      errors.add(:post_cover, "文件大小必须小于 #{MAX_POST_COVER_SIZE / 3.megabyte} MB")
    end

    unless post_cover.content_type.in?(ALLOWED_CONTENT_TYPES)
      errors.add(:post_cover, "文件类型必须是： #{formatted_allowed_content_types}")
    end
  end

  def formatted_allowed_content_types
    ALLOWED_CONTENT_TYPES.map { |type| type.split("/").last.upcase }.join(", ")
  end
end
