# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )

Rails.application.config.assets.precompile += %w( pw/dashboard.css )
Rails.application.config.assets.precompile += %w( pw/dashboard.js )

Rails.application.config.assets.precompile += %w( application-backend-public.css )
Rails.application.config.assets.precompile += %w( application-backend-public.js )

Rails.application.config.assets.precompile += %w( pw/settings/user_management.css )
Rails.application.config.assets.precompile += %w( pw/settings/user_management.js )

Rails.application.config.assets.precompile += %w( pw/settings/general.css )
Rails.application.config.assets.precompile += %w( pw/settings/general.js )

Rails.application.config.assets.precompile += %w( pw/settings/categories.css )
Rails.application.config.assets.precompile += %w( pw/settings/categories.js )

Rails.application.config.assets.precompile += %w( pw/modules/posts.css )
Rails.application.config.assets.precompile += %w( pw/modules/posts.js )

Rails.application.config.assets.precompile += %w( pw/search.css )
Rails.application.config.assets.precompile += %w( pw/search.js )