class CreateSettings < ActiveRecord::Migration
  def change
    create_table :settings do |t|
      t.string :name
      t.attachment :image
      t.text :body

      t.timestamps null: false
    end
  end
end
