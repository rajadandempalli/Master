<?php
/**
 * Block Styles
 *
 * @link https://developer.wordpress.org/reference/functions/register_block_style/
 *
 * @package WordPress
 * @subpackage event-management-blocks
 * @since event-management-blocks 1.0
 */

if ( function_exists( 'register_block_style' ) ) {
	/**
	 * Register block styles.
	 *
	 * @since event-management-blocks 1.0
	 *
	 * @return void
	 */
	function event_management_blocks_register_block_styles() {
		

		// Image: Borders.
		register_block_style(
			'core/image',
			array(
				'name'  => 'event-management-blocks-border',
				'label' => esc_html__( 'Borders', 'event-management-blocks' ),
			)
		);

		
	}
	add_action( 'init', 'event_management_blocks_register_block_styles' );
}