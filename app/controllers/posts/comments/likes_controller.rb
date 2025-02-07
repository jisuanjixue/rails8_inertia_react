module Posts
  module Comments
    class LikesController < ApplicationController
      before_action :set_post
      before_action :set_comment

      def create
        @like = @comment.likes.new(user: Current.user)
        if @like.save
          redirect_to @post, notice: "点赞成功"
        else
          redirect_to @post, alert: "点赞失败"
        end
      end

      def destroy
        @like = @comment.likes.find(params[:id])
        @like.destroy
        redirect_to @post, notice: "取消点赞成功"
      end

      private

      def set_post
        @post = Post.find(params[:post_id])
      end

      def set_comment
        @comment = @post.comments.find(params[:comment_id])
      end
    end
  end
end
