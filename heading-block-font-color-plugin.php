<?php
/*
 * Plugin Name: Heading Block Font Color
 * Plugin URI: https://plugins.svn.wordpress.org/heading-block-font-color
 * Description: PLugin to set Font-Color Options for Heading block .
 * Author: Tejas Deshmukh
 * Author URI: https://profiles.wordpress.org/tejas5989/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * @package CGB
 */


function heading_block_font_color_example_backend_enqueue() {
    wp_enqueue_script(
        'heading-block-font-color-example-backend-script', // Unique handle.
        plugins_url( '/block.build.js', __FILE__ ), // block.js: We register the block here.
        array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ) // Dependencies, defined above.
    );
}
add_action( 'enqueue_block_editor_assets', 'heading_block_font_color_example_backend_enqueue' );