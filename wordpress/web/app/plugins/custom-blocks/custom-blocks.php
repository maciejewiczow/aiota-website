<?php
/*
 * Plugin Name: Custom blocks
 * Description: Registers custom editor blocks required for the frontend app
 */

function registerBlocksFromDirectories()
{
    $blocks_dir = __DIR__ . '/build/blocks';

    if (!is_dir($blocks_dir))
        return;

    $block_dirs = array_filter(scandir($blocks_dir), function ($dirname) use (&$blocks_dir) {
        return is_dir($blocks_dir . '/' . $dirname) && $dirname != '.' && $dirname != '..';
    });

    foreach ($block_dirs as $block_dir_path) {
        register_block_type($blocks_dir . '/' . $block_dir_path);
    }
}

add_action('init', 'registerBlocksFromDirectories');
