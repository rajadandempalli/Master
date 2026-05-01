<?php
/**
 * Category Section
 * 
 * slug: event-management-blocks/services-section
 * title: Services Section
 * categories: event-management-blocks
 */

return array(
    'title'      =>__( 'Services Section', 'event-management-blocks' ),
    'categories' => array( 'event-management-blocks' ),
    'content'    => ' <!-- wp:spacer {"height":"50px"} -->
    <div style="height:50px" aria-hidden="true" class="wp-block-spacer"></div>
    <!-- /wp:spacer -->
    
    <!-- wp:group {"className":"services-box","layout":{"type":"constrained","contentSize":"80%"}} -->
    <div class="wp-block-group services-box"><!-- wp:group {"className":"service-group","style":{"spacing":{"blockGap":"var:preset|spacing|30"}},"layout":{"type":"constrained","contentSize":"100%"}} -->
    <div class="wp-block-group service-group"><!-- wp:paragraph {"align":"center","className":"small-text","style":{"elements":{"link":{"color":{"text":"var:preset|color|background"}}},"typography":{"fontStyle":"normal","fontWeight":"700"},"color":{"background":"var(--wp--preset--color--accent)"},"spacing":{"padding":{"right":"var:preset|spacing|40","left":"var:preset|spacing|40"}}},"textColor":"background","fontSize":"extra-small","fontFamily":"lato"} -->
    <p class="has-text-align-center small-text has-background-color has-text-color has-background has-link-color has-lato-font-family has-extra-small-font-size" style="background-color:var(--wp--preset--color--accent);padding-right:var(--wp--preset--spacing--40);padding-left:var(--wp--preset--spacing--40);font-style:normal;font-weight:700">'. esc_html__('Services','event-management-blocks').'</p>
    <!-- /wp:paragraph -->
    
    <!-- wp:heading {"level":1,"style":{"typography":{"fontStyle":"normal","fontWeight":"700","fontSize":"30px"},"elements":{"link":{"color":{"text":"var:preset|color|primary"}}}},"textColor":"primary","fontFamily":"lato"} -->
    <h1 class="wp-block-heading has-primary-color has-text-color has-link-color has-lato-font-family" style="font-size:30px;font-style:normal;font-weight:700">'. esc_html__('Events Management Services','event-management-blocks').'</h1>
    <!-- /wp:heading -->
    
    <!-- wp:paragraph {"className":"banner-text","style":{"typography":{"fontStyle":"normal","fontWeight":"500","lineHeight":"1.5"},"spacing":{"padding":{"right":"var:preset|spacing|60","left":"var:preset|spacing|60"}},"elements":{"link":{"color":{"text":"var:preset|color|primary"}}}},"textColor":"primary","fontSize":"small","fontFamily":"lato"} -->
    <p class="banner-text has-primary-color has-text-color has-link-color has-lato-font-family has-small-font-size" style="padding-right:var(--wp--preset--spacing--60);padding-left:var(--wp--preset--spacing--60);font-style:normal;font-weight:500;line-height:1.5">'. esc_html__('Lorem Ipsum is simply dummy text of the printing and typesetting industry.','event-management-blocks').'</p>
    <!-- /wp:paragraph --></div>
    <!-- /wp:group -->
    
    <!-- wp:columns {"align":"wide","className":"wow fadeInUp"} -->
    <div class="wp-block-columns alignwide wow fadeInUp"><!-- wp:column {"width":"33.33%"} -->
    <div class="wp-block-column" style="flex-basis:33.33%"><!-- wp:group {"className":"service-inner-box","style":{"spacing":{"padding":{"top":"var:preset|spacing|60","right":"var:preset|spacing|60","bottom":"var:preset|spacing|60","left":"var:preset|spacing|60"}},"border":{"radius":"10px","width":"1px"}},"layout":{"type":"constrained","contentSize":""}} -->
    <div class="wp-block-group service-inner-box" style="border-width:1px;border-radius:10px;padding-top:var(--wp--preset--spacing--60);padding-right:var(--wp--preset--spacing--60);padding-bottom:var(--wp--preset--spacing--60);padding-left:var(--wp--preset--spacing--60)"><!-- wp:columns -->
    <div class="wp-block-columns"><!-- wp:column {"verticalAlignment":"center","width":"15%"} -->
    <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:15%"><!-- wp:paragraph {"align":"center","className":"service-number","style":{"typography":{"fontSize":"60px","fontStyle":"normal","fontWeight":"900"},"elements":{"link":{"color":{"text":"#0000000d"}}},"color":{"text":"#0000000d"}}} -->
    <p class="has-text-align-center service-number has-text-color has-link-color" style="color:#0000000d;font-size:60px;font-style:normal;font-weight:900">'. esc_html__('01','event-management-blocks').'</p>
    <!-- /wp:paragraph --></div>
    <!-- /wp:column -->
    
    <!-- wp:column {"width":"70%","className":"Services-image"} -->
    <div class="wp-block-column Services-image" style="flex-basis:70%"><!-- wp:image {"id":79,"width":"50px","aspectRatio":"1","scale":"contain","sizeSlug":"full","linkDestination":"none","align":"center"} -->
    <figure class="wp-block-image aligncenter size-full is-resized"><img src="'.esc_url(get_template_directory_uri()) .'/assets/images/service01.png" alt="" class="wp-image-79" style="aspect-ratio:1;object-fit:contain;width:50px"/></figure>
    <!-- /wp:image --></div>
    <!-- /wp:column -->
    
    <!-- wp:column {"width":"15%"} -->
    <div class="wp-block-column" style="flex-basis:15%"></div>
    <!-- /wp:column --></div>
    <!-- /wp:columns -->
    
    <!-- wp:heading {"textAlign":"center","level":4,"style":{"typography":{"fontStyle":"normal","fontWeight":"700","fontSize":"20px"},"elements":{"link":{"color":{"text":"var:preset|color|primary"}}}},"textColor":"primary","fontFamily":"lato"} -->
    <h4 class="wp-block-heading has-text-align-center has-primary-color has-text-color has-link-color has-lato-font-family" style="font-size:20px;font-style:normal;font-weight:700">'. esc_html__('Night Party Service','event-management-blocks').'</h4>
    <!-- /wp:heading -->
    
    <!-- wp:paragraph {"align":"center","style":{"typography":{"lineHeight":"1.5","fontStyle":"normal","fontWeight":"400"}},"textColor":"primary","fontSize":"small","fontFamily":"lato"} -->
    <p class="has-text-align-center has-primary-color has-text-color has-lato-font-family has-small-font-size" style="font-style:normal;font-weight:400;line-height:1.5">'. esc_html__('Lorem Ipsum is simply dummy text of the print and typesetting industry It is a the long-established fact that a reader','event-management-blocks').'</p>
    <!-- /wp:paragraph -->
    
    <!-- wp:buttons {"className":"banner-button","layout":{"type":"flex","justifyContent":"center"}} -->
    <div class="wp-block-buttons banner-button"><!-- wp:button {"textColor":"background","style":{"color":{"background":"var(--wp--preset--color--accent)"},"elements":{"link":{"color":{"text":"var:preset|color|background"}}},"typography":{"fontStyle":"normal","fontWeight":"700"},"border":{"radius":"4px"},"spacing":{"padding":{"left":"var:preset|spacing|50","right":"var:preset|spacing|50","top":"var:preset|spacing|30","bottom":"var:preset|spacing|30"}}},"fontSize":"extra-small","fontFamily":"lato"} -->
    <div class="wp-block-button has-custom-font-size has-lato-font-family has-extra-small-font-size" style="font-style:normal;font-weight:700"><a class="wp-block-button__link has-background-color has-text-color has-background has-link-color wp-element-button" style="border-radius:4px;background-color:var(--wp--preset--color--accent);padding-top:var(--wp--preset--spacing--30);padding-right:var(--wp--preset--spacing--50);padding-bottom:var(--wp--preset--spacing--30);padding-left:var(--wp--preset--spacing--50)">'. esc_html__('Explore More','event-management-blocks').'</a></div>
    <!-- /wp:button --></div>
    <!-- /wp:buttons --></div>
    <!-- /wp:group --></div>
    <!-- /wp:column -->
    
    <!-- wp:column {"width":"33.33%"} -->
    <div class="wp-block-column" style="flex-basis:33.33%"><!-- wp:group {"className":"service-inner-box","style":{"spacing":{"padding":{"top":"var:preset|spacing|60","right":"var:preset|spacing|60","bottom":"var:preset|spacing|60","left":"var:preset|spacing|60"}},"border":{"radius":"10px","width":"1px"}},"layout":{"type":"constrained","contentSize":""}} -->
    <div class="wp-block-group service-inner-box" style="border-width:1px;border-radius:10px;padding-top:var(--wp--preset--spacing--60);padding-right:var(--wp--preset--spacing--60);padding-bottom:var(--wp--preset--spacing--60);padding-left:var(--wp--preset--spacing--60)"><!-- wp:columns -->
    <div class="wp-block-columns"><!-- wp:column {"verticalAlignment":"center","width":"15%"} -->
    <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:15%"><!-- wp:paragraph {"align":"center","className":"service-number","style":{"typography":{"fontSize":"60px","fontStyle":"normal","fontWeight":"900"},"elements":{"link":{"color":{"text":"#0000000d"}}},"color":{"text":"#0000000d"}}} -->
    <p class="has-text-align-center service-number has-text-color has-link-color" style="color:#0000000d;font-size:60px;font-style:normal;font-weight:900">'. esc_html__('02','event-management-blocks').'</p>
    <!-- /wp:paragraph --></div>
    <!-- /wp:column -->
    
    <!-- wp:column {"width":"70%","className":"Services-image"} -->
    <div class="wp-block-column Services-image" style="flex-basis:70%"><!-- wp:image {"id":81,"width":"50px","aspectRatio":"1","scale":"contain","sizeSlug":"full","linkDestination":"none","align":"center"} -->
    <figure class="wp-block-image aligncenter size-full is-resized"><img src="'.esc_url(get_template_directory_uri()) .'/assets/images/service02.png" alt="" class="wp-image-81" style="aspect-ratio:1;object-fit:contain;width:50px"/></figure>
    <!-- /wp:image --></div>
    <!-- /wp:column -->
    
    <!-- wp:column {"width":"15%"} -->
    <div class="wp-block-column" style="flex-basis:15%"></div>
    <!-- /wp:column --></div>
    <!-- /wp:columns -->
    
    <!-- wp:heading {"textAlign":"center","level":4,"style":{"typography":{"fontStyle":"normal","fontWeight":"700","fontSize":"20px"},"elements":{"link":{"color":{"text":"var:preset|color|primary"}}}},"textColor":"primary","fontFamily":"lato"} -->
    <h4 class="wp-block-heading has-text-align-center has-primary-color has-text-color has-link-color has-lato-font-family" style="font-size:20px;font-style:normal;font-weight:700">'. esc_html__('Wedding Party Service','event-management-blocks').'</h4>
    <!-- /wp:heading -->
    
    <!-- wp:paragraph {"align":"center","style":{"typography":{"lineHeight":"1.5","fontStyle":"normal","fontWeight":"400"}},"textColor":"primary","fontSize":"small","fontFamily":"lato"} -->
    <p class="has-text-align-center has-primary-color has-text-color has-lato-font-family has-small-font-size" style="font-style:normal;font-weight:400;line-height:1.5">'. esc_html__('Lorem Ipsum is simply dummy text of the print and typesetting industry It is a the long-established fact that a reader','event-management-blocks').'</p>
    <!-- /wp:paragraph -->
    
    <!-- wp:buttons {"className":"banner-button","layout":{"type":"flex","justifyContent":"center"}} -->
    <div class="wp-block-buttons banner-button"><!-- wp:button {"textColor":"background","style":{"color":{"background":"var(--wp--preset--color--accent)"},"elements":{"link":{"color":{"text":"var:preset|color|background"}}},"typography":{"fontStyle":"normal","fontWeight":"700"},"border":{"radius":"4px"},"spacing":{"padding":{"left":"var:preset|spacing|50","right":"var:preset|spacing|50","top":"var:preset|spacing|30","bottom":"var:preset|spacing|30"}}},"fontSize":"extra-small","fontFamily":"lato"} -->
    <div class="wp-block-button has-custom-font-size has-lato-font-family has-extra-small-font-size" style="font-style:normal;font-weight:700"><a class="wp-block-button__link has-background-color has-text-color has-background has-link-color wp-element-button" style="border-radius:4px;background-color:var(--wp--preset--color--accent);padding-top:var(--wp--preset--spacing--30);padding-right:var(--wp--preset--spacing--50);padding-bottom:var(--wp--preset--spacing--30);padding-left:var(--wp--preset--spacing--50)">'. esc_html__('Explore More','event-management-blocks').'</a></div>
    <!-- /wp:button --></div>
    <!-- /wp:buttons --></div>
    <!-- /wp:group --></div>
    <!-- /wp:column -->
    
    <!-- wp:column {"width":"33.33%"} -->
    <div class="wp-block-column" style="flex-basis:33.33%"><!-- wp:group {"className":"service-inner-box","style":{"spacing":{"padding":{"top":"var:preset|spacing|60","right":"var:preset|spacing|60","bottom":"var:preset|spacing|60","left":"var:preset|spacing|60"}},"border":{"radius":"10px","width":"1px"}},"layout":{"type":"constrained","contentSize":""}} -->
    <div class="wp-block-group service-inner-box" style="border-width:1px;border-radius:10px;padding-top:var(--wp--preset--spacing--60);padding-right:var(--wp--preset--spacing--60);padding-bottom:var(--wp--preset--spacing--60);padding-left:var(--wp--preset--spacing--60)"><!-- wp:columns -->
    <div class="wp-block-columns"><!-- wp:column {"verticalAlignment":"center","width":"15%"} -->
    <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:15%"><!-- wp:paragraph {"align":"center","className":"service-number","style":{"typography":{"fontSize":"60px","fontStyle":"normal","fontWeight":"900"},"elements":{"link":{"color":{"text":"#0000000d"}}},"color":{"text":"#0000000d"}}} -->
    <p class="has-text-align-center service-number has-text-color has-link-color" style="color:#0000000d;font-size:60px;font-style:normal;font-weight:900">'. esc_html__('03','event-management-blocks').'</p>
    <!-- /wp:paragraph --></div>
    <!-- /wp:column -->
    
    <!-- wp:column {"width":"70%","className":"Services-image"} -->
    <div class="wp-block-column Services-image" style="flex-basis:70%"><!-- wp:image {"id":80,"width":"50px","aspectRatio":"1","scale":"contain","sizeSlug":"full","linkDestination":"none","align":"center"} -->
    <figure class="wp-block-image aligncenter size-full is-resized"><img src="'.esc_url(get_template_directory_uri()) .'/assets/images/service03.png" alt="" class="wp-image-80" style="aspect-ratio:1;object-fit:contain;width:50px"/></figure>
    <!-- /wp:image --></div>
    <!-- /wp:column -->
    
    <!-- wp:column {"width":"15%"} -->
    <div class="wp-block-column" style="flex-basis:15%"></div>
    <!-- /wp:column --></div>
    <!-- /wp:columns -->
    
    <!-- wp:heading {"textAlign":"center","level":4,"style":{"typography":{"fontStyle":"normal","fontWeight":"700","fontSize":"20px"},"elements":{"link":{"color":{"text":"var:preset|color|primary"}}}},"textColor":"primary","fontFamily":"lato"} -->
    <h4 class="wp-block-heading has-text-align-center has-primary-color has-text-color has-link-color has-lato-font-family" style="font-size:20px;font-style:normal;font-weight:700">'. esc_html__('Birthday Party Service','event-management-blocks').'</h4>
    <!-- /wp:heading -->
    
    <!-- wp:paragraph {"align":"center","style":{"typography":{"lineHeight":"1.5","fontStyle":"normal","fontWeight":"400"}},"textColor":"primary","fontSize":"small","fontFamily":"lato"} -->
    <p class="has-text-align-center has-primary-color has-text-color has-lato-font-family has-small-font-size" style="font-style:normal;font-weight:400;line-height:1.5">'. esc_html__('Lorem Ipsum is simply dummy text of the print and typesetting industry It is a the long-established fact that a reader','event-management-blocks').'</p>
    <!-- /wp:paragraph -->
    
    <!-- wp:buttons {"className":"banner-button","layout":{"type":"flex","justifyContent":"center"}} -->
    <div class="wp-block-buttons banner-button"><!-- wp:button {"textColor":"background","style":{"color":{"background":"var(--wp--preset--color--accent)"},"elements":{"link":{"color":{"text":"var:preset|color|background"}}},"typography":{"fontStyle":"normal","fontWeight":"700"},"border":{"radius":"4px"},"spacing":{"padding":{"left":"var:preset|spacing|50","right":"var:preset|spacing|50","top":"var:preset|spacing|30","bottom":"var:preset|spacing|30"}}},"fontSize":"extra-small","fontFamily":"lato"} -->
    <div class="wp-block-button has-custom-font-size has-lato-font-family has-extra-small-font-size" style="font-style:normal;font-weight:700"><a class="wp-block-button__link has-background-color has-text-color has-background has-link-color wp-element-button" style="border-radius:4px;background-color:var(--wp--preset--color--accent);padding-top:var(--wp--preset--spacing--30);padding-right:var(--wp--preset--spacing--50);padding-bottom:var(--wp--preset--spacing--30);padding-left:var(--wp--preset--spacing--50)">'. esc_html__('Explore More','event-management-blocks').'</a></div>
    <!-- /wp:button --></div>
    <!-- /wp:buttons --></div>
    <!-- /wp:group --></div>
    <!-- /wp:column --></div>
    <!-- /wp:columns -->
    
    <!-- wp:columns {"align":"wide","className":"wow fadeInUp"} -->
    <div class="wp-block-columns alignwide wow fadeInUp"><!-- wp:column {"width":"33.33%"} -->
    <div class="wp-block-column" style="flex-basis:33.33%"><!-- wp:group {"className":"service-inner-box","style":{"spacing":{"padding":{"top":"var:preset|spacing|60","right":"var:preset|spacing|60","bottom":"var:preset|spacing|60","left":"var:preset|spacing|60"}},"border":{"radius":"10px","width":"1px"}},"layout":{"type":"constrained","contentSize":""}} -->
    <div class="wp-block-group service-inner-box" style="border-width:1px;border-radius:10px;padding-top:var(--wp--preset--spacing--60);padding-right:var(--wp--preset--spacing--60);padding-bottom:var(--wp--preset--spacing--60);padding-left:var(--wp--preset--spacing--60)"><!-- wp:columns -->
    <div class="wp-block-columns"><!-- wp:column {"verticalAlignment":"center","width":"15%"} -->
    <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:15%"><!-- wp:paragraph {"align":"center","className":"service-number","style":{"typography":{"fontSize":"60px","fontStyle":"normal","fontWeight":"900"},"elements":{"link":{"color":{"text":"#0000000d"}}},"color":{"text":"#0000000d"}}} -->
    <p class="has-text-align-center service-number has-text-color has-link-color" style="color:#0000000d;font-size:60px;font-style:normal;font-weight:900">'. esc_html__('04','event-management-blocks').'</p>
    <!-- /wp:paragraph --></div>
    <!-- /wp:column -->
    
    <!-- wp:column {"width":"70%","className":"Services-image"} -->
    <div class="wp-block-column Services-image" style="flex-basis:70%"><!-- wp:image {"id":96,"width":"50px","aspectRatio":"1","scale":"contain","sizeSlug":"full","linkDestination":"none","align":"center"} -->
    <figure class="wp-block-image aligncenter size-full is-resized"><img src="'.esc_url(get_template_directory_uri()) .'/assets/images/service04.png" alt="" class="wp-image-96" style="aspect-ratio:1;object-fit:contain;width:50px"/></figure>
    <!-- /wp:image --></div>
    <!-- /wp:column -->
    
    <!-- wp:column {"width":"15%"} -->
    <div class="wp-block-column" style="flex-basis:15%"></div>
    <!-- /wp:column --></div>
    <!-- /wp:columns -->
    
    <!-- wp:heading {"textAlign":"center","level":4,"style":{"typography":{"fontStyle":"normal","fontWeight":"700","fontSize":"20px"},"elements":{"link":{"color":{"text":"var:preset|color|primary"}}}},"textColor":"primary","fontFamily":"lato"} -->
    <h4 class="wp-block-heading has-text-align-center has-primary-color has-text-color has-link-color has-lato-font-family" style="font-size:20px;font-style:normal;font-weight:700">'. esc_html__('Baby Shower Service','event-management-blocks').'</h4>
    <!-- /wp:heading -->
    
    <!-- wp:paragraph {"align":"center","style":{"typography":{"lineHeight":"1.5","fontStyle":"normal","fontWeight":"400"}},"textColor":"primary","fontSize":"small","fontFamily":"lato"} -->
    <p class="has-text-align-center has-primary-color has-text-color has-lato-font-family has-small-font-size" style="font-style:normal;font-weight:400;line-height:1.5">'. esc_html__('Lorem Ipsum is simply dummy text of the print and typesetting industry It is a the long-established fact that a reader','event-management-blocks').'</p>
    <!-- /wp:paragraph -->
    
    <!-- wp:buttons {"className":"banner-button","layout":{"type":"flex","justifyContent":"center"}} -->
    <div class="wp-block-buttons banner-button"><!-- wp:button {"textColor":"background","style":{"color":{"background":"var(--wp--preset--color--accent)"},"elements":{"link":{"color":{"text":"var:preset|color|background"}}},"typography":{"fontStyle":"normal","fontWeight":"700"},"border":{"radius":"4px"},"spacing":{"padding":{"left":"var:preset|spacing|50","right":"var:preset|spacing|50","top":"var:preset|spacing|30","bottom":"var:preset|spacing|30"}}},"fontSize":"extra-small","fontFamily":"lato"} -->
    <div class="wp-block-button has-custom-font-size has-lato-font-family has-extra-small-font-size" style="font-style:normal;font-weight:700"><a class="wp-block-button__link has-background-color has-text-color has-background has-link-color wp-element-button" style="border-radius:4px;background-color:var(--wp--preset--color--accent);padding-top:var(--wp--preset--spacing--30);padding-right:var(--wp--preset--spacing--50);padding-bottom:var(--wp--preset--spacing--30);padding-left:var(--wp--preset--spacing--50)">'. esc_html__('Explore More','event-management-blocks').'</a></div>
    <!-- /wp:button --></div>
    <!-- /wp:buttons --></div>
    <!-- /wp:group --></div>
    <!-- /wp:column -->
    
    <!-- wp:column {"width":"33.33%"} -->
    <div class="wp-block-column" style="flex-basis:33.33%"><!-- wp:group {"className":"service-inner-box","style":{"spacing":{"padding":{"top":"var:preset|spacing|60","right":"var:preset|spacing|60","bottom":"var:preset|spacing|60","left":"var:preset|spacing|60"}},"border":{"radius":"10px","width":"1px"}},"layout":{"type":"constrained","contentSize":""}} -->
    <div class="wp-block-group service-inner-box" style="border-width:1px;border-radius:10px;padding-top:var(--wp--preset--spacing--60);padding-right:var(--wp--preset--spacing--60);padding-bottom:var(--wp--preset--spacing--60);padding-left:var(--wp--preset--spacing--60)"><!-- wp:columns -->
    <div class="wp-block-columns"><!-- wp:column {"verticalAlignment":"center","width":"15%"} -->
    <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:15%"><!-- wp:paragraph {"align":"center","className":"service-number","style":{"typography":{"fontSize":"60px","fontStyle":"normal","fontWeight":"900"},"elements":{"link":{"color":{"text":"#0000000d"}}},"color":{"text":"#0000000d"}}} -->
    <p class="has-text-align-center service-number has-text-color has-link-color" style="color:#0000000d;font-size:60px;font-style:normal;font-weight:900">'. esc_html__('05','event-management-blocks').'</p>
    <!-- /wp:paragraph --></div>
    <!-- /wp:column -->
    
    <!-- wp:column {"width":"70%","className":"Services-image"} -->
    <div class="wp-block-column Services-image" style="flex-basis:70%"><!-- wp:image {"id":95,"width":"50px","aspectRatio":"1","scale":"contain","sizeSlug":"full","linkDestination":"none","align":"center"} -->
    <figure class="wp-block-image aligncenter size-full is-resized"><img src="'.esc_url(get_template_directory_uri()) .'/assets/images/service05.png" alt="" class="wp-image-95" style="aspect-ratio:1;object-fit:contain;width:50px"/></figure>
    <!-- /wp:image --></div>
    <!-- /wp:column -->
    
    <!-- wp:column {"width":"15%"} -->
    <div class="wp-block-column" style="flex-basis:15%"></div>
    <!-- /wp:column --></div>
    <!-- /wp:columns -->
    
    <!-- wp:heading {"textAlign":"center","level":4,"style":{"typography":{"fontStyle":"normal","fontWeight":"700","fontSize":"20px"},"elements":{"link":{"color":{"text":"var:preset|color|primary"}}}},"textColor":"primary","fontFamily":"lato"} -->
    <h4 class="wp-block-heading has-text-align-center has-primary-color has-text-color has-link-color has-lato-font-family" style="font-size:20px;font-style:normal;font-weight:700">'. esc_html__('Kitty Party','event-management-blocks').'</h4>
    <!-- /wp:heading -->
    
    <!-- wp:paragraph {"align":"center","style":{"typography":{"lineHeight":"1.5","fontStyle":"normal","fontWeight":"400"}},"textColor":"primary","fontSize":"small","fontFamily":"lato"} -->
    <p class="has-text-align-center has-primary-color has-text-color has-lato-font-family has-small-font-size" style="font-style:normal;font-weight:400;line-height:1.5">'. esc_html__('Lorem Ipsum is simply dummy text of the print and typesetting industry It is a the long-established fact that a reader','event-management-blocks').'</p>
    <!-- /wp:paragraph -->
    
    <!-- wp:buttons {"className":"banner-button","layout":{"type":"flex","justifyContent":"center"}} -->
    <div class="wp-block-buttons banner-button"><!-- wp:button {"textColor":"background","style":{"color":{"background":"var(--wp--preset--color--accent)"},"elements":{"link":{"color":{"text":"var:preset|color|background"}}},"typography":{"fontStyle":"normal","fontWeight":"700"},"border":{"radius":"4px"},"spacing":{"padding":{"left":"var:preset|spacing|50","right":"var:preset|spacing|50","top":"var:preset|spacing|30","bottom":"var:preset|spacing|30"}}},"fontSize":"extra-small","fontFamily":"lato"} -->
    <div class="wp-block-button has-custom-font-size has-lato-font-family has-extra-small-font-size" style="font-style:normal;font-weight:700"><a class="wp-block-button__link has-background-color has-text-color has-background has-link-color wp-element-button" style="border-radius:4px;background-color:var(--wp--preset--color--accent);padding-top:var(--wp--preset--spacing--30);padding-right:var(--wp--preset--spacing--50);padding-bottom:var(--wp--preset--spacing--30);padding-left:var(--wp--preset--spacing--50)">'. esc_html__('Explore More','event-management-blocks').'</a></div>
    <!-- /wp:button --></div>
    <!-- /wp:buttons --></div>
    <!-- /wp:group --></div>
    <!-- /wp:column -->
    
    <!-- wp:column {"width":"33.33%"} -->
    <div class="wp-block-column" style="flex-basis:33.33%"><!-- wp:group {"className":"service-inner-box","style":{"spacing":{"padding":{"top":"var:preset|spacing|60","right":"var:preset|spacing|60","bottom":"var:preset|spacing|60","left":"var:preset|spacing|60"}},"border":{"radius":"10px","width":"1px"}},"layout":{"type":"constrained","contentSize":""}} -->
    <div class="wp-block-group service-inner-box" style="border-width:1px;border-radius:10px;padding-top:var(--wp--preset--spacing--60);padding-right:var(--wp--preset--spacing--60);padding-bottom:var(--wp--preset--spacing--60);padding-left:var(--wp--preset--spacing--60)"><!-- wp:columns -->
    <div class="wp-block-columns"><!-- wp:column {"verticalAlignment":"center","width":"15%"} -->
    <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:15%"><!-- wp:paragraph {"align":"center","className":"service-number","style":{"typography":{"fontSize":"60px","fontStyle":"normal","fontWeight":"900"},"elements":{"link":{"color":{"text":"#0000000d"}}},"color":{"text":"#0000000d"}}} -->
    <p class="has-text-align-center service-number has-text-color has-link-color" style="color:#0000000d;font-size:60px;font-style:normal;font-weight:900">'. esc_html__('06','event-management-blocks').'</p>
    <!-- /wp:paragraph --></div>
    <!-- /wp:column -->
    
    <!-- wp:column {"width":"70%","className":"Services-image"} -->
    <div class="wp-block-column Services-image" style="flex-basis:70%"><!-- wp:image {"id":94,"width":"50px","aspectRatio":"1","scale":"contain","sizeSlug":"full","linkDestination":"none","align":"center"} -->
    <figure class="wp-block-image aligncenter size-full is-resized"><img src="'.esc_url(get_template_directory_uri()) .'/assets/images/service06.png" alt="" class="wp-image-94" style="aspect-ratio:1;object-fit:contain;width:50px"/></figure>
    <!-- /wp:image --></div>
    <!-- /wp:column -->
    
    <!-- wp:column {"width":"15%"} -->
    <div class="wp-block-column" style="flex-basis:15%"></div>
    <!-- /wp:column --></div>
    <!-- /wp:columns -->
    
    <!-- wp:heading {"textAlign":"center","level":4,"style":{"typography":{"fontStyle":"normal","fontWeight":"700","fontSize":"20px"},"elements":{"link":{"color":{"text":"var:preset|color|primary"}}}},"textColor":"primary","fontFamily":"lato"} -->
    <h4 class="wp-block-heading has-text-align-center has-primary-color has-text-color has-link-color has-lato-font-family" style="font-size:20px;font-style:normal;font-weight:700">'. esc_html__('Festival Party','event-management-blocks').'</h4>
    <!-- /wp:heading -->
    
    <!-- wp:paragraph {"align":"center","style":{"typography":{"lineHeight":"1.5","fontStyle":"normal","fontWeight":"400"}},"textColor":"primary","fontSize":"small","fontFamily":"lato"} -->
    <p class="has-text-align-center has-primary-color has-text-color has-lato-font-family has-small-font-size" style="font-style:normal;font-weight:400;line-height:1.5">'. esc_html__('Lorem Ipsum is simply dummy text of the print and typesetting industry It is a the long-established fact that a reader','event-management-blocks').'</p>
    <!-- /wp:paragraph -->
    
    <!-- wp:buttons {"className":"banner-button","layout":{"type":"flex","justifyContent":"center"}} -->
    <div class="wp-block-buttons banner-button"><!-- wp:button {"textColor":"background","style":{"color":{"background":"var(--wp--preset--color--accent)"},"elements":{"link":{"color":{"text":"var:preset|color|background"}}},"typography":{"fontStyle":"normal","fontWeight":"700"},"border":{"radius":"4px"},"spacing":{"padding":{"left":"var:preset|spacing|50","right":"var:preset|spacing|50","top":"var:preset|spacing|30","bottom":"var:preset|spacing|30"}}},"fontSize":"extra-small","fontFamily":"lato"} -->
    <div class="wp-block-button has-custom-font-size has-lato-font-family has-extra-small-font-size" style="font-style:normal;font-weight:700"><a class="wp-block-button__link has-background-color has-text-color has-background has-link-color wp-element-button" style="border-radius:4px;background-color:var(--wp--preset--color--accent);padding-top:var(--wp--preset--spacing--30);padding-right:var(--wp--preset--spacing--50);padding-bottom:var(--wp--preset--spacing--30);padding-left:var(--wp--preset--spacing--50)">'. esc_html__('Explore More','event-management-blocks').'</a></div>
    <!-- /wp:button --></div>
    <!-- /wp:buttons --></div>
    <!-- /wp:group --></div>
    <!-- /wp:column --></div>
    <!-- /wp:columns --></div>
    <!-- /wp:group -->
    
    <!-- wp:spacer {"height":"50px"} -->
    <div style="height:50px" aria-hidden="true" class="wp-block-spacer"></div>
    <!-- /wp:spacer -->',
);