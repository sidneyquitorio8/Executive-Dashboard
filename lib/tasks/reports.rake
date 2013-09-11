task :store_reports, [:start, :end] => :environment do |t, args|

	start_date = Time.parse(args.start)
	end_date = Time.parse(args.end)

	session = Patron::Session.new
	session.timeout = 10
	session.base_url = "http://server.staging.gamefuse.com"
 	formatted_url = "/stat/getDailyDataSummary.action?company=45&area=1&server=1&minDailyDate=" + start_date.strftime("%Y-%m-%d") + "&maxDailyDate=" + end_date.strftime("%Y-%m-%d")
 	response = session.get(formatted_url)
 	if response.status < 400
 		result = JSON.parse(response.body)["result"]
 		result = JSON.parse(result)
 		result.each do |r|
 			Report.where(dailyDate: r["dailyDate"]).destroy_all
 			Report.create(accounts: r["accounts"], accu: r["accu"], activePayingRate: r["activePayingRate"], activePayingUsers: r["activePayingUsers"], activeUsers: r["activeUsers"], area: r["area"], arpu: r["arpu"], company: r["company"], dailyDate: r["dailyDate"], dau: r["dau"], lost: r["lost"], newUser: r["newUser"], paying: r["paying"], payingRate: r["payingRate"], pccu: r["pccu"], registration: r["registration"], sales: r["sales"], server: r["server"], users: r["users"])
 		end
 	end
end