Rails.application.routes.draw do
  if defined? Debugbar
    mount Debugbar::Engine => Debugbar.config.prefix
  end
   # authentication
  get "/auth/failure", to: "sessions/omniauth#failure"
  get "/auth/:provider/callback", to: "sessions/omniauth#create"
  post "/auth/:provider/callback", to: "sessions/omniauth#create"
  get  "sign_in", to: "sessions#new"
  post "sign_in", to: "sessions#create"
  delete "sign_out/:id", to: "sessions#destroy"
  get  "sign_up", to: "registrations#new"
  post "sign_up", to: "registrations#create"
  patch "change_password", to: "home#change_password"
  resources :sessions, only: [ :index, :show, :destroy ]
  namespace :identity do
    resource :email,              only: [ :edit, :update ]
    resource :email_verification, only: [ :show, :create ]
    resource :password_reset,     only: [ :new, :edit, :create, :update ]
  end

  #post
  resources :posts

  get 'all_posts', to: 'posts#all_posts'

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", :as => :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # root "posts#index"
    root "home#index"
end
