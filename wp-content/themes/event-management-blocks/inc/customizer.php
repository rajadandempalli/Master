<?php
/**
 * Customizer
 * 
 * @package WordPress
 * @subpackage event-management-blocks
 * @since event-management-blocks 1.0
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function event_management_blocks_customize_register( $wp_customize ) {
	$wp_customize->add_section( new Event_Management_Blocks_Upsell_Section($wp_customize,'upsell_section',array(
		'title'            => __( 'Event Management Pro', 'event-management-blocks' ),
		'button_text'      => __( 'Upgrade Pro', 'event-management-blocks' ),
		'url'              => 'https://www.wpradiant.net/products/event-management-wordpress-theme',
		'priority'         => 0,
	)));
}
add_action( 'customize_register', 'event_management_blocks_customize_register' );

/**
 * Enqueue script for custom customize control.
 */
function event_management_blocks_custom_control_scripts() {
	wp_enqueue_script( 'event-management-blocks-custom-controls-js', get_template_directory_uri() . '/assets/js/custom-controls.js', array( 'jquery', 'jquery-ui-core', 'jquery-ui-sortable' ), '1.0', true );
	wp_enqueue_style( 'event-management-blocks-customize-controls', trailingslashit( get_template_directory_uri() ) . '/assets/css/customize-controls.css' );
}
add_action( 'customize_controls_enqueue_scripts', 'event_management_blocks_custom_control_scripts' );