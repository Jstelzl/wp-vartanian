<?php

/**
 * Plugin Name:       ProteusThemes Shortcodes
 * Plugin URI:        https://github.com/proteusthemes/pt-shortcodes
 * Description:       ProteusThemes shortcodes used in our themes.
 * Version:           1.3.0
 * Author:            ProteusThemes
 * Author URI:        https://www.proteusthemes.com/
 * Text Domain:       pt-shortcodes
 */

// If this file is called directly, abort.
defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

class PT_Shortcodes {

	function __construct() {
		// Initialize shortcodes
		add_shortcode( 'fa', array ( $this , 'fa_shortcode' ) );
		add_shortcode( 'button', array ( $this , 'button_shortcode' ) );
	}

	/**
	 * Shortcode for Font Awesome
	 * @param  array $atts
	 * @return string HTML
	 */
	function fa_shortcode( $atts ) {
		$atts = shortcode_atts(
			apply_filters(
				'pt-shortcodes/fa_shortcode_attributes',
				array(
					'icon'   => 'fa-home',
					'href'   => '',
					'color'  => '',
					'target' => '_self',
				)
			),
			$atts
		);

		return apply_filters(
			'pt-shortcodes/fa_shortcode_output',
			sprintf(
				'%1$s<span class="fa  %2$s"%3$s></span>%4$s',
				! empty( $atts['href'] ) ? '<a class="icon-container" href="' . ( isset( $atts['href'] ) ? esc_url( $atts['href'] ) : '#' ) . '" target="' . esc_attr( $atts['target'] ) . '">' : '<span class="icon-container">',
				esc_attr( strtolower( $atts['icon'] ) ),
				isset( $atts['color'] ) ? ' style="color:' . esc_attr( $atts['color'] ) . ';"' : '',
				! empty( $atts['href'] ) ? '</a>' : '</span>'
			),
			$atts
		);
	}


	/**
	 * Shortcode for Buttons
	 * @param  array $atts
	 * @return string HTML
	 */
	function button_shortcode( $atts, $content = '' ) {
		$atts = shortcode_atts(
			apply_filters(
				'pt-shortcodes/button_shortcode_attributes',
				array(
					'style'     => 'primary',
					'href'      => '#',
					'target'    => '_self',
					'corners'   => '',
					'fa'        => null,
					'fullwidth' => false,
				)
			),
			$atts
		);

		return apply_filters(
			'pt-shortcodes/button_shortcode_output',
			sprintf(
				'<a class="btn  %1$s%2$s%3$s" href="%4$s" target="%5$s">%6$s %7$s</a>',
				'btn-' . esc_attr( strtolower( $atts['style'] ) ),
				'rounded' == $atts['corners'] ? '  btn-rounded' : '',
				'true' == $atts['fullwidth'] ? '  col-xs-12' : '',
				isset( $atts['href'] ) ? esc_url( $atts['href'] ) : '#',
				esc_attr( $atts['target'] ),
				isset( $atts['fa'] ) ? '<i class="fa ' . $atts['fa']  . '"></i> ' : '',
				wp_kses_post( $content )
			),
			$atts,
			$content
		);

	}
}

$pt_shortcodes = new PT_Shortcodes();
