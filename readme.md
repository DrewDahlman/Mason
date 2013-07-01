<img src='http://drewdahlman.com/experiments/mason/logo.png'>
##Mason.js
Mason.js is a jQuery plugin that allows you to create a perfect grid of elements.<br/><br/>
This is not Masonry, or Isotope or Gridalicious. Mason fills in those ugly gaps, and creates a perfectly filled space.

##USE
<br/><br/>
<strong>Basic CSS </strong>
<pre>
#container {
	width: 100%
	position: relative;
}
.box {
	float: left;
	background-color: #00ffff;
	position: relative;
}
</pre>
<br/><br/>
<strong>Call Mason.js ( BASIC )</strong>
<pre>
$("#container").mason({
	itemSelector: ".box",
	ratio: 1.5,
	sizes: [
		[1,1],
		[1,2],
		[2,2]
	]
});
</pre>

##OPTIONS
Mason.js has a number of options:
<pre>
$("#container").mason({
	itemSelector: ".box",
	ratio: 1.5,
	sizes: [
		[1,1],
		[1,2],
		[2,2]
	],
	columns: [
		[0,480,1],
		[480,780,2],
		[780,1080,3],
		[1080,1320,4],
		[1320,1680,5]
	],
	filler: {
		itemSelector: '.fillerBox',
		filler_class: 'custom_filler'
	},
	layout: 'fluid',
	gutter: 10
},function(){
	console.log("COMPLETE!")
});
</pre>
<ul>
	<li><strong>itemSelector</strong>
		<ul>
			<li>the element that makes up your grid</li>
		</ul>
	</li>
	<li><strong>ratio</strong>
		<ul>
			<li>The ratio is a number that is used to create the blocks based on column count and width.</li>
		</ul>
	</li>
	<li><strong>sizes</strong>
		<ul>
			<li>Sizes are an array of sizes you wish to use in your grid. These are composed of block numbers. ( ex: [1,1] means 1 block high, 1 block wide )</li>
		</ul>
	</li>
	<li><strong>columns</strong>
		<ul>
			<li>columns are an array of break points for your columns. Think of this like media queries. start small and grow. They should be formatted as [min,max,cols]</li>
		</ul>
	</li>
	<li><strong>filler</strong>
		<ul>
			<li>itemSelector: This describes the elements to be used to fill in blank spaces. This will default to the original itemSelector if there is nothing</li>
			<li>filler_class: This is a class given to filler elements within the grid, used for cleaning up if a grid set to fluid</li>
		</ul>
	</li>
	<li><strong>Layout</strong>
		<ul>
			<li>There are two layouts, fluid and fixed. Mason will default to fixed. Fluid means it will be responsive.</li>
		</ul>
	</li>
	<li><strong>Callback</strong>
		<ul>
			<li>You can add a callback function to Mason to notify you when the grid has completed building.</li>
		</ul>
	</li>
	<li><strong>Gutter</strong>
		<ul>
			<li>Allows you to add spacing between the elements, think of this as a margin.</li>
		</ul>
	</li>
</ul>

##EXAMPLES
<a href='https://drewdahlman.com/experiments/mason/example/fluid.html' target='_blank'>Fluid</a><br/>
<a href='https://drewdahlman.com/experiments/mason/example/fixed.html' target='_blank'>Fixed</a><br/>
<a href='https://drewdahlman.com/experiments/mason/example/fluid_gutters.html' target='_blank'>Fluid Gutters</a>

##Updates
6.1.13 - Updated to use filler blocks once and not repeat.
