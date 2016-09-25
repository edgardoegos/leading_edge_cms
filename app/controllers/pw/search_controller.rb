class Pw::SearchController < ApplicationController
    
    before_action :authenticate_user!
    
    layout "application_backend"
    
    def index
#        render json: search_params
        @query_strings = search_params[:query_strings]
        @post_results = Post.search_query(search_params[:query_strings])
#        render json: @post_results
    end

    private
    
    def search_params
        params.require(:search).permit(:query_strings) 
    end
    
end
