class Pw::Settings::UserManagementController < ApplicationController
    
    include ApplicationHelper
    layout "application_backend"
    
    before_action :authenticate_user!
    before_action :check_authorization, except: [:profile, :edit_profile, :update_profile]
    
    before_action :get_all_users
    before_action :get_all_countries
    
    def index

    end
    
    def new
        @user = User.new
    end
    
    def create
        generated_password = Devise.friendly_token.first(8)
        new_user_params = user_params
        new_user_params[:password] = "admin.password"
        new_user_params[:password_confirmation] = "admin.password"
        
        @user = User.new(new_user_params)
        
        if @user.save
            flash[:success] = "User successfully created."
            redirect_to pw_settings_user_management_index_path
        else
            
            flash[:error] = @user.errors.full_messages.first
            params[:action] = "new"
            render :action => 'new'
            
        end
    end
    
    def edit
        @user = User.find(params[:id])
    end
    
    def update
       
        @user = User.find(params[:id])
        
        if @user.update(user_params)
            flash[:success] = "User successfully updated."
            redirect_to edit_pw_settings_user_management_path(params[:id])
        end
        
    end
    
    def destroy
    
        @user = User.find(params[:id])

        if @user.destroy
            flash[:success] = "User successfully deleted."
            redirect_to pw_settings_user_management_index_path
        end
        
    end
    
    def profile    
        @user = User.find(params[:id])
    end
    
    def edit_profile
        @user = User.find(params[:id])
    end
    
    def update_profile
       
        @user = User.find(params[:id])
        
        if @user.update(user_params)
            flash[:success] = "User successfully updated."
            redirect_to pw_settings_user_management_profile_path(params[:id])
        else
            flash[:error] = @user.errors.full_messages.first
            redirect_to pw_settings_user_management_profile_path(params[:id])
        end
        
    end
    
    def account_settings    
        @user = User.find(params[:id])
    end
    
    def update_account_settings
        
        @user = User.find(params[:id])
        
        if @user.update(user_params)
            flash[:success] = "Account settings successfully updated."
            redirect_to pw_settings_user_management_account_settings_path(params[:id])
        else
            flash[:error] = @user.errors.full_messages.first
            redirect_to pw_settings_user_management_account_settings_path(params[:id])
        end
    end
    
    def destroy
    
        @user = User.find(params[:id])

        if @user.destroy
            flash[:success] = "User successfully deleted."
            redirect_to pw_settings_user_management_index_path
        end
        
    end
    
    private
    
    def get_all_users
        @users = User.where.not(role: 0)
    end
    
    def get_all_countries
        @countries = CS.get
    end
    
    def user_params   
        params.require(:user).permit(:email, :username, :first_name, :last_name, :role, :gender, :birth_date, :address, :country, :postal_code, :phone_number, :password, :password_confirmation, :avatar, :current_password, :password, :password_confirmation)
    end
    
end
