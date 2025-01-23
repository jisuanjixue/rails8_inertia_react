module Posts
  class LikesController < ApplicationController
    def create
      @likeable = find_likeable
      return redirect_to post_path(@likeable), alert: "Already liked" if @likeable.likes.exists?(user: Current.user)
      @like = @likeable.likes.new(user: Current.user)

      if @like.save
        redirect_to post_path(@likeable), notice: "Liked successfully"
      else
        redirect_to post_path(@likeable), alert: @like.errors.full_messages.to_sentence
      end
    end

    def destroy
      @likeable = find_likeable
      @like = @likeable.likes.find_by(user: Current.user)

      if @like
        @like.destroy
        redirect_to post_path(@likeable), notice: "Unliked successfully"
      else
        redirect_to post_path(@likeable), alert: "You haven't liked this yet"
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
