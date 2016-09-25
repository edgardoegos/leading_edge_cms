class Pw::Modules::PostsController < ApplicationController
    include ApplicationHelper
    layout "application_backend"
    
    before_action :authenticate_user!
    before_action :get_all_post
    before_action :get_published_post
    before_action :get_drafted_post
    before_action :get_for_review_post
    before_action :get_trashed_post

    def index
#        render json: author_role
    end
    
    def new
        @post = Post.new 
        @post.body = body_params 
    end
    
    def create
#        render json: post_params
#        
        @post = Post.new(post_params)

        @post.created_by = current_user.id
        
        if post_params["status"] == "publish"
            @post.published_by = current_user.id
        end
        
        if @post.save
            flash[:success] = "#{ params[:post_type].singularize.titlecase } successfully created."
            redirect_to pw_modules_path(params[:post_type])
        end
        
    end
    
    def edit
        @post = Post.find(params[:id])
        @post_images = Post.get_all_image_attachment(@post, params[:post_type].singularize)
    
    end
    
    def update

        @post = Post.find(params[:id])
        
        if post_params[:status] != "publish"
            @post.published_by = nil
            @post.published_at = nil
        else
            @post.published_by = current_user.id
            @post.published_at = DateTime.now
        end

        if @post.update(post_params)
            flash[:success] = "#{ params[:post_type].singularize.titlecase } successfully updated."
            redirect_to pw_modules_edit_post_path(id: @post.id)
        end

    end
    
    def delete_image_attachment
        @image_attachment = ImageAttachment.find(params[:image_id])
        
        if @image_attachment.cover == 1
            @updateImageAttachment = ImageAttachment.update_image_attachment(@image_attachment.post_id)
        end
        
        if @image_attachment.destroy
             redirect_to pw_modules_edit_post_path(id: params[:id])
        end
        
    end
    
    private
    
    end
    
    def get_all_post
        @posts_all = Post.get_all_per_post_type(params[:post_type].singularize) 
    end
    
    def get_published_post
        if !author_role
            @posts_published = Post.get_all_per_post_type_and_status(params[:post_type].singularize, Post.statuses[:publish])       
        else
            @posts_published = Post.get_all_per_post_type_and_status_created_by_user(params[:post_type].singularize, Post.statuses[:publish], current_user.id) 
        end
    end
    
    def get_drafted_post
        if !author_role
            @posts_drafted = Post.get_all_per_post_type_and_status(params[:post_type].singularize, Post.statuses[:draft]) 
        else
            @posts_drafted = Post.get_all_per_post_type_and_status_created_by_user(params[:post_type].singularize, Post.statuses[:draft], current_user.id) 
        end
    end
    
    def get_for_review_post
        if !author_role
            @posts_for_review = Post.get_all_per_post_type_and_status(params[:post_type].singularize, Post.statuses[:review]) 
        else
            @posts_for_review = Post.get_all_per_post_type_and_status_created_by_user(params[:post_type].singularize, Post.statuses[:review], current_user.id) 
        end
    end
    
    def get_trashed_post
        @posts_trash = Post.get_all_per_post_type_and_status(params[:post_type].singularize, Post.statuses[:trash])    
    end
    
    def body_params
        body = { :title => "", :subtitle => "", :description => "", :content => "", :tags => "", meta: { keywords: "", description: "" }}
        return body
    end

    def post_params
        params.require(:post).permit(:id, :status, :featured, :category_id, :user_id, :post_type,
            image_attachments: [:id, :image, :cover, :image_file_name],
            body: [:title, :subtitle, :description, :content, :tags,
            meta: [:keywords, :description]])
        
end
