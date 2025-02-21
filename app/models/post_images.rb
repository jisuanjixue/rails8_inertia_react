class PostImages
  include ActiveModel::Model
  include ActiveModel::Attributes

  attribute :post_images

  validates :post_images, presence: true

  def attach_to(post)
    return false unless valid?

    post.post_images.attach(post_images)
    if post.save
      true
    else
      errors.merge!(post.errors)
      false
    end
  end
end
