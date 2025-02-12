<?php
/**
 * Plugin Name:       Team
 * Description:      A team members Grid
 * Version:           0.1.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            chanChan
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       team-members
 *
 * @package blocks-course
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

function blocks_course_team_members_block_init() {
	register_block_type( __DIR__ . '/build/team' );
}
add_action( 'init', 'blocks_course_team_members_block_init' );
