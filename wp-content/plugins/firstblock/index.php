<?php

/**
 * Plugin Name: First BLock
 * Author: Christian Ponce
 * Description: First BLock
 */

function firstblock_init(){
   register_block_type_from_metadata(__DIR__);
}

add_action('init','firstblock_init');

