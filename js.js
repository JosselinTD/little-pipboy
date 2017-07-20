var navPath = 'nav .main span';

$(function() {
	$('body').on('click', navPath, function() {
		$(navPath).removeClass('active');
		$(this).addClass('active');

		$('body').attr('class', $(this).attr('class'));
	});
});
