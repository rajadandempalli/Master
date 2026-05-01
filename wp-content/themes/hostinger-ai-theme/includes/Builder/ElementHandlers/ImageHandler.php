<?php

namespace Hostinger\AiTheme\Builder\ElementHandlers;

use Hostinger\AiTheme\Builder\ImageManager;
use Hostinger\AiTheme\Builder\LocalImageManager;
use DOMElement;

defined( 'ABSPATH' ) || exit;

class ImageHandler implements ElementHandler {
    /**
     * @param DOMElement $node
     * @param array      $element_structure
     *
     * @return void
     */
    public function handle(DOMElement &$node, array $element_structure): void
    {

        $content = !empty( $element_structure['content'] ) ? $element_structure['content'] : '';

        if ( !empty( $element_structure['default_content'] ) ) {
            $content = $element_structure['default_content'];
        }

        if ( empty( $content ) ) {
            return;
        }

        $use_local_images = $this->is_customer_reviews_section( $element_structure );

        if ( $use_local_images ) {
            $image_manager = new LocalImageManager();
            $image_data = $image_manager->get_local_image_data( !empty( $element_structure['default_content'] ) );
        } else {
            $image_manager = new ImageManager( $content );
            $image_data = $image_manager->get_unsplash_image_data( !empty( $element_structure['default_content'] ) );
        }

        if ( ! empty( $image_data ) ) {
            if ( $use_local_images ) {
                $image_url = $image_manager->modify_image_url( $image_data['image'], $element_structure );
            } else {
                $image_url = $image_manager->modify_image_url( $image_data->image, $element_structure );
            }

            $alt_description = $use_local_images ? ( $image_data['alt_description'] ?? '' ) : ( property_exists( $image_data, 'alt_description' ) && !empty( $image_data->alt_description ) ? $image_data->alt_description : '' );
            $imgs = $node->getElementsByTagName('img');

            if ($imgs->length > 0) {
                $img = $imgs->item(0);
                $img->setAttribute('src', $image_url);
                $img->setAttribute('alt', $alt_description );
            }
        }
    }

    private function is_customer_reviews_section( array $element_structure ): bool {
        if ( !empty( $element_structure['class'] ) ) {
            $class = $element_structure['class'];
            if ( str_contains( $class, 'hostinger-ai-testimonial-image' ) ) {
                return true;
            }
        }

        return false;
    }
}