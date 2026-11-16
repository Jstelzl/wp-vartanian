<?php
/**
 * Footer
 *
 * @package StructurePress
 */

$structurepress_footer_widgets_layout = StructurePressHelpers::footer_widgets_layout_array();
$structurepress_footer_allowed_html = array(
	'a'      => array(
		'href'   => array(),
		'target' => array(),
		'title'  => array(),
	),
	'em'     => array(),
	'strong' => array(),
	'img'    => array(
		'src'    => array(),
		'alt'    => array(),
		'width'  => array(),
		'height' => array(),
	),
	'span'   => array(
		'class'  => array(),
	),
	'i'      => array(
		'class'  => array(),
	),
);

/**
 * Inject copyright inside the first footer column (before the column closes).
 *
 * @param array $params Sidebar params.
 * @return array
 */
$structurepress_footer_copyright_params = function ( $params ) use ( $structurepress_footer_allowed_html ) {
	static $done = false;

	if ( $done || 'footer-widgets' !== $params[0]['id'] ) {
		return $params;
	}

	$done = true;
	$copyright = wp_kses(
		apply_filters(
			'structurepress_footer_right_txt',
			get_theme_mod( 'footer_right_txt', '&copy; 2016 Vartanian Construction. All rights reserved.' )
		),
		$structurepress_footer_allowed_html
	);

	// after_widget is normally: </div></div> (close .widget, then close column).
	$params[0]['after_widget'] = '</div><div class="footer-top__copyright">' . $copyright . '</div></div>';

	return $params;
};

?>

	<footer class="footer">
		<div class="footer-top">
			<div class="container">
				<?php if ( ! empty( $structurepress_footer_widgets_layout ) && is_active_sidebar( 'footer-widgets' ) ) : ?>
				<div class="row">
					<?php
					add_filter( 'dynamic_sidebar_params', $structurepress_footer_copyright_params, 20 );
					dynamic_sidebar( 'footer-widgets' );
					remove_filter( 'dynamic_sidebar_params', $structurepress_footer_copyright_params, 20 );
					?>
				</div>
				<?php endif; ?>
			</div>
		</div>
	</footer>
	</div><!-- end of .boxed-container -->

	<?php wp_footer(); ?>
	</body>
</html>
