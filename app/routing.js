$(function() {
	$('body').on('click', '[data-nav]', function() {
		$('[data-current-nav]').removeAttr('data-current-nav');
		$(this).attr('data-current-nav', '');

		$('body').attr('class', $(this).attr('data-nav'));
	});

	$('body').attr('class', 'infos');
});