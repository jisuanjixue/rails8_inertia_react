class Admin::DashboardController < ApplicationController
  def index
    render inertia: 'Admin/Dashboard/Index'
  end
end
