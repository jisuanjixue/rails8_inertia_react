class SessionsController < InertiaController
  skip_before_action :authenticate, only: %i[new create]

  before_action :set_session, only: :destroy

  def index
    @sessions = Current.user.sessions.order(created_at: :desc)
  end

  def new
    render inertia: "Sessions/New", props: {
      is_developer: Rails.env.development?
    }
  end

  def create
    if user = User.authenticate_by(email: params[:email], password: params[:password])
      @session = user.sessions.create!
      cookies.signed.permanent[:session_token] = {value: @session.id, httponly: true}

      redirect_to root_path, notice: "\u767B\u5F55\u6210\u529F"
    else
      redirect_to sign_in_path(email_hint: params[:email]), inertia: {errors: {base: ["That email or password is incorrect"]}},
        alert: "That email or password is incorrect"
    end
  end

  def destroy
    if @session.destroy!
      redirect_to root_path, notice: "\u9000\u51FA\u6210\u529F"
    else
      redirect_to root_path, inertia: {errors: @session.errors}
    end
  end

  private

  def set_session
    @session = Current.user.sessions.find(params[:id])
  end
end
