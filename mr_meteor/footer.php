<?php
	$dir = get_template_directory_uri();
?>
<div class="scroll_ghost"
     id="scroll_ghost">
  <div class="scroll_expand"
	     id="scroll_expand"></div>
</div>

<footer id="the_footer">
	<address class="visually_hidden">
		<dl>
			<dt class="small">all content &#169; copyright 2013<?php echo( date("Y") != 2013 ? '-'.date("Y") : '' ); ?> by</dt>
			<dd>
				<a href="/contact">Skip Wrightson</a>
			</dd>
			<dt>mr meteor design and development:</dt>
			<dd>
				<a href="http://onkybonk.com" target="_blank">Nate Lord</a>
			</dd>
			<dt>request animation frame shim:</dt>
			<dd>
				<a href="http://paulirish.com/2011/requestanimationframe-for-smart-animating/" target="_blank">Paul Irish</a>
			</dd>
			<dd>
				<a href="http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating" target="_blank">Erik Möller.</a>
			</dd>
			<dd class="small">
				<a href="<?php echo $dir; ?>/licenses/rAF.txt" target="_blank">license</a>
			</dd>
			<dt>transit jQuery plugin:</dt>
			<dd>
				<a href="http://ricostacruz.com/jquery.transit" target="_blank">Rico Sta. Cruz</a>
			</dd>
			<dd class="small">
				<a href="<?php echo $dir; ?>/licenses/transit.txt" target="_blank">license</a>
			</dd>
			<dt>modernizr library:</dt>
			<dd>
				<a href="http://farukat.es" target="_blank">Faruk Ateş</a>
			</dd>
			<dd>
				<a href="http://www.paulirish.com" target="_blank">Paul Irish</a>
			</dd>
			<dd>
				<a href="http://alexsexton.com" target="_blank">Alex Sexton</a>
			</dd>
			<dd>
				<a href="http://www.thecssninja.com" target="_blank">Ryan Seddon</a>
			</dd>
			<dd>
				<a href="https://github.com/aFarkas" target="_blank">Alexander Farkas</a>
			</dd>
			<dd class="small">
				<a href="<?php echo $dir; ?>/licenses/modernizr.txt" target="_blank">license</a>
			</dd>
			<dt>scroll to jQuery plugin:</dt>
			<dd>
				<a href="http://flesler.blogspot.com/2007/10/jqueryscrollto.html" target="_blank">Ariel Flesler</a>
			</dd>
			<dd class="small">
				<a href="<?php echo $dir; ?>/licenses/scrollto.txt" target="_blank">license</a>
			</dd>
			<dt>easing jQuery plugin:</dt>
			<dd>
				<a href="http://gsgd.co.uk/sandbox/jquery/easing/" target="_blank">George McGinley Smith</a>
			</dd>
			<dd class="small">
				<a href="<?php echo $dir; ?>/licenses/easing.txt" target="_blank">license</a>
			</dd>
			<dt>easing history plugin:</dt>
			<dd>
				<a href="https://github.com/browserstate/history.js" target="_blank">Benjamin Lupton</a>
			</dd>
			<dd class="small">
				<a href="<?php echo $dir; ?>/licenses/history.txt" target="_blank">license</a>
			</dd>
		</dl>
	</address>
</footer>
<?php wp_footer(); ?>
</body>
</html>