module Posts
  class CommentsController < ApplicationController
    before_action :set_post
    before_action :set_comment, only: [:destroy]

    def create
      @comment = @post.comments.new(comment_params)
      @comment.user = Current.user
      @comment.parent_id = params[:parent_id] if params[:parent_id].present?

      if @comment.save
        redirect_to @post, notice: "评论发布成功!"
      else
        redirect_to @post, notice: "评论发布失败."
      end
    end

    def destroy
      @comment.destroy!
      redirect_to @post, notice: "评论删除成功!"
    end

    private

    def set_post
      @post = Post.find(params[:post_id])
    end

    def set_comment
      @comment = @post.comments.find(params[:id])
    end

    def comment_params
      params.require(:comment).permit(:content)
    end
  end
end
