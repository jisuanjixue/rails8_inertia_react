module Posts
  class PostImagesController < InertiaController
    before_action :set_post, only: %i[update destroy]

    def update
      post_images = PostImages.new(post_images: params[:post_images])
      if post_images.attach_to(@post)
        redirect_to edit_post_url(@post), notice: "\u6587\u7AE0\u56FE\u7247\u5DF2\u6210\u529F."
      else
        redirect_to edit_post_url(@post), inertia: {errors: post_images.errors}
      end
    end

    def create
      @post = Current.user.posts.create(status: :draft)
      if @post.persisted?
        post_images = PostImages.new(post_images: params[:post_images])
        if post_images.attach_to(@post)
          redirect_to new_post_url, notice: "\u6587\u7AE0\u5C01\u9762\u5DF2\u6210\u529F\u66F4\u65B0."
        else
          redirect_to new_post_url
        end
      else
        redirect_to new_post_url
      end
    end

    def destroy
      @post.post_images.purge_later
      redirect_to edit_post_url(@post)
    end

    private

    def set_post
      @post = Current.user.posts.find(params[:post_id])
    end
  end
end
