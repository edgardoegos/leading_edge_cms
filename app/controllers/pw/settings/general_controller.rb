class Pw::Settings::GeneralController < ApplicationController
    include ApplicationHelper
    before_action :authenticate_user!
    before_action :check_authorization
    
    layout "application_backend"
    
    def index
        @setting = Setting.first
    end
    
    def update
    
        @setting = Setting.first
        
        if @setting.update(settings_params)
            flash[:success] = "Settings successfully updated."
            redirect_to pw_settings_general_index_path
        else 
            flash[:error] = @setting.errors.full_messages.first
            redirect_to pw_settings_general_index_path
        end
        
    end
    
    private
    
    def settings_params
        params.require(:setting).permit(:name, :image, body: [:pw_app_name, :pw_app_tagline, :pw_admin_email, :pw_app_description])
    end
    
end
