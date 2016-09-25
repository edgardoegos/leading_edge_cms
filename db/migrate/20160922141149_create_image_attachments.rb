class CreateImageAttachments < ActiveRecord::Migration
  def change
    create_table :image_attachments do |t|
      t.integer :post_id
      t.integer :post_type, default: 0, null: false
      t.integer :cover
      t.attachment :image

      t.timestamps null: false
    end
  end
end
