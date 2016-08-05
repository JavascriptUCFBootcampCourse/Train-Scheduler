//Calculate train's next arrival and how far away it is
var timeCalc = function(firstTrainTime, frequency) {

	//Retrieve localStorage data
	var firstTimeCalc = firstTrainTime;
	var frequencyCalc = frequency;

	//Use moment.js to pull current time
	var currentTime = moment().format("MM/DD/YY hh:mm A");
	
	//Determine nextArrival
	var nextArrival = moment(currentTime).format("hh:mm");
	
	//Determine minutesAway
	var minutesAway = moment(currentTime).diff( firstTimeCalc, "minutes");

	return {
		nextArrival: nextArrival,
		minutesAway: minutesAway
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

//Variables
//User input
/*var trainName = localStorage.getItem("trainName") || '';
var destination = localStorage.getItem("destination") || '';
var firstTime = localStorage.getItem("firstTrainTime") || 0;
var frequency = localStorage.getItem("frequency") || 0;*/

//moment.js input
/*var nextArrival = 0;
var minutesAway = 0;*/

//Functions
//Submit button clicked
$('button').on('click', function(){

	var schedule = {
		trainName: $('#trainName').val().trim(),
		destination: $('#destination').val().trim(),
		firstTime: $('#firstTrainTime').val(),
		frequency: $('#frequency').val()
	}

	currentSchedule.push(schedule);

	localStorage.setItem('currentSchedule', JSON.stringify(currentSchedule));

	//Grab input value and set to variables
	/*trainName = $('#trainName').val().trim();
	destination = $('#destination').val().trim();
	firstTime = $('#firstTrainTime').val();
	frequency = $('#frequency').val();

	//Add variables to localStorage
	localStorage.setItem("trainName", trainName);
	localStorage.setItem("destination", destination);
	localStorage.setItem("firstTrainTime", firstTime);
	localStorage.setItem("frequency", frequency);*/
	
	//Clear input
	//RESET BUTTON?

	updateDisplay(schedule.trainName, schedule.destination, schedule.firstTrainTime, schedule.frequency);
});
