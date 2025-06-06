module Posts
  class CommentsController < ApplicationController
    before_action :set_post
    before_action :set_comment, only: [:destroy]

    def create
      @comment = @post.comments.new(comment_params)
      @comment.user = Current.user

      if @comment.save
        redirect_to @post, notice: "Post was successfully created."

      else
        redirect_to @post, notice: "Post was not successfully ."
      end
    end

    def destroy
      @comment.destroy!
      redirect_to @post, notice: "comment was successfully destroyed."
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
