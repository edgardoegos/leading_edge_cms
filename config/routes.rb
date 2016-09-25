Rails.application.routes.draw do
  
    mount Ckeditor::Engine => '/ckeditor'
    devise_for :users, :skip => [:sessions, :registrations]

    as :user do
        
        get "pw/login" => "pw/devise/sessions#new", :as => :new_user_session
        post "pw/login" => "pw/devise/sessions#create", :as => :user_session
        delete 'pw/signout'  => 'pw/devise/sessions#destroy',   :as => :destroy_user_session
            
    end
    
    namespace :pw do
        
        root to: 'dashboard#index', :as => :dashboard
        
        post 'search/:query_strings' => 'search#search_initialize', :as => :search
        resources :search
        
        namespace :settings do
            
            put 'general/update'
            
            resources :general
            resources :categories
            
            get 'user_management/:id/profile' => 'user_management#profile', :as => :user_management_profile
            get 'user_management/:id/edit_profile' => 'user_management#edit_profile', :as => :user_management_edit_profile
            patch 'user_management/:id/update_profile' => 'user_management#update_profile', :as => :user_management_update_profile
            get 'user_management/:id/account_settings' => 'user_management#account_settings', :as => :user_management_account_settings
            patch 'user_management/:id/update_account_settings' => 'user_management#update_account_settings', :as => :user_management_update_account_settings
            
            resources :user_management
            
            
        end
        
        namespace :modules do
            
            get ':post_type' => 'posts#index' 
            get ':post_type/new' => 'posts#new', :as => :new_post
            post ':post_type/create' => 'posts#create'
            get ':post_type/:id/edit' => 'posts#edit', :as => :edit_post
            patch ':post_type/:id/update' => 'posts#update'
            delete ':post_type/:id/delete_image_attachment/:image_id' => 'posts#delete_image_attachment'
            
        end
        
    end

end
