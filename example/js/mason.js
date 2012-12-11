/*
 * MASON.js
 * Author: Drew Dahlman ( www.drewdahlman.com )
 * Version: 1.0
*/

(function($){
	$.fn.mason = function(options,callback) {

		var defaults = {
			itemSelector: null,
			ratio: 0,
			sizes: [],
			columns: [
				[0,480,1],
				[480,780,2],
				[780,1080,3],
				[1080,1320,4],
				[1320,1680,5]
			],
			promoted: []
		}

		var elements = {
			block: {
				height: 0,
				width: 0
			},
			matrix: []
		}

		return this.each(function() {
			var settings = $.extend(defaults,options);
			var callbacks = $.extend(callback,callback);

			var $self = $(this);

			/*
			 * Create Blocks and give dimensions
			*/
			function setup(){
				elements.block.height = (( $self.width() / columnSize() ) / settings.ratio ).toFixed(0);
				elements.block.width = ( $self.width() / columnSize() );

				// Size Elements
				sizeElements();
			}

			/*
			 * Size elements according to block size and column count
			*/
			function sizeElements(){

				if( columnSize() == 1){
					$sel = $(settings.itemSelector);
					$sel.height(elements.block.height);
					$sel.width(elements.block.width);
				}
				else {
					for(var i = 0; i < settings.promoted.length; i++){
						settings.sizes.push([settings.promoted[i][0],settings.promoted[i][1]])
					}

					$(settings.itemSelector).each(function(){
						$sel = $(this);
						
						// pick a random number between 0 and the length of sizes ( - the promoted size! )
						ran = Math.floor( Math.random() * (settings.sizes.length - settings.promoted.length) );
						ranSize = settings.sizes[ran];

						for(var i = 0; i < settings.promoted.length; i++){
							if( $sel.hasClass(settings.promoted[i][2]) ){
								ranSize = [settings.promoted[i][0],settings.promoted[i][1]];
								ran = settings.sizes.length + i;
							}
						}

						$sel.data('size',ran);

						var h = ( elements.block.height * ranSize[1] ).toFixed(2);
						var w = ( elements.block.width * ranSize[0] );

						$sel.height(h+'px');
						$sel.width(w+'px');
					});


				}

				
			}

			/*
			 * Determine Our Columns
			*/
			function columnSize(){
				var w = Math.floor($self.width()),cols = 0,colsCount = settings.columns.length - 1;

				if( w > settings.columns[colsCount][1]){
					cols = settings.columns[colsCount][2];
				}
				else {
					for(var i = 0; i <= colsCount; i++){
						if( w > settings.columns[i][0] && w < settings.columns[i][1]){
							cols = settings.columns[i][2]
						}
					}
				}
				return cols;
			}

			setup();
		});
	};
})(jQuery);