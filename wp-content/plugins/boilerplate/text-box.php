<?php
/**
 * Plugin Name:       Text Box
 * Description:       a box of text.
 * Version:           0.1.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Chanchan
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       boilerplate
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

function blocks_text_box_block_init() {
	register_block_type( __DIR__ . '/build/boilerplate' );
}
add_action( 'init', 'blocks_text_box_block_init' );
