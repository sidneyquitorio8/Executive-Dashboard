class Report < ActiveRecord::Base
  attr_accessible :accounts, :accu, :activePayingRate, :activePayingUsers, :activeUsers, :area, :arpu, :company, :dailyDate, :dau, :lost, :newUser, :paying, :payingRate, :pccu, :registration, :sales, :server, :users
end
