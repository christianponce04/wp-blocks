<?php
/**
 * Plugin Name:Second Block
 * Author: chan_chan
 *Description:second block
 */

function secondblock_init() {
  register_block_type_from_metadata(__DIR__);
}

add_action('init', 'secondblock_init');