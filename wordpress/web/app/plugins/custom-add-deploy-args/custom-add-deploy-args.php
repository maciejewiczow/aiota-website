<?php
/*
 * Plugin Name: Add deploy args for JAMStack deployments plugin
 */

use function Env\env;

function addDeployArgs($args)
{
    $token = env("GH_DEPLOYMENT_TOKEN");
    $ref = env("GH_DEPLOYMENT_REF");
    $args['headers'] = array(
        'Accept' => 'application/vnd.github+json',
        'Authorization' => "Bearer $token",
        'X-GitHub-Api-Version' => '2022-11-28',
    );

    $args['body'] = "{\"ref\": \"$ref\"}";

    return $args;
}

add_filter('jamstack_deployments_webhook_request_args', 'addDeployArgs');
