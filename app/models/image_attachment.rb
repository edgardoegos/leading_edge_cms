class ImageAttachment < ActiveRecord::Base
    
    belongs_to :post

    has_attached_file :image,
  					:styles => { :large => "1920x900>", :medium => "600x600>", :small => "300x300", :thumb => "100x100>" },
  					:url => "/system/:class/:attachment/:id/:style/:basename.:extension",
  					:path => ":rails_root/public/system/:class/:attachment/:id/:style/:basename.:extension"

    validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/
    
    def self.directory
        "/system/image_attachments/images"
    end
    
    def self.update_image_attachment(post_id)

        @updateImageAttachment = ImageAttachment.where("post_id = ?", post_id).order(cover: :desc)[1]

        if !@updateImageAttachment.nil?
          @updateImageAttachment.cover = 1
          @updateImageAttachment.save
        end

    end
    
end
