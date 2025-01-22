module Posts
  class LikesController < ApplicationController
    def create
      @likeable = find_likeable
      @like = @likeable.likes.new(user: Current.user)

      if @like.save
        redirect_to post_path(@likeable), notice: "Liked successfully"
      else
        redirect_to post_path(@likeable), alert: @like.errors.full_messages.to_sentence
      end
    end

    def destroy
      @like = current_user.likes.find(params[:id])
      @likeable = @like.likeable

      if @like.destroy
        redirect_to post_path(@likeable), notice: "Unliked successfully"
      else
        redirect_to post_path(@likeable), alert: @like.errors.full_messages.to_sentence
      end
    end

    private

    def find_likeable
      if params[:post_id]
        Post.find(params[:post_id])
      elsif params[:comment_id]
        Comment.find(params[:comment_id])
      else
        raise "Invalid likeable type"
      end
    end
  end
end
