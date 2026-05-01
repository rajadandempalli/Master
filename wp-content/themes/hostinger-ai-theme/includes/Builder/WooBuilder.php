<?php

namespace Hostinger\AiTheme\Builder;

use Hostinger\AffiliatePlugin\Admin\Options\PluginOptions;
use Hostinger\AffiliatePlugin\Admin\PluginSettings;
use Hostinger\AiTheme\Constants\PreviewImageConstant;
use Hostinger\EasyOnboarding\Dto\WooSetupParameters;
use Hostinger\EasyOnboarding\WooCommerce\SetupHandler;
use Plugin_Upgrader;
use WP_Ajax_Upgrader_Skin;
use WP_Error;

defined( 'ABSPATH' ) || exit;

class WooBuilder {
    private ImageManager $image_manager;
    function __construct( ImageManager $image_manager ) {
        $this->image_manager = $image_manager;
    }

    public function boot(): void {
        if ( ! $this->is_enabled() ) {
            return;
        }

        $this->prepare_plugin();

        if ( ! $this->is_plugin_active() ) {
            return;
        }

        $this->setup_localization();
    }

    public function prepare_plugin(): void {
        if ( ! function_exists( 'get_plugins' ) || ! function_exists( 'is_plugin_active' ) ) {
            require_once ABSPATH . 'wp-admin/includes/plugin.php';
        }

        $installed_plugins = get_plugins();

        if ( !in_array( 'woocommerce/woocommerce.php', $installed_plugins, true ) ) {
            $this->install_plugin();
            return;
        }

        activate_plugin( 'woocommerce/woocommerce.php' );
    }

    public function install_plugin(): null|WP_Error {
        require_once ABSPATH . 'wp-admin/includes/file.php';
        include_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';
        include_once ABSPATH . 'wp-admin/includes/plugin-install.php';
        include_once ABSPATH . 'wp-admin/includes/plugin.php';

        $skin     = new WP_Ajax_Upgrader_Skin();
        $upgrader = new Plugin_Upgrader( $skin );

        $install_plugin = $upgrader->install( 'https://downloads.wordpress.org/plugin/woocommerce.latest-stable.zip' );

        if ( is_wp_error( $install_plugin ) ) {
            error_log( 'Hostinger AI Theme: ' . print_r( $install_plugin, true ) );
            return null;
        }

        return activate_plugin( 'woocommerce/woocommerce.php' );
    }

    public function setup_localization(): void {
        if ( ! class_exists( 'Hostinger\EasyOnboarding\WooCommerce\SetupHandler' ) ) {
            return;
        }

        $parameters = array(
            'store_name' => get_option( 'hostinger_ai_brand_name', '' ),
            'industry' => '',
            'store_location' => get_option( 'hostinger_ai_woo_location', 'LT' ),
            'business_email' => get_option( 'admin_email' ),
        );

        $woo_parameters = WooSetupParameters::from_array( $parameters );
        $setup_handler = new SetupHandler( $woo_parameters );
        $setup_handler->setup();

        update_option( 'woocommerce_coming_soon', 'no' );
    }

    public function generate_products( array $content ): bool {
        if(empty($content['pages']['ecommercePagesGroup']['sections'])) {
            return false;
        }

        if (!function_exists('wc_get_product')) {
            return false;
        }

        $created_product_ids = [];

        foreach($content['pages']['ecommercePagesGroup']['sections'] as $product) {
            if (!isset($product['type']) || $product['type'] !== 'product' || empty($product['elements'])) {
                continue;
            }

            $product_data = [
                'title' => '',
                'description' => '',
                'price' => '',
                'image' => '',
            ];

            foreach ($product['elements'] as $element) {
                if (empty($element['type']) || empty($element['content'])) {
                    continue;
                }

                switch ($element['type']) {
                    case 'Title':
                        $product_data['title'] = sanitize_text_field($element['content']);
                        break;
                    case 'Description':
                        $product_data['description'] = wp_kses_post($element['content']);
                        break;
                    case 'Price number':
                        $price = preg_replace('/[^0-9.]/', '', $element['content']);
                        $product_data['price'] = floatval($price);
                        break;
                    case 'Image':
                        $product_data['image'] = sanitize_text_field($element['content']);
                        break;
                }
            }

            if (!empty($product_data['title'])) {
                $new_product = [
                    'post_title'    => $product_data['title'],
                    'post_content'  => $product_data['description'],
                    'post_status'   => 'publish',
                    'post_type'     => 'product',
                ];

                $product_id = wp_insert_post($new_product);

                if (!is_wp_error($product_id)) {
                    if (!empty($product_data['price'])) {
                        update_post_meta($product_id, '_price', $product_data['price']);
                        update_post_meta($product_id, '_regular_price', $product_data['price']);
                    }

                    if ( ! empty( $product_data['image'] ) ) {
                        $this->image_manager->set_keyword( $product_data['image'] );
                        $image_data = $this->image_manager->get_unsplash_image_data( true );

                        if ( ! empty( get_object_vars( $image_data ) ) ) {
                            update_post_meta( $product_id, PreviewImageConstant::META_SLUG, $image_data->image );

                            $this->image_manager->create_image_placeholder_attachment( $product_id, true );
                        }
                    }

                    wp_set_object_terms($product_id, 'simple', 'product_type');

                    $created_product_ids[] = $product_id;
                }
            }
        }

        if (!empty($created_product_ids)) {
            update_option('hostinger_ai_created_products', $created_product_ids);
            return true;
        }

        return false;
    }

    private function is_enabled(): bool {
        return get_option( 'hostinger_ai_woo', false );
    }

    private function is_plugin_active(): bool {
        return is_plugin_active( 'woocommerce/woocommerce.php' );
    }
}
