###

MasonJS
Author: Drew Dahlman
Version: 2.0.3
License: MIT

Copyright (c) 2015 Drew Dahlman

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
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
				keepDataAndEvents: false
			}
			randomSizes: false
			randomFillers: false
			layout: 'none'
			gutter: 0
			debug: false
		}

		$self = null
		
		#------------------------------------------------------------------------------
		#
		#  Debug Elements
		#
		#------------------------------------------------------------------------------
		debug_elements = {
			container: $("<div id='debug'></div>")
			block: "<div class='mason-debug' style='background-color: rgba(244, 67, 54, .5); float: left;'></div>"
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
			startWidth: 0
		}

		#------------------------------------------------------------------------------
		#
		#  MasonJS Core
		#
		#------------------------------------------------------------------------------
		@each ->
			settings = $.extend(defaults, options)
			callbacks = $.extend(callback, complete)

			# create reference to the jQuery object
			$self = $(@)

			#------------------------------------------------------------------------------
			#
			#	Setup
			#	Do inital setup to get sizing 
			#
			#------------------------------------------------------------------------------
			setup = ->
				# console.log $self.width() - getScrollbarWidth()
				if settings.debug
					console.log "SETUP"

				#
				#	Check to see if a clear is in place yet or not
				#	This is used for measurement - VERY IMPORTANT
				#
				if $self.children(".mason_clear").length < 1
					$self.append(mason_clear)

				#
				#	Set the element block height
				#
				elements.block.height = Math.round(parseFloat(($self.width() / columnSize()) / settings.ratio)).toFixed(2)

				#
				#	Set the element block width
				#
				elements.block.width = Math.round(parseFloat(($self.width() / columnSize()))).toFixed(2)

				#
				#	Set Start Width
				#
				elements.startWidth = $self.width()


				sizeElements()

				#
				#	If the debug flag is on create an element and fill it to show the grid
				#
				if settings.debug
					console.log "############## Running In Debug Mode ##############"
					debug()

			#------------------------------------------------------------------------------
			#
			#	Size Elements
			#	Size and setup inital placement
			#
			#------------------------------------------------------------------------------
			sizeElements = ->

				#
				#	If there is only 1 column ( mobile ) size all elements
				#
				if columnSize() == 1
					$block = $self.children("#{settings.itemSelector}")
					$block.height(elements.block.height - (settings.gutter * 2))
					$block.width(elements.block.width - (settings.gutter * 2))
					$block.css
						'margin': settings.gutter

					#
					#	Complete Callback
					#
					if typeof callbacks.complete != "undefined"
						callbacks.complete()
				
				#
				#	More than 1 column do some math fool!
				#
				else

					#
					#	Loop over each element, size, place and fill out the matrix
					#
					$self.children("#{settings.itemSelector}", ".#{settings.filler.filler_class}").each ->
						$block = $(@)

						#
						#	Check to see if block is promoted and if so promote it
						#
						p = 0
						promoted = false
						promoted_size = 0
						while p < settings.promoted.length
							if $block.hasClass(settings.promoted[p][0])
								promoted = true
								promoted_size = p
							p++

						if promoted
							size = settings.promoted[promoted_size]

							#
							#	Assign the size to the block element
							#
							$block.data('size', promoted_size)
							$block.data('promoted', true)

							#
							#	Calculate the height and width of the block
							#
							h = parseFloat((elements.block.height * size[2])).toFixed(0)
							h = h - (settings.gutter * 2)

							w = parseFloat((elements.block.width * size[1])).toFixed(0)
							w = w - (settings.gutter * 2)

						else
							#
							#	Pick random number between 0 and the length of sizes
							#
							ran = Math.floor(Math.random() * settings.sizes.length)
							size = settings.sizes[ran]

							#
							#	Assign the size to the block element
							#
							$block.data('size', ran)

							#
							#	Calculate the height and width of the block
							#
							h = parseFloat((elements.block.height * size[1])).toFixed(0)
							h = h - (settings.gutter * 2)

							w = parseFloat((elements.block.width * size[0])).toFixed(0)
							w = w - (settings.gutter * 2)

						$block.height(h + 'px')
						$block.width(w + 'px')

						$block.css
							'margin': settings.gutter

					mason()


			#------------------------------------------------------------------------------
			#
			#	Mason
			#	Do the logic to place and fill out the matrix
			#
			#------------------------------------------------------------------------------
			mason = ->

				#
				#	Set some default sizes and numbers
				#
				col = columnSize()
				el_h = $self.height()
				block_h = Math.round(el_h / elements.block.height)
				elements.matrix = []

				#
				#	Loop over blocks and fill out the matrix with booleans
				#	Defaults to false first then we will do logic to set true
				#	based on the position of the blocks.
				#
				r = 0
				while r < block_h
					# Create the row
					elements.matrix[r] = []
					c = 0
					while c < col
						# Create the columns
						elements.matrix[r][c] = false
						c++
					r++

				#
				#	Populate the matrix
				#
				$self.children("#{settings.itemSelector}").each ->
					$block = $(@)

					#
					#	Calculate position based around dimensions
					#	t - top
					#	l - left
					#	s - data size
					#
					l = Math.round($block.position().left / elements.block.width)
					t = Math.round($block.position().top / elements.block.height)
					s = parseFloat($block.data('size'))

					#
					#	Get the element dimentions
					#	h - Height
					#	w - Width
					#	a - Area
					#
					if $block.data('promoted')
						h = settings.promoted[s][2]
						w = settings.promoted[s][1]
						a = h * w
					else
						h = settings.sizes[s][1]
						w = settings.sizes[s][0]
						a = h * w


					#
					#	Loop through the elements area and based on the size
					#	populate the matrix.
					#
					#	NOTE: Star with rows then move to columns
					#
					r = 0
					while r < a
						bh = 0
						while bh < h
							bw = 0
							elements.matrix[t + bh][l] = true
							while bw < w
								elements.matrix[t + bh][l + bw] = true
								bw++
							bh++
						r++

				layBricks()

			#------------------------------------------------------------------------------
			#
			#	Lay Bricks
			#	This is where mason fills in those gaps.
			#	If a filler has not been supplied Mason will use the current elements
			#
			#------------------------------------------------------------------------------
			layBricks = ->

				#
				#	r - Row index
				#	filler_index - The index of the filler object
				#
				r = 0
				filler_total = $("#{settings.filler.itemSelector}").not(".#{settings.filler.filler_class}").length
				filler_index = -1

				# Loop over each row
				while r < elements.matrix.length

					# Loop over row columns
					c = 0
					while c < elements.matrix[r].length

						# If the area is false in the matrix that means it is empty
						# so we need to fill it.
						if !elements.matrix[r][c]

							#
							#	Calculate the height and width of the block
							#
							h = elements.block.height
							w = elements.block.width

							#
							#	Get the correct placement
							#
							x = ( r * h ) + settings.gutter
							y = ( c * w ) + settings.gutter

							#
							#	Adjust the height and width for the grid
							#
							h = h - settings.gutter * 2
							w = w - settings.gutter * 2

							#
							#	Check to see if a filler has been specified or random fillers are on
							#
							if settings.randomFillers
								filler_index = Math.floor(Math.random() * filler_total)
							else
								if filler_index < filler_total
									filler_index++
								
								if filler_index == filler_total
									filler_index = 0

							#
							#	Assign filler
							#
							$filler = $("#{settings.filler.itemSelector}").not(".#{settings.filler.filler_class}").eq(filler_index).clone(settings.filler.keepDataAndEvents)

							$filler.addClass(settings.filler.filler_class)

							#
							#	Position the filler 
							#
							$filler.css
								position: 'absolute'
								top: x + 'px'
								left: y + 'px'
								height: h + 'px'
								width: w + 'px'
								margin: '0px'

							#
							#	Append filler
							#
							$filler.appendTo($self)

						c++
					r++

				#
				#	Check start width and if different remeasure
				#
				if $self.width() < elements.startWidth
					$(window, $self).trigger('resize')
				else
					#
					#	Complete Callback
					#
					if typeof callbacks.complete != "undefined"
						callbacks.complete()

			#------------------------------------------------------------------------------
			#
			#	Column Size
			#	Determine the column size and count based on screen sizes and settings
			#
			#------------------------------------------------------------------------------
			columnSize = ->
				w = parseFloat($self.width())
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

				return Math.floor(cols)

			#------------------------------------------------------------------------------
			#
			#	DEBUG
			#	Debug can be run by adding the 'debug' flag to true. This will draw out
			#	the area that mason understands it needs to fill.
			#
			#------------------------------------------------------------------------------
			debug = ->
				
				#
				#	Set some default sizes and numbers
				#
				$debug = $self.parent()
				col = columnSize()
				el_h = $self.height()
				block_h = el_h / elements.block.height

				# Copy over styles from the master grid
				debug_elements.container.css
					position: 'absolute'
					top: '0'
					left: '0'
					height: $self.height()
					width: $self.width()

				#
				#	Loop over blocks and fill out the matrix with booleans
				#	Defaults to false first then we will do logic to set true
				#	based on the position of the blocks.
				#
				i = 0
				while i < block_h
					c = 0
					while c < col
						block = $(debug_elements.block)

						# Size the blocks
						block.css
							height: elements.block.height - ( settings.gutter * 2 )
							width: elements.block.width - ( settings.gutter * 2 )
							margin: settings.gutter
						
						debug_elements.container.append(block)

						c++
					i++

				# Place clearfix
				debug_elements.container.append(mason_clear)

				# Place the container
				$debug.prepend(debug_elements.container)

			#------------------------------------------------------------------------------
			#
			#	Resize
			#
			#------------------------------------------------------------------------------
			if settings.layout == "fluid"
				resize = null
				$(window, $self).on 'resize', (event) =>
					$(".#{settings.filler.filler_class}").remove()
					elements.matrix = []
					
					clearTimeout(resize)
					resize = null

					resize = setTimeout( =>
						setup()
					,0)

					# setup()
					
			#------------------------------------------------------------------------------
			#
			#  Let 'er rip!
			#
			#------------------------------------------------------------------------------
			setup()

		return {
			destroy: () ->
				$(window, $self).off 'resize'
		}
) jQuery
