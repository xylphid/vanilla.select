/**
 * Vanilla select ;) (https://github.com/xylphid)
 * Version 1.0.2
 *
 * @author Anthony PERIQUET
 */
(function(window, document) {
	currentSelect = null;

	vanilla.select = function( query, options ) {
		if (!(this instanceof vanilla.select))
			return new vanilla.select( query, options );

		currentSelect = self = this;
		self.options = vanilla.extend({}, vanilla.select.defaults, options);
		self.query = query;
		if (typeof query !== typeof undefined) {
			self.items = vanilla(query);
		}

		self.__init__();
	};

	vanilla.select.prototype = {
		contructor: vanilla.select,

		__init__: function() {
			self.items.each(function( elm ){
        		self.beautify(elm);
        	});

        	document.removeEventListener('click', self._bindSelect, false);
        	document.addEventListener('click', self._bindSelect, false);
		},

        _bindSelect: function( event ){
			var target = event.target;
			if (vanilla.is( target, '.vanilla-select > label')) {
				self.show(target.parentNode);
			} else if (vanilla.is( target, '.vanilla-select > .options > label')) { // Click hack
			} else if (vanilla.is( target, '.vanilla-select > .options > label > input')) {
				var container = vanilla(target.parentNode)
						.parent()
						.parent();
				self._setSelected( target.parentNode );
				self._updatePlaceholder( container );
			} else {
				while (target && target.className != 'vanilla-select') {
	                target = target.parentNode;
	            }
	            if (target) self.show(target);
	            else self.close();
			}
		},

		_setSelected: function( option ){
			var input = vanilla(option)
					.toggleClass('selected')
					.children('input')
					.toggleAttr('checked', 'checked'),
				select = vanilla(option).parent()
					.parent()
					.prev();

			select.children().each(function( elm ){
				var value = elm.attr('value') !== undefined ? elm.attr('value') : elm.html();
				if (value == input.value()) {
					elm.toggleAttr('selected', 'selected');
				} else if (select.attr("multiple") === undefined) {
					vanilla(option).parent()
						.children('* > [value="' + value + '"]')
						.attr('checked', null)
						.parent()
						.removeClass('selected');
					elm.attr('selected', null);
				}
			});
			if (select.attr('multiple') === undefined) self.close();
		},

        show: function( container ){
        	container = vanilla(container);
        	vanilla('.vanilla-select.opened').each(function( elm ){
        		if (elm.nodes[0] != container.nodes[0]) { elm.toggleClass('opened'); }
        	});
        	container.toggleClass('opened');
        },

        close: function(){
        	vanilla('.vanilla-select').each(function( elm ){
        		elm.removeClass('opened');
        	});
        },

        beautify: function( source ) {
        	var container = vanilla('<div>').addClass('vanilla-select');

        	// Set width according to source
        	if (source.outerWidth() > parseInt(container.css('width'))) {
                container.css('width', source.outerWidth() + 'px');
        		container.css('flex-basis', source.outerWidth() + 'px');
        	}

        	source.css('display', 'none');
        	self._setPlaceholder(container, source);
        	self._setOptions(container, source);
        	source.after(container);
        },

        _updatePlaceholder: function( container ) {
        	container.firstChild().remove();
        	self._setPlaceholder( container, container.prev());
        },

        _setPlaceholder: function( container, source ){
        	var selected = source.children('[selected]'),
        		placeholder = vanilla('<label>');

        	if (!selected.length()) {
                value = source.attr("data-placeholder") ? source.attr("data-placeholder") : self.options.placeholder.empty;
        		placeholder.html( value);
        	} else {
        		var content = [];
        		selected.each(function( source ){
        			content.push( source.html() );
        		});

        		placeholder.attr('title', content.join(', '));
        		placeholder.html(
        			selected.length() <= self.options.placeholder.maxLength ?
        			content.join(", ") : 
        			String.format(self.options.placeholder.overflow, selected.length())
        			);
        	}

        	container.prepend(placeholder);
        },

        _setOptions: function( container, elm ){
        	var options = vanilla('<div>')
        		.addClass('options');
        	elm.children().each(function( item ){
        		var value = typeof item.attr('value') !== typeof undefined ? item.attr('value') : item.html();
        		// Set label
        		var option = vanilla('<label>')
        			.addClass('option')
        			.html( item.html() );
        		// Create and prepend checkbox
        		var checkbox = vanilla('<input />')
        			.attr('type', 'checkbox')
        			.attr('value', value);
        		if (elm.attr('multiple') === undefined) { checkbox.addClass('hidden'); }
        		if (item.is('[selected=selected]')) {
        			option.addClass('selected');
        			checkbox.attr('checked', 'checked');
        		}
        		checkbox.prependTo( option );

        		options.append( option );
        	});
        	container.append(options);
        }
	};

	// Multiselect default options
    vanilla.select.defaults = {
    	placeholder: {
    		maxLength: 2,
    		empty: 'No selection',
    		overflow: '{0} items selected'
    	}
    };

    String.format = function() {
		var s = arguments[0];
		for (var i = 0; i < arguments.length - 1; i++) {       
			var reg = new RegExp("\\{" + i + "\\}", "gm");             
			s = s.replace(reg, arguments[i + 1]);
		}
		return s;
	};

	vanilla.prototype.select = function(options) {
        if (this instanceof vanilla) {
            currentSelect = new vanilla.select(this, options);
        }
        return this;
    }

    vanilla(document).ready(function() {
    	vanilla("select.beautify").select();
    });

})(window, document);