class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.integer :post_type, default: 0, null: false
      t.integer :category_id
      t.integer :status, default: 0, null: false
      t.integer :featured, default: 0, null: false
      t.text :body
      t.integer :created_by
      t.integer :published_by
      t.datetime :published_at

      t.timestamps null: false
    end
  end
end
