<?php
/**
 * Builder Rest API
 *
 */

namespace Hostinger\AiTheme\Rest;

use Hostinger\AiTheme\Builder\Colors;
use Hostinger\AiTheme\Builder\WebsiteBuilder;
use Hostinger\AiTheme\Builder\RequestClient;
use Hostinger\WpHelper\Requests\Client;
use Hostinger\WpHelper\Config;
use Hostinger\WpHelper\Utils;
use Exception;

/**
 * Avoid possibility to get file accessed directly
 */
if ( ! defined( 'ABSPATH' ) ) {
    die;
}

/**
 * Class for handling Settings Rest API
 */
class BuilderRoutes {
    /**
     * @var WebsiteBuilder
     */
    private WebsiteBuilder $website_builder;

    /**
     * @var RequestClient
     */
    private RequestClient $request_client;

    /**
     * @param WebsiteBuilder $website_builder
     */
    public function __construct( WebsiteBuilder $website_builder ) {
        $this->website_builder = $website_builder;

        $helper = new Utils();
        $config_handler = new Config();
        $client = new Client(
            $config_handler->getConfigValue( 'base_rest_uri', HOSTINGER_AI_WEBSITES_REST_URI ),
            [
                Config::TOKEN_HEADER  => $helper::getApiToken(),
                Config::DOMAIN_HEADER => $helper->getHostInfo(),
                'Content-Type' => 'application/json'
            ]
        );
        $this->request_client = new RequestClient( $client );
    }

    /**
     * @param \WP_REST_Request $request
     *
     * @return \WP_REST_Response|\WP_Error
     */
    public function generate_colors( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
        $parameters = $request->get_params();

        $fields = array(
            'brand_name',
            'website_type',
            'description',
            'language'
        );

        $errors = array();

        foreach ( $fields as $field_key ) {
            if ( empty( $parameters[ $field_key ] ) ) {
                $errors[ $field_key ] = $field_key . ' is missing.';
            } else {
                $parameters[ $field_key ] = sanitize_text_field( $parameters[ $field_key ] );
            }
        }

        if ( ! empty( $parameters['location'] ) ) {
            $parameters['location'] = sanitize_text_field( $parameters['location'] );
        }

        if ( ! empty( $errors ) ) {
            return new \WP_Error(
                'data_invalid',
                __( 'Sorry, something wrong with data.', 'hostinger-ai-theme' ),
                array(
                    'status' => \WP_Http::BAD_REQUEST,
                    'errors' => $errors,
                )
            );
        }

        $this->website_builder->clear_ai_content();
        $this->website_builder->clear_ai_data();

        if ( $parameters['website_type'] === 'affiliate-marketing' ) {
            $parameters['website_type'] = 'blog';
            update_option('hostinger_ai_affiliate', true );
        }

        if ( $parameters['website_type'] === 'online store' ) {
            update_option('hostinger_ai_woo', true );
            update_option('hostinger_ai_woo_location', $parameters['location']);
        }

        // Purge LiteSpeed cache.
        if ( has_action( 'litespeed_purge_all' ) ) {
            do_action( 'litespeed_purge_all' );
        }

        update_option('blogname', $parameters['brand_name']);

        update_option('hostinger_ai_brand_name', $parameters['brand_name'] );
        update_option('hostinger_ai_website_type', $parameters['website_type'] );
        update_option('hostinger_ai_description', $parameters['description'] );
        update_option('hostinger_ai_selected_language', $parameters['language'] );

        $data = array(
            'colors_generated' => $this->website_builder->generate_colors( $parameters['description'] )
        );

        $response = new \WP_REST_Response( $data );

        $response->set_headers(array('Cache-Control' => 'no-cache'));

        $response->set_status( \WP_Http::OK );

        return $response;
    }

    /**
     * @param \WP_REST_Request $request
     *
     * @return \WP_REST_Response|\WP_Error
     */
    public function generate_structure( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
        $colors = get_option( 'hostinger_ai_colors', false );

        if ( empty( $colors ) ) {
            return new \WP_Error(
                'data_invalid',
                __( 'Wrong sequence of step execution.', 'hostinger-ai-theme' ),
                array(
                    'status' => \WP_Http::BAD_REQUEST,
                )
            );
        }

        $brand_name = get_option('hostinger_ai_brand_name' );
        $website_type = get_option('hostinger_ai_website_type' );
        $description = get_option('hostinger_ai_description' );

        $data = array(
            'structure_generated' => $this->website_builder->generate_structure( $brand_name, $website_type, $description )
        );

        $response = new \WP_REST_Response( $data );

        $response->set_headers(array('Cache-Control' => 'no-cache'));

        $response->set_status( \WP_Http::OK );

        return $response;
    }

    /**
     * @param \WP_REST_Request $request
     *
     * @return \WP_REST_Response|\WP_Error
     */
    public function generate_content( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
        $website_structure = get_option( 'hostinger_ai_website_structure', false );

        if ( empty( $website_structure ) ) {
            return new \WP_Error(
                'data_invalid',
                __( 'Wrong sequence of step execution.', 'hostinger-ai-theme' ),
                array(
                    'status' => \WP_Http::BAD_REQUEST,
                )
            );
        }
        $headers = $request->get_headers();

        if ( ! empty( $headers['x_correlation_id'] ) ) {
            update_option( 'hts_correlation_id', $headers['x_correlation_id'][0] );
        }

        $brand_name = get_option('hostinger_ai_brand_name' );
        $website_type = get_option('hostinger_ai_website_type' );
        $description = get_option('hostinger_ai_description' );

        try {

            $data = array(
                'content_generated' => $this->website_builder->generate_content( $brand_name, $website_type, $description )
            );

        } catch (Exception $e) {
            return new \WP_Error(
                'data_invalid',
                __( 'Problem generating content.', 'hostinger-ai-theme' ),
                array(
                    'status' => \WP_Http::BAD_REQUEST,
                    'error' => $e->getMessage()
                )
            );
        }

        $response = new \WP_REST_Response( $data );

        $response->set_headers(array('Cache-Control' => 'no-cache'));

        $response->set_status( \WP_Http::OK );

        return $response;
    }

    /**
     * @param \WP_REST_Request $request
     *
     * @return \WP_REST_Response|\WP_Error
     */
    public function build_content( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
        $website_content = get_option( 'hostinger_ai_website_content', false );

        if ( empty( $website_content ) ) {
            return new \WP_Error(
                'data_invalid',
                __( 'Wrong sequence of step execution.', 'hostinger-ai-theme' ),
                array(
                    'status' => \WP_Http::BAD_REQUEST,
                )
            );
        }

        try {

            $data = array(
                'content_built' => $this->website_builder->build_content( $website_content )
            );

        } catch (Exception $e) {
            return new \WP_Error(
                'data_invalid',
                __( 'Problem building content.', 'hostinger-ai-theme' ),
                array(
                    'status' => \WP_Http::BAD_REQUEST,
                    'error' => $e->getMessage()
                )
            );
        }

        // Purge LiteSpeed cache.
        if ( has_action( 'litespeed_purge_all' ) ) {
            do_action( 'litespeed_purge_all' );
        }

        delete_option( 'rewrite_rules' );

        $response = new \WP_REST_Response( $data );

        $response->set_headers(array('Cache-Control' => 'no-cache'));

        $response->set_status( \WP_Http::OK );

        return $response;
    }

    /**
     * @param \WP_REST_Request $request
     *
     * @return \WP_REST_Response|\WP_Error
     */
    public function enhance_prompt( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
        $parameters = $request->get_params();
        $text = $parameters['text']; // Already sanitized and validated by Routes.php

        try {
            $enhanced_text = $this->call_ai_enhancement_service( $text );

            $data = array(
                'data' => array(
                    'improved_prompt' => $enhanced_text
                )
            );

            $response = new \WP_REST_Response( $data );
            $response->set_headers( array( 'Cache-Control' => 'no-cache' ) );
            $response->set_status( \WP_Http::OK );

            return $response;

        } catch ( Exception $e ) {
            return new \WP_Error(
                'ai_service_error',
                $e->getMessage(),
                array(
                    'status' => \WP_Http::SERVICE_UNAVAILABLE,
                )
            );
        }
    }

    private function enhance_text_content( string $text ): string {
        return $this->call_ai_enhancement_service( $text );
    }

    private function call_ai_enhancement_service( string $text ): string {
        try {
            $request_params = ['text' => $text];
            $response_data = $this->request_client->post( '/v3/wordpress/plugin/builder/prompt-enhance', $request_params );

            if ( empty( $response_data ) ) {
                throw new Exception( 'AI enhancement service returned empty response' );
            }

            if ( ! isset( $response_data['improved_prompt'] ) || empty( $response_data['improved_prompt'] ) ) {
                throw new Exception( 'AI enhancement service did not return improved prompt' );
            }

            return $response_data['improved_prompt'];

        } catch ( Exception $exception ) {
            error_log( 'AI Enhancement API Error: ' . $exception->getMessage() );
            throw new Exception( 'AI enhancement service temporarily unavailable: ' . $exception->getMessage() );
        }
    }
}
