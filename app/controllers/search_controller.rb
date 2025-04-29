class SearchController < InertiaController
  def index
    results = if params[:q].present?
      Post.search(params[:q], {
        attributesToHighlight: ["*"],
        limit: 1000
      })
    else
      []
    end

    render inertia: "Search/Index", props: {
      results: results,
      q: params[:q]
    }
  end

  def modal_search
    results = if params[:q].present?
      Post.search(params[:q], {
        attributesToHighlight: ["*"],
        limit: 5
      })
    else
      []
    end

    render inertia: "Search/Index", props: {
      results: results,
      q: params[:q]
    }
  end
end
