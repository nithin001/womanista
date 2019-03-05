Rails.application.routes.draw do
  get 'product/index'
  root :to => 'home#index'
  get '/product/:id', to: 'product#index'
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  namespace :api do
  	resources :products, only: [:index, :show]
  	resources :product_categories, only: [:index]
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
