class Admin::DashboardController < ApplicationController
  def index
    render inertia: "Admin/Dashboard/Index", props: {
      posts: Post.all
    }
  end
end
