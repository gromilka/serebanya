jQuery(document).ready(function($){

	$(function(){								      
	var $container = $('#portfolio-main');							
	$container.isotope({
		masonry: {     
  	},
	itemSelector : '.box',
	resizable : true,
	resizesContainer:true
	});
	var $optionSets = $('.option-selection'),
		$optionLinks = $optionSets.find('a');
		$optionLinks.click(function(){
		var $this = $(this);
		// don't proceed if already selected
			if ( $this.hasClass('active') ) {
				return false;
			}
		var $optionSet = $this.parents('.option-selection');
		$optionSet.find('.active').removeClass('active');
		$this.addClass('active');
		// make option object dynamically, i.e. { filter: '.my-filter-class' }
		var options = {},
		   key = $optionSet.attr('data-option-key'),
		    value = $this.attr('data-option-value');
		// parse 'false' as false boolean
		value = value === 'false' ? false : value;
		options[ key ] = value;
		if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
		// changes in layout modes need extra logic
		changeLayoutMode( $this, options )
		} else {
		// otherwise, apply new options
		$container.isotope( options );
		}
		return false;
		});
	$container.infinitescroll({
        navSelector  : '#page_nav',    // selector for the paged navigation 
        nextSelector : '#page_nav a',  // selector for the NEXT link (to page 2)
        itemSelector : '.box',     // selector for all items you'll retrieve
        loading: {
            finishedMsg: 'No more pages to load.',
            img: 'http://i.imgur.com/qkKy8.gif'
          }
        },
        // call Isotope as a callback
        function( newElements ) {
          $container.isotope( 'appended', $( newElements ) ); 
        }
      );
	});
});