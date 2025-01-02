module Posts
  class PostCoversController < ApplicationController
    before_action :set_post, only: %i[update destroy]

    def update
      post_cover = PostCover.new(post_cover: params[:post_cover])
      if post_cover.attach_to(@post)
        redirect_to edit_post_url(@post), notice: '文章封面已成功更新.'
      else
        redirect_to edit_post_url(@post), inertia: {errors: post_cover.errors} 
      end
    end

    def create
      @post = Current.user.posts.build
      @post.status = :draft # 设置初始状态
      post_cover = PostCover.new(post_cover: params[:post_cover])

      if post_cover.attach_to(@post)
        redirect_to edit_post_url(@post), notice: '文章封面已成功添加.'
      else
        redirect_to new_post_url, inertia: {errors: post_cover.errors}
      end
    end

    def destroy
      @post.post_cover.purge_later
      head :no_content
      # redirect_to post_url(@post)
    end

    private

    def set_post
      @post = Current.user.posts.find(params[:post_id])
    end
  end
end
