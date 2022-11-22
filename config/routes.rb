Rails.application.routes.draw do
  root 'home#index'

  # get '*unmatched_route', to: 'home#index'

  namespace :api do
    namespace :v1 do
      resources :todos, only: %i[index create update destroy] do
        scope module: :todos do
          resources :comments, only: %i[create]
        end
      end
      resource :session, only: %i[create destroy]
      post 'auth', to: 'auth#signup'
    end
  end
end
