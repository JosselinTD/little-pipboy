var navPath = 'nav .main span';

var model = JSON.parse(localStorage.getItem('model')) || {};

$(function() {
	$('body').on('click', navPath, function() {
		$(navPath).removeClass('active');
		$(this).addClass('active');

		$('body').attr('class', $(this).attr('class'));
	});

	$('body').on('click', '[data-prompt]', function() {
		var attrName = $(this).data('prompt');
		var newValue = prompt('Quelle est la valeur de ' + attrName + ' ?', model[attrName] || '');

		if (newValue !== null) {
			model[attrName] = newValue;
			updateModel();
		}
	});

	updateModel();
});

function updateModel() {
	localStorage.setItem('model', JSON.stringify(model));
	Object.keys(model).forEach(function(attrName) {
		$('[data-html=' + attrName + ']').html(model[attrName]);
	});
}