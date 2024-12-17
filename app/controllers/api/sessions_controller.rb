class Api::SessionsController < Api::ApiController
  skip_before_action :verify_authenticity_token
  def create
    user = User.find_by_email(params[:email])

    if user && user.authenticate(params[:password])
      token = issue_token(user)
      render json: {
        success: true,
        error_message: nil,
        error_code: 0,
        data: { user: user, jwt: token }
      }

      # { user: serialize_user(user), jwt: token }
    else
      render json: { error: 'Incorrect username or password.' }
    end
  end

  def show
    if logged_in?
      render json:
      {
        success: true,
        error_message: nil,
        error_code: 0,
        data: current_user
      }
    else
      render json: { error: 'User is not logged in/could not be found.' }
    end
  end

  private

  def serialize_user(user)
    user.as_json(only: %i[
                   id email name
                 ])
  end
end
