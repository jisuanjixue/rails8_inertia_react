module Posts
  module Comments
    class RepliesController < InertiaController
      before_action :set_post
      before_action :set_comment

      def create
        @reply = @comment.replies.new(
          reply_params
        )
        @reply.user = Current.user
        @reply.post = @post
        @reply.depth = (@comment.depth || 0) + 1
        if @reply.save
          redirect_to @post, notice: "回复成功"
        else
          Rails.logger.error("Reply creation failed: #{@reply.errors.full_messages}")
          redirect_to @post, alert: "回复失败"
        end
      end

      def destroy
        @reply = @comment.replies.find(params[:id])
        @reply.destroy
        redirect_to @post, notice: "取消回复成功"
      end

      private

      def set_post
        @post = Post.find(params[:post_id])
      end

      def set_comment
        @comment = @post.comments.find(params[:comment_id])
      end

      def reply_params
        params.require(:reply).permit(:content)
      end
    end
  end
end
