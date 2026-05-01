<?php
/**
 * Banner Section
 * 
 * slug: event-management-blocks/banner
 * title: Banner
 * categories: event-management-blocks
 */

return array(
    'title'      =>__( 'Banner', 'event-management-blocks' ),
    'categories' => array( 'event-management-blocks' ),
    'content'    => '<!-- wp:group {"tagName":"main","className":"slider-main-box","style":{"color":{"background":"#101114"},"spacing":{"blockGap":"var:preset|spacing|30"}},"layout":{"type":"constrained","contentSize":"95%","wideSize":"95%"}} -->
    <main class="wp-block-group slider-main-box has-background" style="background-color:#101114"><!-- wp:cover {"url":"'.esc_url(get_template_directory_uri()) .'/assets/images/banner.png","id":6,"dimRatio":0,"isUserOverlayColor":true,"minHeight":600,"minHeightUnit":"px","contentPosition":"center center","className":"banner-section","style":{"spacing":{"padding":{"top":"0","bottom":"0","left":"0","right":"0"},"blockGap":"0","margin":{"top":"0","bottom":"0"}},"border":{"radius":"20px"}},"layout":{"type":"constrained","contentSize":"80%","wideSize":"80%"}} -->
    <div class="wp-block-cover banner-section" style="border-radius:20px;margin-top:0;margin-bottom:0;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0;min-height:600px"><span aria-hidden="true" class="wp-block-cover__background has-background-dim-0 has-background-dim"></span><img class="wp-block-cover__image-background wp-image-6" alt="" src="'.esc_url(get_template_directory_uri()) .'/assets/images/banner.png" data-object-fit="cover"/><div class="wp-block-cover__inner-container"><!-- wp:columns -->
    <div class="wp-block-columns"><!-- wp:column {"width":"15%"} -->
    <div class="wp-block-column" style="flex-basis:15%"></div>
    <!-- /wp:column -->
    
    <!-- wp:column {"verticalAlignment":"center","width":"70%","className":"main-column"} -->
    <div class="wp-block-column is-vertically-aligned-center main-column" style="flex-basis:70%"><!-- wp:paragraph {"align":"center","className":"small-text","style":{"elements":{"link":{"color":{"text":"var:preset|color|primary"}}},"typography":{"fontStyle":"normal","fontWeight":"700"}},"backgroundColor":"background","textColor":"primary","fontSize":"tiny","fontFamily":"lato"} -->
    <p class="has-text-align-center small-text has-primary-color has-background-background-color has-text-color has-background has-link-color has-lato-font-family has-tiny-font-size" style="font-style:normal;font-weight:700">'. esc_html__('Wedding Event','event-management-blocks').'</p>
    <!-- /wp:paragraph -->
    
    <!-- wp:heading {"level":1,"className":"banner-heading","style":{"typography":{"fontStyle":"normal","fontWeight":"700","fontSize":"40px"},"elements":{"link":{"color":{"text":"var:preset|color|background"}}}},"textColor":"background","fontFamily":"lato"} -->
    <h1 class="wp-block-heading banner-heading has-background-color has-text-color has-link-color has-lato-font-family" style="font-size:40px;font-style:normal;font-weight:700">'. esc_html__('The Honor Of Your Presence Is Requested.','event-management-blocks').'</h1>
    <!-- /wp:heading -->
    
    <!-- wp:paragraph {"className":"banner-text","style":{"typography":{"fontStyle":"normal","fontWeight":"500","lineHeight":"1.5"},"spacing":{"padding":{"right":"var:preset|spacing|60","left":"var:preset|spacing|60"}},"elements":{"link":{"color":{"text":"var:preset|color|background"}}}},"textColor":"background","fontSize":"small","fontFamily":"lato"} -->
    <p class="banner-text has-background-color has-text-color has-link-color has-lato-font-family has-small-font-size" style="padding-right:var(--wp--preset--spacing--60);padding-left:var(--wp--preset--spacing--60);font-style:normal;font-weight:500;line-height:1.5">'. esc_html__('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.','event-management-blocks').'</p>
    <!-- /wp:paragraph -->
    
    <!-- wp:buttons {"className":"banner-button","layout":{"type":"flex","justifyContent":"center"}} -->
    <div class="wp-block-buttons banner-button"><!-- wp:button {"textColor":"background","style":{"color":{"background":"var(--wp--preset--color--accent)"},"elements":{"link":{"color":{"text":"var:preset|color|background"}}},"typography":{"fontStyle":"normal","fontWeight":"700"},"border":{"radius":"4px"},"spacing":{"padding":{"left":"var:preset|spacing|50","right":"var:preset|spacing|50","top":"var:preset|spacing|30","bottom":"var:preset|spacing|30"}}},"fontSize":"extra-small","fontFamily":"lato"} -->
    <div class="wp-block-button has-custom-font-size has-lato-font-family has-extra-small-font-size" style="font-style:normal;font-weight:700"><a class="wp-block-button__link has-background-color has-text-color has-background has-link-color wp-element-button" style="border-radius:4px;background-color:var(--wp--preset--color--accent);padding-top:var(--wp--preset--spacing--30);padding-right:var(--wp--preset--spacing--50);padding-bottom:var(--wp--preset--spacing--30);padding-left:var(--wp--preset--spacing--50)">'. esc_html__('Explore More','event-management-blocks').'</a></div>
    <!-- /wp:button --></div>
    <!-- /wp:buttons --></div>
    <!-- /wp:column -->
    
    <!-- wp:column {"verticalAlignment":"top","width":"15%"} -->
    <div class="wp-block-column is-vertically-aligned-top" style="flex-basis:15%"></div>
    <!-- /wp:column --></div>
    <!-- /wp:columns --></div></div>
    <!-- /wp:cover -->
    
    <!-- wp:group {"style":{"spacing":{"padding":{"top":"0","bottom":"0"}}},"layout":{"type":"constrained","contentSize":"90%"}} -->
    <div class="wp-block-group" style="padding-top:0;padding-bottom:0"><!-- wp:columns {"className":"information-section","style":{"spacing":{"padding":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|30","left":"0","right":"0"},"blockGap":{"top":"0","left":"0"}},"border":{"radius":"15px"}}} -->
    <div class="wp-block-columns information-section" style="border-radius:15px;padding-top:var(--wp--preset--spacing--30);padding-right:0;padding-bottom:var(--wp--preset--spacing--30);padding-left:0"><!-- wp:column {"width":"35%"} -->
    <div class="wp-block-column" style="flex-basis:35%"><!-- wp:group {"className":"information-column","style":{"position":{"type":""},"spacing":{"padding":{"top":"var:preset|spacing|20","bottom":"var:preset|spacing|20","left":"var:preset|spacing|40","right":"var:preset|spacing|40"},"blockGap":"var:preset|spacing|40"}},"layout":{"type":"flex","flexWrap":"nowrap"}} -->
    <div class="wp-block-group information-column" style="padding-top:var(--wp--preset--spacing--20);padding-right:var(--wp--preset--spacing--40);padding-bottom:var(--wp--preset--spacing--20);padding-left:var(--wp--preset--spacing--40)"><!-- wp:image {"id":52,"width":"40px","height":"40px","scale":"contain","sizeSlug":"full","linkDestination":"none","className":"information-img","style":{"layout":{"selfStretch":"fit","flexSize":null},"border":{"width":"0px","style":"none","radius":"49px"}}} -->
    <figure class="wp-block-image size-full is-resized has-custom-border information-img"><img src="'.esc_url(get_template_directory_uri()) .'/assets/images/info01.png" alt="" class="wp-image-52" style="border-style:none;border-width:0px;border-radius:49px;object-fit:contain;width:40px;height:40px"/></figure>
    <!-- /wp:image -->
    
    <!-- wp:columns -->
    <div class="wp-block-columns"><!-- wp:column {"style":{"spacing":{"blockGap":"var:preset|spacing|20"}},"layout":{"type":"default"}} -->
    <div class="wp-block-column"><!-- wp:paragraph {"style":{"elements":{"link":{"color":{"text":"var:preset|color|background"}}},"typography":{"lineHeight":"1.1","fontStyle":"normal","fontWeight":"700"}},"textColor":"background","fontSize":"medium","fontFamily":"lato"} -->
    <p class="has-background-color has-text-color has-link-color has-lato-font-family has-medium-font-size" style="font-style:normal;font-weight:700;line-height:1.1">'. esc_html__('Virtual Event','event-management-blocks').'</p>
    <!-- /wp:paragraph -->
    
    <!-- wp:paragraph {"style":{"elements":{"link":{"color":{"text":"var:preset|color|background"}}},"typography":{"lineHeight":"1.1","fontStyle":"normal","fontWeight":"400"}},"textColor":"background","fontSize":"tiny","fontFamily":"lato"} -->
    <p class="has-background-color has-text-color has-link-color has-lato-font-family has-tiny-font-size" style="font-style:normal;font-weight:400;line-height:1.1">'. esc_html__('Lorem ipsum dolor sit amet, consectetur','event-management-blocks').'</p>
    <!-- /wp:paragraph --></div>
    <!-- /wp:column --></div>
    <!-- /wp:columns --></div>
    <!-- /wp:group --></div>
    <!-- /wp:column -->
    
    <!-- wp:column {"width":"35%"} -->
    <div class="wp-block-column" style="flex-basis:35%"><!-- wp:group {"className":"information-column","style":{"position":{"type":""},"spacing":{"padding":{"top":"var:preset|spacing|20","bottom":"var:preset|spacing|20","left":"var:preset|spacing|30","right":"var:preset|spacing|30"},"blockGap":"var:preset|spacing|40"}},"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"left","orientation":"horizontal"}} -->
    <div class="wp-block-group information-column" style="padding-top:var(--wp--preset--spacing--20);padding-right:var(--wp--preset--spacing--30);padding-bottom:var(--wp--preset--spacing--20);padding-left:var(--wp--preset--spacing--30)"><!-- wp:image {"id":57,"width":"40px","height":"40px","scale":"contain","sizeSlug":"full","linkDestination":"none","className":"information-img","style":{"layout":{"selfStretch":"fit","flexSize":null},"border":{"width":"0px","style":"none","radius":"50px"}}} -->
    <figure class="wp-block-image size-full is-resized has-custom-border information-img"><img src="'.esc_url(get_template_directory_uri()) .'/assets/images/info02.png" alt="" class="wp-image-57" style="border-style:none;border-width:0px;border-radius:50px;object-fit:contain;width:40px;height:40px"/></figure>
    <!-- /wp:image -->
    
    <!-- wp:columns -->
    <div class="wp-block-columns"><!-- wp:column {"style":{"spacing":{"blockGap":"var:preset|spacing|20"}},"layout":{"type":"default"}} -->
    <div class="wp-block-column"><!-- wp:paragraph {"style":{"elements":{"link":{"color":{"text":"var:preset|color|background"}}},"typography":{"lineHeight":"1.1","fontStyle":"normal","fontWeight":"700"}},"textColor":"background","fontSize":"medium","fontFamily":"lato"} -->
    <p class="has-background-color has-text-color has-link-color has-lato-font-family has-medium-font-size" style="font-style:normal;font-weight:700;line-height:1.1">'. esc_html__('Conference','event-management-blocks').'</p>
    <!-- /wp:paragraph -->
    
    <!-- wp:paragraph {"style":{"elements":{"link":{"color":{"text":"var:preset|color|background"}}},"typography":{"lineHeight":"1.1","fontStyle":"normal","fontWeight":"400"}},"textColor":"background","fontSize":"tiny","fontFamily":"lato"} -->
    <p class="has-background-color has-text-color has-link-color has-lato-font-family has-tiny-font-size" style="font-style:normal;font-weight:400;line-height:1.1">'. esc_html__('Lorem ipsum dolor sit amet, consectetur','event-management-blocks').'</p>
    <!-- /wp:paragraph --></div>
    <!-- /wp:column --></div>
    <!-- /wp:columns --></div>
    <!-- /wp:group --></div>
    <!-- /wp:column -->
    
    <!-- wp:column {"verticalAlignment":"center","width":"30%"} -->
    <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:30%"><!-- wp:columns {"verticalAlignment":"center","className":"social-column","style":{"spacing":{"blockGap":{"left":"var:preset|spacing|20"},"margin":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|30"}}}} -->
    <div class="wp-block-columns are-vertically-aligned-center social-column" style="margin-top:var(--wp--preset--spacing--30);margin-bottom:var(--wp--preset--spacing--30)"><!-- wp:column {"verticalAlignment":"center","width":"80px","style":{"spacing":{"blockGap":"var:preset|spacing|20"}},"layout":{"type":"default"}} -->
    <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:80px"><!-- wp:paragraph {"style":{"elements":{"link":{"color":{"text":"var:preset|color|background"}}},"typography":{"lineHeight":"1.1","fontStyle":"normal","fontWeight":"700"}},"textColor":"background","fontSize":"medium","fontFamily":"lato"} -->
    <p class="has-background-color has-text-color has-link-color has-lato-font-family has-medium-font-size" style="font-style:normal;font-weight:700;line-height:1.1">'. esc_html__('Follow Us','event-management-blocks').'</p>
    <!-- /wp:paragraph --></div>
    <!-- /wp:column -->
    
    <!-- wp:column {"verticalAlignment":"center","style":{"spacing":{"blockGap":"var:preset|spacing|20"}},"layout":{"type":"default"}} -->
    <div class="wp-block-column is-vertically-aligned-center"><!-- wp:social-links {"iconColor":"background","iconColorValue":"#fff","customIconBackgroundColor":"#ffffff00","iconBackgroundColorValue":"#ffffff00","size":"has-normal-icon-size","className":"banner-social-box is-style-default","style":{"spacing":{"blockGap":{"top":"var:preset|spacing|20","left":"var:preset|spacing|30"},"margin":{"right":"0","left":"0"}}},"layout":{"type":"flex"}} -->
    <ul class="wp-block-social-links has-normal-icon-size has-icon-color has-icon-background-color banner-social-box is-style-default" style="margin-right:0;margin-left:0"><!-- wp:social-link {"url":"#","service":"facebook","rel":""} /-->
    
    <!-- wp:social-link {"url":"#","service":"twitter"} /-->
    
    <!-- wp:social-link {"url":"#","service":"instagram"} /-->
    
    <!-- wp:social-link {"url":"#","service":"linkedin"} /--></ul>
    <!-- /wp:social-links --></div>
    <!-- /wp:column --></div>
    <!-- /wp:columns --></div>
    <!-- /wp:column --></div>
    <!-- /wp:columns --></div>
    <!-- /wp:group --></main>
    <!-- /wp:group -->',
);