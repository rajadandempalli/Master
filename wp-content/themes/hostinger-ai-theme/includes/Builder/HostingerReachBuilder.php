<?php

namespace Hostinger\AiTheme\Builder;

use Plugin_Upgrader;
use WP_Ajax_Upgrader_Skin;
use WP_Error;

defined( 'ABSPATH' ) || exit;

class HostingerReachBuilder {

    private const FORM_ID = 'ai-theme-footer-form';

    private const DEFAULT_PLUGIN_UPDATE_URI = 'https://wp-update.hostinger.io/';
    private const CANARY_PLUGIN_UPDATE_URI  = 'https://wp-update-canary.hostinger.io/';
    private const STAGING_PLUGIN_UPDATE_URI = 'https://wp-update-stage.hostinger.io/';

    public function boot(): void {
        $this->enable_plugin();
        $this->generate_form();
    }

    public function generate_form(): void {
        if ( ! $this->is_plugin_active() ) {
            return;
        }

        add_filter( 'hostinger_reach_default_forms', array( $this, 'add_form' ) );
    }

    public function add_form( array $forms ): array {
        $forms[] = self::FORM_ID;
        return $forms;
    }

    public function enable_plugin(): void {
        if ( ! function_exists( 'get_plugins' ) || ! function_exists( 'is_plugin_active' ) ) {
            require_once ABSPATH . 'wp-admin/includes/plugin.php';
        }

        $installed_plugins = get_plugins();

        if ( ! array_key_exists( 'hostinger-reach/hostinger-reach.php', $installed_plugins ) ) {
            $this->install_plugin();
            return;
        }

        $activate_plugin = activate_plugin( 'hostinger-reach/hostinger-reach.php' );

        if ( is_wp_error( $activate_plugin ) ) {
            error_log( 'Hostinger AI Theme: ' . print_r( $activate_plugin, true ) );
        }
    }

    public function install_plugin(): null|WP_Error {
        require_once ABSPATH . 'wp-admin/includes/file.php';
        include_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';
        include_once ABSPATH . 'wp-admin/includes/plugin-install.php';
        include_once ABSPATH . 'wp-admin/includes/plugin.php';

        $skin     = new WP_Ajax_Upgrader_Skin();
        $upgrader = new Plugin_Upgrader( $skin );

        $install_plugin = $upgrader->install( $this->get_plugin_update_uri() . '?action=download&slug=hostinger-reach' );

        if ( is_wp_error( $install_plugin ) ) {
            error_log( 'Hostinger AI Theme: ' . print_r( $install_plugin, true ) );
            return null;
        }

        return activate_plugin( 'hostinger-reach/hostinger-reach.php' );
    }

    private function is_plugin_active(): bool {
        return is_plugin_active( 'hostinger-reach/hostinger-reach.php' );
    }

    private function get_plugin_update_uri(): string {
        if ( isset( $_SERVER['H_STAGING'] ) && filter_var( $_SERVER['H_STAGING'], FILTER_VALIDATE_BOOLEAN ) === true ) {
            return self::STAGING_PLUGIN_UPDATE_URI;
        }

        if ( isset( $_SERVER['H_CANARY'] ) && filter_var( $_SERVER['H_CANARY'], FILTER_VALIDATE_BOOLEAN ) === true ) {
            return self::CANARY_PLUGIN_UPDATE_URI;
        }

        return self::DEFAULT_PLUGIN_UPDATE_URI;
    }
}
