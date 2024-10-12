<?php
/*
 * Plugin Name: Fix Grapqhl Polylang frontpages
 * Description: Fix Grapqhl Polylang issues with multilanguage frontpages https://github.com/valu-digital/wp-graphql-polylang/issues/35
 */

/**
 * Bugfix: prevent fetching pages from other languages. Without below filter, /de/about-us would resolve
 * to the english post called /en/about-us, which will give SEO issues. It also fixes an issue if two
 * posts in two different languages had the same post_name, the wrong one would/could be resolved
 * depending on what language you was requesting
 *
 * https://github.com/valu-digital/wp-graphql-polylang/issues/35
 * https://github.com/valu-digital/wp-graphql-polylang/issues/35#issuecomment-1012572074
 */
add_filter('request', function ($query_args) {
    if (isset($query_args['uri']) && $query_args['uri'] && isset($query_args['lang'])) {
        $explodedUri = explode('/', $query_args['uri']);
        if ($explodedUri[0] !== $query_args['lang']) {
            // query was made without language slug in URI
            return $query_args;
        }

        unset($explodedUri[0]); // remove language slug from URL
        $uriWithoutLang = implode('/', $explodedUri); // rebuild the URI without the slug in front

        if (function_exists('pll_get_post_language')) {
            $post = get_page_by_path($uriWithoutLang);

            if (!$post || $post && pll_get_post_language($post->ID) !== $query_args['lang']) {
                $query_args = [];
            }
        }
    }
    return $query_args;
}, 10, 2);


// https://github.com/valu-digital/wp-graphql-polylang/issues/35#issuecomment-1558145686
add_filter('graphql_resolve_field', function ($result, $source, $args, $context, $info, $type_name, $field_key, $field, $field_resolver) {
    if ($type_name === 'RootQuery' && $field_key === 'nodeByUri') {
        // explode uri and get only the middle part
        $exploded = explode('/', $args['uri']);
        $exploded = array_filter($exploded, function ($elem) {
            return strlen($elem) > 0;
        });

        if (count($exploded) !== 1) {
            return $result;
        }

        $lang = $exploded[1];

        // check if language exists in pll
        $valid_languages = pll_languages_list();

        if (in_array($lang, $valid_languages)) {
            // get translated post object
            $homepage_id = get_option('page_on_front');
            $frontpage = pll_get_post($homepage_id, $lang);
            $page = get_post($frontpage);

            // 💖
            $result = new \WPGraphQL\Model\Post($page);
        }
    }

    return $result;
}, 10, 9);
