# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130911002009) do

  create_table "reports", :force => true do |t|
    t.integer  "accounts"
    t.integer  "accu"
    t.decimal  "activePayingRate"
    t.integer  "activePayingUsers"
    t.integer  "activeUsers"
    t.integer  "area"
    t.decimal  "arpu"
    t.integer  "company"
    t.datetime "dailyDate"
    t.integer  "dau"
    t.integer  "lost"
    t.integer  "newUser"
    t.integer  "paying"
    t.decimal  "payingRate"
    t.decimal  "pccu"
    t.integer  "registration"
    t.decimal  "sales"
    t.integer  "server"
    t.integer  "users"
    t.datetime "created_at",        :null => false
    t.datetime "updated_at",        :null => false
  end

end
