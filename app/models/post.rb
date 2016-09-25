class Post < ActiveRecord::Base
    
    
    attr_accessor :image_attachments, :post_type
    
    has_many :image_attachments

    accepts_nested_attributes_for :image_attachments, allow_destroy: true
    
    enum status: [:draft, :review, :publish, :trash]
    enum featured: {yes: 1, no: 0}
    enum post_type: [:post, :platform, :solution, :case_study]

    serialize :body, JSON
        
    before_save :save_default
    after_save :save_image_attachments
    
    def save_default

        self.published_at = Time.new

    end
    
    def save_image_attachments
        if !self.image_attachments.nil?
            self.image_attachments.each_with_index do |image_attachment, index|
                if !image_attachment[:id].present?
                    attachment = ImageAttachment.new
                    attachment.cover = image_attachment[:cover].presence || 0
                    attachment.post_id = self.id
                    attachment.post_type = Post.post_types[self.post_type]
                    attachment.image = image_attachment[:image]
                    attachment.image_file_name = image_attachment[:image_file_name]
                    attachment.save
                else
                    @imageAttachment = ImageAttachment.find(image_attachment[:id])
                    @imageAttachment.cover = image_attachment[:cover]
                    @imageAttachment.post_type = Post.post_types[self.post_type]
                    @imageAttachment.save
                end
            end
        end
    end
    
    def self.post_query
        return Post.select("posts.*, posts.post_type as postType, images.id as image_id, image_file_name, image_content_type, image_file_size, category.name as category_name, concat(users.first_name, ' ', users.last_name) as creator, concat(users_publisher.first_name, ' ', users_publisher.last_name) as publisher")
    end
    
    def self.get_all_per_post_type(post_type)
        return self.post_query
            .joins("JOIN categories AS category ON category.id = posts.category_id AND category.status = 1")
            .joins("LEFT OUTER JOIN image_attachments AS images ON post_id = posts.id AND images.cover = 1 AND images.post_type = #{ Post.post_types[post_type] }")
            .joins("LEFT OUTER JOIN users AS users ON users.id = posts.created_by")
            .joins("LEFT OUTER JOIN users AS users_publisher ON users_publisher.id = posts.published_by")
            .order(created_at: :desc)
    end
    
    def self.get_all_per_post_type_and_status(post_type, status)
       return self.post_query
            .joins("JOIN categories AS category ON category.id = posts.category_id AND category.status = 1")
            .joins("LEFT OUTER JOIN image_attachments AS images ON post_id = posts.id AND images.cover = 1 AND images.post_type = #{ Post.post_types[post_type] }")
            .joins("LEFT OUTER JOIN users AS users ON users.id = posts.created_by")
            .joins("LEFT OUTER JOIN users AS users_publisher ON users_publisher.id = posts.published_by")
            .where("posts.status = #{ status }")
            .order(created_at: :desc) 
    end
    
    def self.get_all_per_post_type_and_status_created_by_user(post_type, status, current_user_id)
        return self.post_query
            .joins("JOIN categories AS category ON category.id = posts.category_id AND category.status = 1")
            .joins("LEFT OUTER JOIN image_attachments AS images ON post_id = posts.id AND images.cover = 1 AND images.post_type = #{ Post.post_types[post_type] }")
            .joins("LEFT OUTER JOIN users AS users ON users.id = posts.created_by")
            .joins("LEFT OUTER JOIN users AS users_publisher ON users_publisher.id = posts.published_by")
            .where("posts.status = #{ status } AND posts.created_by = #{ current_user_id }")
            .order(created_at: :desc) 
    end
    
    def self.get_all_image_attachment(post, post_type)
        return ImageAttachment.where("post_id = #{ post.id } AND post_type = #{ Post.post_types[post_type] }").order(:cover)
    end
    
    def self.search_query(query_strings)
        return self.post_query
            .joins("JOIN categories AS category ON category.id = posts.category_id AND category.status = 1")
            .joins("LEFT OUTER JOIN image_attachments AS images ON post_id = posts.id AND images.cover = 1")
            .joins("LEFT OUTER JOIN users AS users ON users.id = posts.created_by")
            .joins("LEFT OUTER JOIN users AS users_publisher ON users_publisher.id = posts.published_by")
            .where("posts.body LIKE ?", "%#{@query_strings}%") 
    end
    
end
