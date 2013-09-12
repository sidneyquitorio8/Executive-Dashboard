$(document).ready(function() {

	var all_series = [];
	var accu_series;
	var accu_data = [];
	var pccu_series = [];
	var pccu_data = [];


	function draw_charts() {

		$('#container').highcharts('StockChart', {

			rangeSelector : {
				selected : 1
			},
			
			series : all_series

		});


		alert("drawn charts");
	}

	//Function that takes a record and fills the series data with that record
	function fill_data(index, record) {
		var date = new Date(record['dailyDate']);
		var utc_date = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
		accu_data[index] = [utc_date, parseFloat(record['accu'])];
	}

	// //Function that sets up the series data for plotting
	function fill_series() {
		accu_series = {
                name: "ACCU",
                data: accu_data
        };
        all_series[0] = accu_series;
	}

	//Pull data from API, format it, and store into the series arrays
	(function() {
		var current_date = new Date();
		var formatted_current_date = current_date.getFullYear() + "-" + (current_date.getMonth()+1) + "-" + current_date.getDate();
		var min_daily_date = "2013-08-06";
		var api_call = "http://server.staging.gamefuse.com/stat/getDailyDataSummary.action?company=45&area=1&server=1&minDailyDate=" + min_daily_date + "&maxDailyDate=" + formatted_current_date;
		$.ajax({
  			url: api_call,
  			dataType: 'jsonp',
  			success:function(data){
    			var json_result = JSON.parse(data['result']);
    			$.each(json_result, function(index, record) {
    				fill_data(index,record);
    			});
    			fill_series();
    			draw_charts();
    			
  			}
		});
	})();


});




