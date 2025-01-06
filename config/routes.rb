Rails.application.routes.draw do
  mount Apicraft::Web::App, at: '/apicraft'
  # mount Debugbar::Engine => Debugbar.config.prefix if defined? Debugbar
  # authentication
  get '/auth/failure', to: 'sessions/omniauth#failure'
  get '/auth/:provider/callback', to: 'sessions/omniauth#create'
  post '/auth/:provider/callback', to: 'sessions/omniauth#create'
  get  'sign_in', to: 'sessions#new'
  post 'sign_in', to: 'sessions#create'
  delete 'sign_out/:id', to: 'sessions#destroy'
  get  'sign_up', to: 'registrations#new'
  post 'sign_up', to: 'registrations#create'
  resources :sessions, only: %i[index show destroy]
  namespace :identity do
    resource :email,              only: %i[edit update]
    resource :email_verification, only: %i[show create]
    resource :password_reset,     only: %i[new edit create update]
    patch 'change_password', to: 'password_change#change_password'
  end

  namespace :admin do
    get 'dashboard', to: 'dashboard#index'
    resources :categories
    resources :users
  end

  # post
  resources :posts do
    resource :post_cover, only: [ :update, :destroy], module: :posts
    member do
      post 'publish'
    end
  end

  post 'upload_cover', to: 'posts/post_covers#create'
  get 'all_posts', to: 'posts#all_posts'

  # user setting
  get 'user_setting', to: 'users/setting#index'
  # namespace :users do
  #   resource :profile, only: %i[update]
  # end

  resources :users, only: [:update] do
    resource :profile_picture, only: [:update, :destroy], module: :users
  end

  patch 'update_profile', to: 'users/profile#update'

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get 'up' => 'rails/health#show', :as => :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # root "posts#index"
  root 'home#index'

  draw(:api)
end
