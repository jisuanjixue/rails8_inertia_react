module Api
  class ApiController < ActionController::Base
    def jwt_key
      Rails.application.credentials.jwt_key
    end

    def issue_token(user)
      JWT.encode({ user_id: user.id }, jwt_key, 'HS256')
    end

    def decoded_token
      JWT.decode(token, jwt_key, true, { algorithm: 'HS256' })
    rescue StandardError => e
      [{ error: 'Invalid Token' }]
    end

    def token
      request.headers['Authorization']
    end

    def user_id
      decoded_token.first['user_id']
    end

    def current_user
      user ||= User.find_by(id: user_id)
    end

    def logged_in?
      !!current_user
    end
  end
end
