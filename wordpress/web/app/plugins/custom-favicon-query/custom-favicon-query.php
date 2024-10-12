<?php
/*
 * Plugin Name: Favicon query
 */

function add_favicon_query()
{
    register_graphql_field(
        'RootQuery',
        'favicon',
        [
            'type' => 'MediaItem',
            'description' => 'Favicon set in the customizer',
            'resolve' => function () {
                $icon_id = get_option('site_icon');

                if (!isset($icon_id) || !absint($icon_id)) {
                    return null;
                }

                $media_object = get_post($icon_id);

                return new \WPGraphQL\Model\Post($media_object);
            }
        ]
    );
}

add_action('graphql_register_types', 'add_favicon_query');
