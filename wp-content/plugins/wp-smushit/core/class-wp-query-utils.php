<?php

namespace Smush\Core;

class WP_Query_Utils {
	public function get_queried_object_id() {
		return get_queried_object_id();
	}

	public function is_singular() {
		return is_singular();
	}

	public function is_front_page() {
		return is_front_page();
	}

	public function is_home() {
		return is_home();
	}

	public function is_author() {
		return is_author();
	}

	public function is_category() {
		return is_category();
	}

	public function is_tag() {
		return is_tag();
	}

	public function is_tax() {
		return is_tax();
	}

	public function is_archive() {
		return is_archive();
	}
}
