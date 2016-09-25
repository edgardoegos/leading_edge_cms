class Pw::DashboardController < ApplicationController
    
    before_action :authenticate_user!
    
    layout "application_backend"
    
    def index
        
    end
    
end
