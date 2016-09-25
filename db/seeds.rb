# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Setting.create({ name: 'default',
    body: {
        pw_app_name: 'Leading Edge',
        pw_app_description: '',
        pw_app_tagline: '',
        pw_app_about: '',
        pw_admin_email: 'administrator@leadingedge.com',
        pw_timezone: '',
        pw_date_format: '',
        pw_time_format: '',
        pw_contact_info: ''
    }
})

User.create(username: 'super_admin', email: 'john.doe@leadingedge.com', first_name: "John", last_name: "Doe", role: 0, status: 1, gender: 0, birth_date: "17/12/1989", address: "10 Luna St. New Banicain Olongapo City", country: "Philippines", postal_code: "2200", phone_number: "(619)123-1234", :password => "admin.perpetualwave", :password_confirmation => "admin.perpetualwave")

Category.create(name: "Home Banner", description: "", post_type: 0, status: 1)
Category.create(name: "Video Stremming", description: "", post_type: 1, status: 1)
Category.create(name: "Data Visualization", description: "", post_type: 2, status: 1)
Category.create(name: "Customers Testimonial", description: "", post_type: 3, status: 1)