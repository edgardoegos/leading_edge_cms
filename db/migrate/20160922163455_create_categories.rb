class CreateCategories < ActiveRecord::Migration
  def change
    create_table :categories do |t|
      t.integer :post_type, default: 0, null: false
      t.string :name
      t.string :description
      t.integer :status

      t.timestamps null: false
    end
  end
end
