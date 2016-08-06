//Calculate train's next arrival and how far away it is
var timeCalc = function(firstTrainTime, frequency) {

	var firstMoment = moment(firstTrainTime, "hh:mm");

	var currentMoment = moment();

	var totalRunTime = currentMoment.diff(firstMoment, "minutes");

	var numberOfRuns = Math.floor(totalRunTime / frequency);

	var lastRunMoment = firstMoment.add(numberOfRuns * frequency, "minutes");

	var nextRunMoment = lastRunMoment.add(frequency, "minutes");

	return {
		nextArrival: nextRunMoment.format('hh:mm A'),
		minutesAway: nextRunMoment.from(currentMoment, "minutes")
	}
};

//Displays info on table
var updateDisplay = function(trainName, destination, firstTrainTime, frequency) {

	var future = timeCalc(firstTrainTime, frequency);

	//Display input in table
	$('#trainSchedule').append('<tr>' + '<td>' + trainName  + '<td>' + destination + '<td>' + frequency + '<td>' + future.nextArrival + '<td>' + future.minutesAway + '</tr>');

};

var currentSchedule = JSON.parse(localStorage.getItem('currentSchedule')) || []

for (var i = 0; i < currentSchedule.length; i++) {
	var line = currentSchedule[i];

	updateDisplay(line.trainName, line.destination, line.firstTrainTime, line.frequency);
}
$('button').on('click', function(){

	var schedule = {
		trainName: $('#trainName').val().trim(),
		destination: $('#destination').val().trim(),
		firstTrainTime: $('#firstTrainTime').val(),
		frequency: $('#frequency').val()
	}

	currentSchedule.push(schedule);

	localStorage.setItem('currentSchedule', JSON.stringify(currentSchedule));


	updateDisplay(schedule.trainName, schedule.destination, schedule.firstTrainTime, schedule.frequency);
});