class AddGenderBirthDateAddressCountryPostalCodePhoneNumberToUsers < ActiveRecord::Migration
  def change
    add_column :users, :gender, :integer
    add_column :users, :birth_date, :datetime
    add_column :users, :country, :string
    add_column :users, :postal_code, :string
    add_column :users, :phone_number, :string
    add_column :users, :address, :string
  end
end
