// Init model with previous values or default one
var model = JSON.parse(localStorage.getItem('model')) || {
	karma: '0',
	pv: '0'
};

// Available actions on model
$(function() {
	// Show the javascript prompt to enter a value
	$('body').on('click', '[data-prompt]', function() {
		var attrName = $(this).data('prompt');
		var newValue = prompt('Quelle est la valeur de ' + attrName + ' ?', model[attrName] || '');

		if (newValue !== null) {
			model[attrName] = newValue;
			updateModel();
		}
	});

	// A click increment or decrement a value
	$('body').on('click', '[data-less]', function() {
		var attrName = $(this).data('less');
		var newValue = parseInt((model[attrName] || 0)) - 1;
		model[attrName] = newValue;

		updateModel();
	});
	$('body').on('click', '[data-more]', function() {
		var attrName = $(this).data('more');
		var newValue = parseInt((model[attrName] || 0)) + 1;
		model[attrName] = newValue;

		updateModel();
	});

	// After page loading, we load the model
	updateModel();
});

// Model save and view refresh
function updateModel() {
	localStorage.setItem('model', JSON.stringify(model));
	Object.keys(model).forEach(function(attrName) {
		$('[data-html=' + attrName + ']').html(model[attrName]);
	});
}