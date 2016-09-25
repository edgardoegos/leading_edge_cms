class Pw::Settings::CategoriesController < ApplicationController
    include ApplicationHelper
    before_action :authenticate_user!
    before_action :check_authorization
    
    before_action :get_all_categories
    layout "application_backend"
    
    def index
        @category = Category.new
    end
    
    def create
        
        @category = Category.new(category_params)
        
        if @category.save
            flash[:success] = "Category successfully created."
            redirect_to pw_settings_categories_path
        else
            flash[:error] = @catogory.errors.full_messages.first
            redirect_to pw_settings_categories_path
        end
        
    end
    
    def edit
        @category = Category.find(params[:id])
    end
    
    def update
        @category = Category.find(params[:id])
        
        if @category.update(category_params)
            flash[:success] = "Category successfully created."
            redirect_to edit_pw_settings_category_path(@category.id)
        else
            flash[:success] = "Category successfully created."
            redirect_to edit_pw_settings_category_path(@category.id)
        end
    end
    
    def destroy
        @category = Category.find(params[:id])
        
        if @category.destroy
            flash[:success] = "Category successfully deleted."
            redirect_to pw_settings_categories_path
        end
    end
    
    private
    
    def get_all_categories
        @categories = Category.all
    end
    
    def category_params
        params.require(:category).permit(:name, :post_type, :description, :status)
    end
    
end
