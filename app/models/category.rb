class Category < ActiveRecord::Base
    enum post_type: [:post, :platform, :solution, :case_study]
    enum status: {active: 1, inactive: 0}
end
