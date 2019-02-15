<?php
/**
 * Block slider
 *
 * @package   matiere-noire-wp-slider
 * @link      https://github.com/johnbillion/query-monitor
 * @author    John Blackbourn <john@johnblackbourn.com>
 * @copyright 2009-2018 John Blackbourn
 * @license   GPL v2 or later
 *
 * Plugin Name:  WP Slider
 * Description:  Add a block slider
 * Version:      1.0.0
 * Plugin URI:   https://github.com/matiere-noire/wp-slider
 * Author:       Matiere Noire
 * Author URI:   https://matierenoire.io/
 * Text Domain:  wp-slider
 * Domain Path:  /languages/
 * Requires PHP: 7.2
 */


add_action( 'init', 'mn_wp_slider_register_block' );

function mn_wp_slider_register_block() {
    if ( ! function_exists( 'register_block_type' ) ) {
        return;
    }

    wp_register_script('mn-slider-block-script', plugins_url( 'dist/index.js', __FILE__ ),
        ['wp-blocks', 'wp-element', 'wp-components', 'wp-editor', 'wp-data' ],
        '1.0.0'
    );

    wp_register_script( 'slick', 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js', [ 'jquery-core'], '1.8.1', true );

    wp_register_script('mn-slider-script', plugins_url( 'dist/scripts.js', __FILE__ ), ['slick'], '1.0.0', true);

    wp_register_style( 'slick-styles', 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css', [], '1.8.1');

    wp_register_style('mn-slider-style', plugins_url( 'dist/index.css', __FILE__ ), ['slick-styles' ],'1.0.0' );

    register_block_type( 'matiere-noir/slider', array(
        'editor_script' => 'mn-slider-block-script',
        'script'        => 'mn-slider-script',
        'style'         => 'mn-slider-style'
    ) );
}
