<?php
/*
 * Plugin Name: Limit core blocks attributes
 * Description: Remove core blocks attributes not supported by the frontend
 */

function getEnabledBlockTypes($allowed_block_types, WP_Block_Editor_Context $block_editor_context)
{
    return array(
        'core/paragraph',
        'core/heading',
        // TODO: remove blocks not included in the designs
    );
}

// TODO: uncomment when all block types are specified
// add_filter('allowed_block_types_all', 'getEnabledBlockTypes', 10, 2);

// function removeUnsupportedCoreBlockAttrs($settings, string $blockname)
// {
//     $removedBlockAttributes = [
//         'core/paragraph' => [
//             'align',
//             'backgroundColor',
//             'className',
//             'cssClassName',
//         ]
//     ];

//     if (!array_key_exists($blockname, $removedBlockAttributes)) {
//         return $settings;
//     }

//     var_dump($settings['attributes']);

//     foreach ($removedBlockAttributes[$blockname] as $attr) {
//         unset($settings['attributes'][$attr]);
//     }

//     return $settings;
// }

// add_filter('register_block_type_args', 'removeUnsupportedCoreBlockAttrs', 10, 2);

function test($metadata)
{
    $removedBlockAttributes = [
        'core/paragraph' => [
            'align',
            'backgroundColor',
            'className',
            'cssClassName',
        ]
    ];

    if (!array_key_exists($metadata['name'], $removedBlockAttributes)) {
        return $metadata;
    }

    // echo json_encode($metadata);

    return $metadata;
}

add_filter('block_type_metadata', 'test', 10, 1);
