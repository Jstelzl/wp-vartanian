<?php
/**
 * Class Background_Url
 *
 * @package Smush\Core\Parser
 */

namespace Smush\Core\Parser;

use Smush\Core\Array_Utils;

/**
 * Class Background_Url
 *
 * @package Smush\Core\Parser
 */
class Background_Url {
	/**
	 * The background image URL.
	 *
	 * @var string
	 */
	private $url;

	/**
	 * The background image resolution.
	 *
	 * @var string
	 */
	private $resolution;

	/**
	 * The background image type.
	 *
	 * @var string
	 */
	private $type;

	/**
	 * @var Array_Utils
	 */
	private $array_utils;

	/**
	 * Constructor.
	 *
	 * @param string|array $background_data An image URL (legacy format) or an array containing background data.
	 *
	 * @return void
	 */
	public function __construct( $background_data = array() ) {
		$this->array_utils = new Array_Utils();
		$background_data   = $this->maybe_convert_url_to_background_data( $background_data );
		$this->from_array( $background_data );
	}

	/**
	 * Get the background image URL.
	 *
	 * @return string
	 */
	public function get_url() {
		return $this->url;
	}

	/**
	 * Get the background image resolution.
	 *
	 * @return string
	 */
	public function get_resolution() {
		return $this->resolution;
	}

	/**
	 * Get the background image type.
	 *
	 * @return string
	 */
	public function get_type() {
		return $this->type;
	}

	/**
	 * Populate the object properties from an array.
	 *
	 * @param array $background_data The array containing background data.
	 */
	public function from_array( $background_data ) {
		$this->url        = esc_url_raw( $this->array_utils->get_array_value( $background_data, 'url', '' ) );
		$this->resolution = sanitize_text_field( $this->array_utils->get_array_value( $background_data, 'resolution', '' ) );
		$this->type       = sanitize_text_field( $this->array_utils->get_array_value( $background_data, 'type', '' ) );
	}

	private function maybe_convert_url_to_background_data( $background_data ) {
		if ( is_array( $background_data ) && isset( $background_data['url'] ) ) {
			return $background_data;
		}

		if ( ! is_string( $background_data ) ) {
			return array();
		}

		$image_url       = $background_data;
		$background_data = array(
			'url'        => esc_url_raw( $image_url ),
			'resolution' => '',
			'type'       => '',
		);

		return $background_data;
	}
}
