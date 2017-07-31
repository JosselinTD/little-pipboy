// Init model with previous values or default one
var model = Object.assign({
	karma: '0',
	pv: '0',
	skills: [],
	addictions: [],
	inventory: [],
	contacts: []
}, JSON.parse(localStorage.getItem('model')));

// Available actions on model
$(function() {
	// Show the javascript prompt to enter a value
	$('body').on('click', '[data-prompt]', function() {
		var attrName = $(this).data('prompt');

		var previousValue = model[attrName];
		if (attrName.indexOf('$') !== -1) {
			var attrNameArray = attrName.split('$');
			attrName = attrNameArray[1];
			var containerName = attrNameArray[0];
			var index = $(this).parent().index();
			previousValue = model[containerName][index][attrName];
		}

		var newValue = prompt('Quelle est la valeur de ' + attrName + ' ?', previousValue || '');

		if (newValue !== null) {
			if (!containerName) {
				model[attrName] = newValue;
			} else {
				model[containerName][index][attrName] = newValue;
			}
			
			updateModel();
		}
	});

	// A click increment or decrement a value
	$('body').on('click', '[data-less]', function() {
		var attrName = $(this).data('less');

		if (attrName.indexOf('$') !== -1) {
			var attrNameArray = attrName.split('$');
			attrName = attrNameArray[1];
			var containerName = attrNameArray[0];
			var index = $(this).parent().index();
			var newValue = parseInt((model[containerName][index][attrName] || 0)) - 1;
			model[containerName][index][attrName] = newValue
		} else {
			var newValue = parseInt((model[attrName] || 0)) - 1;
			model[attrName] = newValue;
		}

		updateModel();
	});
	$('body').on('click', '[data-more]', function() {
		var attrName = $(this).data('more');

		if (attrName.indexOf('$') !== -1) {
			var attrNameArray = attrName.split('$');
			attrName = attrNameArray[1];
			var containerName = attrNameArray[0];
			var index = $(this).parent().index();
			var newValue = parseInt((model[containerName][index][attrName] || 0)) + 1;
			model[containerName][index][attrName] = newValue
		} else {
			var newValue = parseInt((model[attrName] || 0)) + 1;
			model[attrName] = newValue;
		}

		updateModel();
	});
	$('body').on('click', '[data-fn]', function() {
		var fnToCall = $(this).data('fn');

		window[fnToCall]();
		updateModel();
	})
	$('body').on('click', '[data-delete]', function() {
		var attrName = $(this).data('delete');

		if (attrName.indexOf('$')) {
			var attrNameArray = attrName.split('$');
			attrName = attrNameArray[1];
			var containerName = attrNameArray[0];
			var index = $(this).parent().index();

			if (attrName) {
				delete model[containerName][index][attrName];
			} else {
				model[containerName].splice(index, 1);
			}
		} else {
			delete model[attrName];
		}

		updateModel();
	});

	// After page loading, we load the model
	updateModel();
});

// Model save and view refresh
function updateModel() {
	localStorage.setItem('model', JSON.stringify(model));
	Object.keys(model).forEach(function(attrName) {
		var value = model[attrName];
		if (!Array.isArray(value)) {
			$('[data-html=' + attrName + ']').html(value);
		} else {
			var template = $('[data-list=' + attrName + '][data-template]').last();
			var templateContainer = template.parent();
			templateContainer.empty();
			value.forEach(function(el) {
				var templateApplied = template.clone();
				templateApplied.removeAttr('data-template');
				Object.keys(el).forEach(function(subAttrName) {
					var subValue = el[subAttrName];
					templateApplied.find('[data-html="' + attrName + '$' + subAttrName + '"]').html(subValue);
				});
				templateApplied.appendTo(templateContainer);
			});
			template.appendTo(templateContainer);
		}
	});
}

function addSkill() {
	var skillName = prompt('Quel est le nom de la compétence ?');

	if(!skillName) {
		return;
	}

	model.skills.push({
		nom: skillName,
		value: 0
	});
}

function addAddiction() {
	var addictionName = prompt('Quel est le nom de l\'addiction ?');

	if(!addictionName) {
		return;
	}

	model.addictions.push({
		nom: addictionName,
		value: 0
	});
}

function addInventory() {
	var inventoryName = prompt('Quel est le nom de l\'objet ?');

	if(!inventoryName) {
		return;
	}

	model.inventory.push({
		nom: inventoryName,
		value: 0
	});
}

function addContact() {
	var contactName = prompt('Quel est le nom du contact ?');
	var contactJob = prompt('Quel est son job ?');

	if(!contactName) {
		return;
	}

	if (!contactJob) {
		return;
	}

	model.contacts.push({
		nom: contactName,
		job: contactJob
	});
}