class Api::UsersController < Api::ApiController
  skip_before_action :verify_authenticity_token
  def index
    users = User.all
    render json: users
  end

  def create
    user = User.new(user_params)

    if user.save
      token = issue_token(user)
      render json: {
        success: true,
        error_message: nil,
        error_code: 0,
        data: { user: user, jwt: token }
      }
    elsif user.errors.messages
      render json: { error: user.errors.messages }
    else
      render json: { error: 'User could not be created. Please try again.' }
    end
  end

  def show
    user = User.find(params[:id])
    if user
      render json: user
    else
      render json: { error: 'User could not be found.' }
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
