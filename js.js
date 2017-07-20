$(function() {

	$('body').on('click', 'nav > span', function() {
		$('nav > span').removeClass('active');
		$(this).addClass('active');

		$('body').attr('class', $(this).attr('class'));
	});

});
