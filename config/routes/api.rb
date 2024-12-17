namespace :api do
  post '/signup', to: 'users#create'
  post '/login', to: 'sessions#create'
  get '/current_user', to: 'sessions#show'
  get '/logout', to: 'sessions#destroy'
end
