module ApplicationHelper

    
    @@partials = "partials/"
    
    def app_settings
        Setting.first
    end
    
    def is_active_controller(controller_name)
        params[:controller] == controller_name ? "active" : nil
    end

    def is_active_action(action_name)
        params[:action] == action_name ? "active" : nil
    end
    
    def is_active_path(path)
        params[:controller].split('/')[0] == path ? "active" : nil
    end
    
    def partials
		{
			:form => {
                :user => @@partials + "form_user",
                :post => @@partials + "form_post"
			}
		}
	end
    
    def format_date(datetime, format)
		return "" if datetime == nil
		datetime.localtime.strftime(format)
	end
    
    def flash_notifications
        message = flash[:error] || flash[:success]

        if message
          type = flash.keys[0].to_s
          javascript_tag %Q{$.notification({ message:"#{message}", type:"#{type}" });}
        end
    end
    
    def get_categories(post_type)
        return Category.where(post_type: Post.post_types[params[:post_type].singularize])
    end

    def logged_user
        return current_user 
    end

    def get_badge_for_status(status)
        
        case status
        when "publish"
            return "success"
        when "draft"
            return "warning"
        when "review"
            return "info"
        else
            return "important"
        end
        
    end

    def get_cover_photo(image_id)
        return ImageAttachment.find(image_id)
    end

    def get_post_category(category_id)
        return Category.find(category_id) 
    end

    # ==== Role Permission ============================================

    def super_and_admin_roles
        return roles_include(roles.keys[0..1])
    end

    def author_role
        return roles_include(roles.keys[3])
    end

    def editor_role
        return roles_include(roles.keys[2])
    end

    def roles_include(allowed_roles)
        return allowed_roles.include?(current_user.role)
    end

    def roles
        User.roles
    end

    def permissions
        {
            pw: {
                settings: {
                    general: {
                        allowed: [0, 1]
                    },
                    user_management: {
                        allowed: [0, 1]
                    },
                    categories: {
                        allowed: [0, 1]
                    }
                },
                modules: {
                    posts: {
                        allowed: [:all]
                    }
                }
            }
        }
    end

    def check_authorization
        
        permission = permissions.stringify_keys

        params[:controller].split('/').each do |key|
            if permission.has_key?(key)
                permission = permission[key].stringify_keys
            end
        end

        @@permission = permission.deep_symbolize_keys

        unless @@permission[:allowed] == [:all]
            unless @@permission[:allowed].include?(roles[current_user.role])
                
                flash[:error] = "Permission Denied!"
                redirect_to pw_dashboard_path
                return
            end
        end
    end

end
