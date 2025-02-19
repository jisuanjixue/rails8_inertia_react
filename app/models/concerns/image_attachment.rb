module ImageAttachment
  extend ActiveSupport::Concern

  included do
    class_attribute :max_size, :attachment_name

    validate :validate_image, if: -> { send(attachment_name).attached? }
  end

  private

  def validate_image
    attachment = send(attachment_name)

    if attachment.blob.byte_size > max_size
      errors.add(attachment_name, "文件大小必须小于 #{max_size / 1.megabyte} MB")
    end

    unless attachment.content_type.in?(self.class::ALLOWED_CONTENT_TYPES)
      errors.add(attachment_name, "文件类型必须是： #{formatted_allowed_content_types}")
    end
  end

  def formatted_allowed_content_types
    self.class::ALLOWED_CONTENT_TYPES.map { |type| type.split("/").last.upcase }.join(", ")
  end
end

# send 是 Ruby 中的一个元编程方法，用于动态调用对象的方法
# 相当于根据 attachment_name 的值来调用对应的方法。比如：
# 如果 attachment_name = :profile_picture，那么 send(:profile_picture) 就等同于直接调用 profile_picture 方法
# 如果 attachment_name = :post_cover，那么 send(:post_cover) 就等同于直接调用 post_cover 方法
# 这样做的好处是：
# 代码更通用，不需要硬编码方法名
# 可以在运行时动态决定调用哪个方法
# 适合处理类似但方法名不同的场景
