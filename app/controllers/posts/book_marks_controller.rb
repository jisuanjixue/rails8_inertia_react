module Posts
  class BookMarksController < InertiaController
    def create
      @post = Post.find(params[:post_id])
      return redirect_to post_path(@post), alert: "Already bookmarked" if @post.bookmarks.exists?(user: Current.user)
      @bookmark = @post.bookmarks.new(user: Current.user)

      if @bookmark.save
        redirect_to post_path(@post), notice: "Bookmarked successfully"
      else
        redirect_to post_path(@post), alert: @bookmark.errors.full_messages.to_sentence
      end
    end

    def destroy
      @post = Post.find(params[:post_id])
      @bookmark = @post.bookmarks.find_by(user: Current.user)

      if @bookmark
        @bookmark.destroy
        redirect_to post_path(@post), notice: "Unbookmarked successfully"
      else
        redirect_to post_path(@post), alert: "You haven't bookmarked this yet"
      end
    end
  end
end
