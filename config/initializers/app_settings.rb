class AppSettings
    # require 'user_library'

    attr_accessor :app_name, :app_description, :app_tagline, :app_about, :admin_email
    attr_accessor :timezone, :date_format, :time_format, :contact_info, :footer_description
    attr_accessor :home_category, :news_and_events_category, :shops_category, :menu_category, :features_category, :media_category
    attr_accessor :app

    def initialize(*attributes)
        if attributes.length == 1 && attributes.first.kind_of?(Hash)
            attributes.first.each { |k,v| send("#{k.gsub('pw_', '')}=", v) }
        end
    end

    def self.instance
        if @app == nil
          @app = self.new(Setting.first.body)
        end

        return @app
    end

    def self.instantiate_settings
        if @app_settings == nil
            @app_settings = self.new(Setting.first.image)
        end

        return @app_settings
    end
    
end