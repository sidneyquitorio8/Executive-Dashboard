class CreateReports < ActiveRecord::Migration
  def change
    create_table :reports do |t|
      t.integer :accounts
      t.integer :accu
      t.decimal :activePayingRate
      t.integer :activePayingUsers
      t.integer :activeUsers
      t.integer :area
      t.decimal :arpu
      t.integer :company
      t.timestamp :dailyDate
      t.integer :dau
      t.integer :lost
      t.integer :newUser
      t.integer :paying
      t.decimal :payingRate
      t.decimal :pccu
      t.integer :registration
      t.decimal :sales
      t.integer :server
      t.integer :users

      t.timestamps
    end
  end
end
