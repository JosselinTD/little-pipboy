$(function() {
	$('body').on('click', '[data-nav]', function() {
		$('[data-current-nav]').removeAttr('data-current-nav');
		$(this).attr('data-current-nav', '');

		$('body').attr('class', $(this).attr('data-nav'));
	});

	$('body').attr('class', 'infos');

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