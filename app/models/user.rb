class User < ActiveRecord::Base
    # Include default devise modules. Others available are:
    # :confirmable, :lockable, :timeoutable and :omniauthable
    devise :database_authenticatable,
         :recoverable, :rememberable, :trackable, :validatable
    
    
    has_attached_file :avatar,
        :styles => { :large => "1920x900#", :medium => "600x600>", :small => "300x300", :thumb => "100x100>" },
        :url => "/system/:class/:attachment/:id/:style/:basename.:extension",
        :path => ":rails_root/public/system/:class/:attachment/:id/:style/:basename.:extension"

    # , :default_url => "/images/:style/missing.png"
    validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/
    
    enum status: [:inactive, :active]
    enum gender: [:male, :female]
    enum role: [:super_admin, :administrator, :editor, :author, :subscriber]
    
    validates :first_name, :last_name, :username, :email, :role, :gender, :birth_date, :address, :country, :postal_code, :phone_number, presence: true
    
    validates_uniqueness_of :email, :case_sensitive => false
	validates_uniqueness_of :username, :case_sensitive => false
    validates_confirmation_of :password

end
