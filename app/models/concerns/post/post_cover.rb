module Post::PostCover
  extend ActiveSupport::Concern
  include ImageAttachment

  ALLOWED_CONTENT_TYPES = %w[image/png image/jpg image/jpeg image/webp].freeze

  included do
    self.max_size = 3.megabytes
    self.attachment_name = :post_cover

    has_one_attached :post_cover
  end
end
