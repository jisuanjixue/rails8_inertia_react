class PostCover
  include ActiveModel::Model
  include ActiveModel::Attributes

  attribute :post_cover

  validates :post_cover, presence: true

  def attach_to(post)
    return false unless valid?

    post.post_cover.attach(post_cover)
    if post.save
      true
    else
      errors.merge!(post.errors)
      false
    end
  end
end
