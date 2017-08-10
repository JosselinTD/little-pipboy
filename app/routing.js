$(function() {
	$('body').on('click', '[data-nav]', function() {
		$('[data-current-nav]').removeAttr('data-current-nav');
		$(this).attr('data-current-nav', '');

		$('body').attr('class', $(this).attr('data-nav'));
	});

	$('body').attr('class', 'infos');

	$('body').on('click', '[data-chrono-plus]', chronoPlus);
	$('body').on('click', '[data-chrono-moins]', chronoMoins);

	startTime();
});

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  // add a zero in front of numbers<10
  m = checkTime(m);
  document.getElementById('time').innerHTML = h + ":" + m;
  t = setTimeout(function() {
    startTime()
  }, 500);
}

function startTimer() {
  var presentTime = document.getElementById('timer').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond((timeArray[1] - 1));
  if(s==59){m=m-1}

	if (m<0) {
		document.getElementById('timer').innerHTML = "00:00";
	} else {
	  document.getElementById('timer').innerHTML = m + ":" + s;
	  setTimeout(startTimer, 1000);
	}
}

function chronoPlus() {
	var presentTime = document.getElementById('timer').innerHTML;
	var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond(+timeArray[1]);

	m++;

	document.getElementById('timer').innerHTML = m + ":" + s;
}

function chronoMoins() {
	var presentTime = document.getElementById('timer').innerHTML;
	var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond(+timeArray[1]);

	m--;

	document.getElementById('timer').innerHTML = m + ":" + s;
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  return sec;
}