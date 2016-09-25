class Setting < ActiveRecord::Base
    
    has_attached_file :image,
        :styles => { :large => "1920x900#", :medium => "600x600>", :small => "300x300", :thumb => "100x100>" },
        :url => "/system/:class/:attachment/:id/:style/:basename.:extension",
        :path => ":rails_root/public/system/:class/:attachment/:id/:style/:basename.:extension"

    # , :default_url => "/images/:style/missing.png"
    validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/

    serialize :body, JSON
    
end
