<?php
/**
 * Footer Default
 * 
 * slug: event-management-blocks/footer-default
 * title: Footer Default
 * categories: event-management-blocks
 */

return array(
    'title'      =>__( 'Footer Default', 'event-management-blocks' ),
    'categories' => array( 'event-management-blocks' ),
    'content'    => '<!-- wp:group {"style":{"elements":{"link":{"color":{"text":"var:preset|color|fourground"}}},"color":{"background":"#101010"}},"textColor":"background","layout":{"type":"constrained","contentSize":"80%"}} -->
    <div class="wp-block-group has-background-color has-text-color has-background has-link-color" style="background-color:#101010"><!-- wp:columns {"className":"alignwide","style":{"spacing":{"padding":{"top":"35px","bottom":"35px","right":"0px","left":"0px"},"blockGap":{"top":"0","left":"0"},"margin":{"top":"0","bottom":"0"}}}} -->
        <div class="wp-block-columns alignwide" style="margin-top:0;margin-bottom:0;padding-top:35px;padding-right:0px;padding-bottom:35px;padding-left:0px"><!-- wp:column {"width":"%","className":"footer-box","style":{"spacing":{"blockGap":"20px","padding":{"right":"var:preset|spacing|40","left":"var:preset|spacing|40","bottom":"var:preset|spacing|50"}},"elements":{"link":{"color":{"text":"var:preset|color|background"}}}},"textColor":"background","fontFamily":"saira"} -->
        <div class="wp-block-column footer-box has-background-color has-text-color has-link-color has-saira-font-family" style="padding-right:var(--wp--preset--spacing--40);padding-bottom:var(--wp--preset--spacing--50);padding-left:var(--wp--preset--spacing--40)"><!-- wp:heading {"style":{"typography":{"fontSize":"22px","fontStyle":"normal","fontWeight":"600"}},"textColor":"background","fontFamily":"lato"} -->
        <h2 class="wp-block-heading has-background-color has-text-color has-lato-font-family" style="font-size:22px;font-style:normal;font-weight:600">'. esc_html__('About Us','event-management-blocks') .'</h2>
        <!-- /wp:heading -->
        
        <!-- wp:paragraph {"fontSize":"medium","fontFamily":"lato"} -->
        <p class="has-lato-font-family has-medium-font-size">'. esc_html__('Lorem Ipsum is simply dummy text of the printing and typesetting industry.','event-management-blocks') .'</p>
        <!-- /wp:paragraph -->
        
        <!-- wp:social-links {"customIconBackgroundColor":"#ffffff47","iconBackgroundColorValue":"#ffffff47","size":"has-normal-icon-size","className":"is-style-default social-box","style":{"spacing":{"margin":{"top":"var:preset|spacing|50","bottom":"var:preset|spacing|50","left":"0","right":"0"},"blockGap":{"top":"var:preset|spacing|30","left":"var:preset|spacing|20"}}},"layout":{"type":"flex","justifyContent":"left"}} -->
        <ul class="wp-block-social-links has-normal-icon-size has-icon-background-color is-style-default social-box" style="margin-top:var(--wp--preset--spacing--50);margin-right:0;margin-bottom:var(--wp--preset--spacing--50);margin-left:0"><!-- wp:social-link {"url":"#","service":"facebook"} /-->
        
        <!-- wp:social-link {"url":"#","service":"twitter"} /-->
        
        <!-- wp:social-link {"url":"#","service":"instagram"} /-->
        
        <!-- wp:social-link {"url":"#","service":"linkedin"} /--></ul>
        <!-- /wp:social-links --></div>
        <!-- /wp:column -->
        
        <!-- wp:column {"className":"footer-box","style":{"spacing":{"blockGap":"20px","padding":{"right":"var:preset|spacing|40","left":"var:preset|spacing|40","bottom":"var:preset|spacing|50"}}}} -->
        <div class="wp-block-column footer-box" style="padding-right:var(--wp--preset--spacing--40);padding-bottom:var(--wp--preset--spacing--50);padding-left:var(--wp--preset--spacing--40)"><!-- wp:heading {"style":{"typography":{"fontSize":"22px","fontStyle":"normal","fontWeight":"600"}},"textColor":"background","fontFamily":"lato"} -->
        <h2 class="wp-block-heading has-background-color has-text-color has-lato-font-family" style="font-size:22px;font-style:normal;font-weight:600">'. esc_html__('Events','event-management-blocks') .'</h2>
        <!-- /wp:heading -->
        
        <!-- wp:navigation {"textColor":"#E1E1E1","overlayMenu":"never","className":"is-head-menu","style":{"typography":{"fontStyle":"normal","fontWeight":"400"}},"fontFamily":"lato","layout":{"type":"flex","justifyContent":"left","orientation":"vertical"}} -->
        <!-- wp:navigation-link {"label":"Birthday Party","type":"","url":"#","kind":"custom","isTopLevelLink":true} /-->
        
        <!-- wp:navigation-link {"label":"Baby Shower","type":"","url":"#","kind":"custom","isTopLevelLink":true} /-->
        
        <!-- wp:navigation-link {"label":"Farewell Party","type":"","url":"#","kind":"custom","isTopLevelLink":true} /-->
    
        <!-- wp:navigation-link {"label":"Christmas Party","type":"","url":"#","kind":"custom","isTopLevelLink":true} /-->
        <!-- /wp:navigation --></div>
        <!-- /wp:column -->
        
        <!-- wp:column {"className":"footer-box","style":{"spacing":{"padding":{"right":"0","left":"var:preset|spacing|40","bottom":"var:preset|spacing|50"}},"elements":{"link":{"color":{"text":"var:preset|color|background"}}}},"textColor":"background","fontSize":"medium","fontFamily":"bricolage-grotesque"} -->
        <div class="wp-block-column footer-box has-background-color has-text-color has-link-color has-bricolage-grotesque-font-family has-medium-font-size" style="padding-right:0;padding-bottom:var(--wp--preset--spacing--50);padding-left:var(--wp--preset--spacing--40)"><!-- wp:heading {"style":{"typography":{"fontSize":"22px","fontStyle":"normal","fontWeight":"600"}},"textColor":"background","fontFamily":"lato"} -->
        <h2 class="wp-block-heading has-background-color has-text-color has-lato-font-family" style="font-size:22px;font-style:normal;font-weight:600">'. esc_html__('Helps','event-management-blocks') .'</h2>
        <!-- /wp:heading -->
        
        <!-- wp:navigation {"textColor":"#E1E1E1","overlayMenu":"never","className":"is-head-menu","style":{"typography":{"fontStyle":"normal","fontWeight":"400"}},"fontFamily":"lato","layout":{"type":"flex","justifyContent":"left","orientation":"vertical"}} -->
        <!-- wp:navigation-link {"label":"Help","type":"","url":"#","kind":"custom","isTopLevelLink":true} /-->
        
        <!-- wp:navigation-link {"label":"FAQs","type":"","url":"#","kind":"custom","isTopLevelLink":true} /-->
        
        <!-- wp:navigation-link {"label":"Condition","type":"","url":"#","kind":"custom","isTopLevelLink":true} /-->
        
        <!-- wp:navigation-link {"label":"Privacy Policy","type":"","url":"#","kind":"custom","isTopLevelLink":true} /-->
        <!-- /wp:navigation --></div>
        <!-- /wp:column -->
        
        <!-- wp:column {"className":"footer-box","style":{"spacing":{"blockGap":"20px","padding":{"bottom":"var:preset|spacing|50"}}}} -->
        <div class="wp-block-column footer-box" style="padding-bottom:var(--wp--preset--spacing--50)"><!-- wp:heading {"style":{"typography":{"fontSize":"22px","fontStyle":"normal","fontWeight":"600"}},"textColor":"background","fontFamily":"lato"} -->
        <h2 class="wp-block-heading has-background-color has-text-color has-lato-font-family" style="font-size:22px;font-style:normal;font-weight:600">'. esc_html__('Contact Us','event-management-blocks') .'</h2>
        <!-- /wp:heading -->
        
        <!-- wp:paragraph {"align":"left","className":"has-background-color has-text-color has-link-color has-inter-font-family has-medium-font-size","style":{"typography":{"fontStyle":"normal","fontWeight":"400"}},"textColor":"background","fontSize":"medium","fontFamily":"lato"} -->
        <p class="has-text-align-left has-background-color has-text-color has-link-color has-inter-font-family has-medium-font-size has-lato-font-family" style="font-style:normal;font-weight:400"><span class="dashicons dashicons-email-alt"></span> '. esc_html__('support@example.com','event-management-blocks') .'</p>
        <!-- /wp:paragraph -->
        
        <!-- wp:paragraph {"className":"has-link-color has-inter-font-family","style":{"typography":{"fontStyle":"normal","fontWeight":"500"}},"textColor":"background","fontSize":"medium","fontFamily":"lato"} -->
        <p class="has-link-color has-inter-font-family has-background-color has-text-color has-lato-font-family has-medium-font-size" style="font-style:normal;font-weight:500"><span class="dashicons dashicons-phone"></span> '. esc_html__('+123 456 7890','event-management-blocks') .'</p>
        <!-- /wp:paragraph -->
        
        <!-- wp:paragraph {"className":"has-background-color has-text-color has-link-color has-inter-font-family has-medium-font-size","style":{"typography":{"fontStyle":"normal","fontWeight":"500"}},"textColor":"background","fontSize":"medium","fontFamily":"lato"} -->
        <p class="has-background-color has-text-color has-link-color has-inter-font-family has-medium-font-size has-lato-font-family" style="font-style:normal;font-weight:500"><span class="dashicons dashicons-admin-home"></span> '. esc_html__('123, Red Hills, Chicago,IL, USA','event-management-blocks') .'</p>
        <!-- /wp:paragraph --></div>
        <!-- /wp:column --></div>
        <!-- /wp:columns --></div>
        <!-- /wp:group -->
        
        <!-- wp:group {"className":"copyright-text","style":{"color":{"background":"#101010"}},"layout":{"type":"constrained","contentSize":"80%"}} -->
        <div class="wp-block-group copyright-text has-background" style="background-color:#101010"><!-- wp:columns -->
        <div class="wp-block-columns"><!-- wp:column {"width":"100%"} -->
        <div class="wp-block-column" style="flex-basis:100%"><!-- wp:paragraph {"align":"center","className":"has-background-color has-text-color has-link-color has-inter-font-family has-medium-font-size","style":{"elements":{"link":{"color":{"text":"var:preset|color|background"},":hover":{"color":{"text":"var:preset|color|accent"}}}}},"textColor":"background","fontSize":"medium","fontFamily":"lato"} -->
        <p class="has-text-align-center has-background-color has-text-color has-link-color has-inter-font-family has-medium-font-size has-lato-font-family"><a href="https://www.wpradiant.net/products/free-event-wordpress-theme">'. esc_html__('Event WordPress Theme ','event-management-blocks') .'</a> '. esc_html__(' By ','event-management-blocks') .' <a href="https://www.wpradiant.net/">'. esc_html__('WP Radiant','event-management-blocks') .'</a> |'. esc_html__('Proudly powered by','event-management-blocks') .' <a href="https://wordpress.org/">  '. esc_html__('WordPress','event-management-blocks') .'</a></p>
        <!-- /wp:paragraph --></div>
        <!-- /wp:column --></div>
        <!-- /wp:columns --></div>
        <!-- /wp:group -->

        <!-- wp:buttons -->
        <div class="wp-block-buttons"><!-- wp:button {"className":"scroll-top-button"} -->
        <div class="wp-block-button scroll-top-button"><a class="wp-block-button__link wp-element-button"><span class="dashicons dashicons-arrow-up-alt"></span></a></div>
        <!-- /wp:button --></div>
        <!-- /wp:buttons -->',
);