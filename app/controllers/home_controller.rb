class HomeController < ApplicationController
  # Let CanCanCan load and authorize the instance variables
  def index
    render inertia: 'HomeIndex', props: {}
  end
end
