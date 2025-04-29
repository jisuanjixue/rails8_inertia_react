class Admin::DashboardController < InertiaController
  def index
    render inertia: "Admin/Dashboard/Index", props: {
      posts: Post.all
    }
  end
end
