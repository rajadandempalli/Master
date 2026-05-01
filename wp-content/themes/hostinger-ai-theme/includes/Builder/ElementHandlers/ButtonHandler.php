<?php

namespace Hostinger\AiTheme\Builder\ElementHandlers;

use DOMElement;
use WP_Query;

defined( 'ABSPATH' ) || exit;

class ButtonHandler implements ElementHandler {
    public function handle(DOMElement &$node, array $element_structure): void
    {
        $links = $node->getElementsByTagName('a');

        if ($links->length > 0) {
            $link = $links->item(0);
            $link->nodeValue = $element_structure['content'];
			$link->setAttribute('href', $this->get_random_link() );
        }
    }

	protected function get_random_link(): string {
		$args = array(
			'post_type'      => array('post', 'page', 'product'),
			'post_status'    => 'publish',
			'posts_per_page' => 1,
			'orderby'        => 'rand',
		);

		$query = new WP_Query($args);

		if ($query->have_posts()) {
			$query->the_post();
			$permalink = get_permalink();
			wp_reset_postdata();
			return $permalink;
		}

		return site_url();
	}
}
