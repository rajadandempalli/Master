<?php

namespace Hostinger\AiTheme\Data;

defined( 'ABSPATH' ) || exit;

class SectionData {
    public static function get_sections_for_website_type(string $website_type = ''): array {
        $sections = array(
            'hero'                    => 'Title, subtitle and cta buttons.',
            'about-us'                => 'Title, subtitle, image.',
            'services'                => 'Title, subtitle, cards about services.',
            'contact'                 => 'Title, subtitle, contact information, form.',
            'location'                => 'Title, subtitle, address, map.',
            'projects'                => 'Title, subtitle, project cards.',
            'customer-reviews'        => 'Title, subtitle, single customer review.',
            'call-to-action'          => 'Title, description, cta and illustration.',
            'my-background'           => 'My Background section used for personal or portfolio sites, showing details about education, work, skills, and achievements.',
            'gallery'                 => 'Gallery section displays images.',
            'blog-posts'              => 'Contains the content of the blog post.',
            'real-estate-list'        => 'Real Estate Title, description, cta and real estate image.',
            'ticket-list'             => 'Ticket Title, description, cta and image.',
            'hotel-room-list'         => 'Hotel Room Title, description, cta and image.',
            'travel-destination-list' => 'Title, subtitle, description, cta and image.',
        );

        if ($website_type === 'booking') {
            $sections['booking'] = 'Title, description, image.';
        }

        if ($website_type === 'online store') {
            $sections['hero-for-online-store'] = 'Title, subtitle and cta buttons.';
            $sections['product-categories'] = 'Contains the product category CTAs.';
            $sections['product-list'] = 'Contains product list CTAs.';
        }

        return $sections;
    }
}
