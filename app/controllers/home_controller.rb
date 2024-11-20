class HomeController < ApplicationController
  def index
    render inertia: "HomeIndex", props: {
      currentUser: Current.user,
      session: Current.session
    }
  end
end
