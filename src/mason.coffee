###

MasonJS
Author: Drew Dahlman
Version: 2.0.0
License: MIT

###

(($) ->
	$.fn.mason = (options, complete) ->

		#------------------------------------------------------------------------------
		#
		#  Default options
		#
		#------------------------------------------------------------------------------
		defaults = {
			itemSelector: ''
			ratio: 0
			sizes: []
			columns: [
				[0, 480, 1],
				[480, 780, 2],
				[780, 1080, 3],
				[1080, 1320, 4],
				[1320, 1680, 5]
			]
			promoted: []
			filler: {
				itemSelector: options.itemSelector
				filler_class: 'mason_filler'
			}
			randomSizes: false
			randomFillers: false
			layout: 'none'
			gutter: 0
		}

		#------------------------------------------------------------------------------
		#
		#  Elements
		#
		#------------------------------------------------------------------------------
		mason_clear = "<div class='mason_clear' style='clear:both; position:relative;'></div>"

		#------------------------------------------------------------------------------
		#
		#  Complete callback
		#  if the callback exists set up as options
		#
		#------------------------------------------------------------------------------
		if complete
			callback = {
				complete: complete
			}

		#------------------------------------------------------------------------------
		#
		#  Elements
		#
		#------------------------------------------------------------------------------
		elements = {
			block: {
				height: 0
				width: 0
			}
			matrix: []
		}

		#------------------------------------------------------------------------------
		#
		#  MasonJS Core
		#
		#------------------------------------------------------------------------------
		@each( ->
			settings = $.extend(defaults, options)
			callbacks = $.extend(callback, complete)

			# create reference to the jQuery object
			$self = $(@)

			#
			#	Setup
			#
			setup = ->

				#
				#	Check to see if a clear is in place yet or not
				#	This is used for measurement - VERY IMPORTANT
				#
				if $self.children(".mason_clear").length < 1
					$self.append(mason_clear)

				#
				#	Set the element block height
				#
				elements.block.height = parseFloat((($self.width() / columnSize()) / settings.ratio).toFixed(0))

				#
				#	Set the element block width
				#
				elements.block.width = parseFloat(($self.width() / columnSize()))

				sizeElements()

			sizeElements = ->

				#
				#	Set some default sizes and numbers
				#
				col = columnSize()
				el_h = $self.height()
				block_h = (el_h / elements.block.height)
				elements.matrix = []

				#
				#	If there is only 1 column ( mobile ) size all elements
				#
				if col == 1
					$block = $self.children(settings.itemSelector)
					$block.height(elements.block.height)
					$block.width(elements.block.width)
					$block.css
						'margin': '0px'
				
				#
				#	More than 1 column do some math fool!
				#
				else

					# #	TODO - Look to remove
					# #	Push our promoted sizes into our sizes
					# #
					# i = 0
					# while i < settings.promoted.length
					# 	settings.sizes.push([
					# 		settings.promoted[i][0], 
					# 		settings.promoted[i][1]
					# 	])
					# 	i++

					#
					#	Loop over each element, size, place and fill out the matrix
					#
					$self.children(settings.itemSelector).each( ->
						$block = $(@)

						#
						#	Pick random number between 0 and the length of sizes
						#
						ran = Math.floor(Math.random() * settings.sizes.length
						ranSize = settings.sizes[ran]

						#
						#	Assign the size to the block element
						#
						$block.data('size', ran)

						#
						#	Calculate the height and width of the block
						#
						h = parseFloat((element.block.height * ranSize[1].toFixed(2)))
						h = h - settings.gutter * 2

						w = parseFloat((element.block.width * ranSize[2].toFixed(2))
						w = w - settings.gutter * 2

						$block.height(h + 'px')
						$block.width(w + 'px')

						$block.css
							'margin': settings.gutter
					)

					
					i = 0
					while i < block_h
						elements.matrix[i] = []
						c = 0
						while c < col
							elements.matrix[i][c] = false
							c++
						i++


			columnSize = ->
				w = Math.floor($self.width())
				cols = 0
				colsCount = settings.columns.length - 1

				#
				#	Determine the number of columns based on options
				#
				if w >= settings.columns[colsCount[1]]
					cols = settings.columns[colsCount[2]]
				else
					i = 0
					while i <= colsCount
						if w > settings.columns[i][0] && settings.columns[i][1]
							cols = settings.columns[i][2]
						i++

				return cols


			#------------------------------------------------------------------------------
			#
			#  Let 'er rip!
			#
			#------------------------------------------------------------------------------
			setup()
		)


		return
) jQuery
