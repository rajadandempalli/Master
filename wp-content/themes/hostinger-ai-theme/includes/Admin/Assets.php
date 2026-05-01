<?php

namespace Hostinger\AiTheme\Admin;

use Hostinger\AiTheme\Admin\Menu as AdminMenu;
use Hostinger\WpHelper\Utils;
use Hostinger\WpMenuManager\Menus;

defined( 'ABSPATH' ) || exit;

class Assets {
    private CONST WOO_I18N_PATH = HOSTINGER_AI_WEBSITES_THEME_PATH . DIRECTORY_SEPARATOR . 'includes' . DIRECTORY_SEPARATOR . 'Builder' . DIRECTORY_SEPARATOR . 'Woo' . DIRECTORY_SEPARATOR . 'i18n' . DIRECTORY_SEPARATOR;

    private Utils $utils;

    public function __construct( Utils $utils) {
        $this->utils = $utils;

        $admin_path = parse_url( admin_url(), PHP_URL_PATH );
        if ( $this->utils->isThisPage( $admin_path . 'admin.php?page=' . AdminMenu::AI_BUILDER_MENU_SLUG ) || $this->utils->isThisPage( $admin_path . 'admin.php?page=' . Menus::MENU_SLUG ) ) {
            add_action( 'admin_enqueue_scripts', array( $this, 'admin_styles' ) );
            add_action( 'admin_enqueue_scripts', array( $this, 'admin_scripts' ) );
        }
    }

	/**
	 * Enqueues styles for the Hostinger admin pages.
	 */
	public function admin_styles(): void {
		wp_enqueue_style( 'hostinger_ai_websites_main_styles', HOSTINGER_AI_WEBSITES_ASSETS_URL . '/css/main.min.css', array(), wp_get_theme()->get( 'Version' ) );

        $hide_menu_item = '.hsr-list__item a.' . Menu::AI_BUILDER_MENU_SLUG . ', .toplevel_page_hostinger a[href="admin.php?page=' . Menu::AI_BUILDER_MENU_SLUG . '"] { display: none !important; }';
        wp_add_inline_style( 'hostinger_ai_websites_main_styles', $hide_menu_item );
    }

	/**
	 * Enqueues scripts for the Hostinger admin pages.
	 */
	public function admin_scripts(): void {
        wp_enqueue_script(
            'hostinger_ai_websites_main_scripts',
            HOSTINGER_AI_WEBSITES_ASSETS_URL . '/js/main.min.js',
            array(
                'jquery',
                'wp-i18n',
            ),
            wp_get_theme()->get( 'Version' ),
            false
        );

        $site_url = add_query_arg( 'LSCWP_CTRL', 'before_optm', get_site_url() . '/' );

        $language_code = 'en';
        $locale        = get_locale();
        if ( ! empty( $locale ) ) {
            $language_code = substr( $locale, 0, 2 );
        }

        $localize_data = array(
            'site_url'     => $site_url,
            'plugin_url'   => get_stylesheet_directory_uri() . '/',
            'hostinger_admin_url' => admin_url('admin.php?page=hostinger'),
            'admin_url' => admin_url('admin-ajax.php'),
            'website_type' => get_option( 'hostinger_website_type', 'other' ),
            'translations' => AdminTranslations::getValues(),
            'content_generated' => (int)!empty( get_option( 'hostinger_ai_version' ) ),
            'rest_base_url' => esc_url_raw( rest_url() ),
            'nonce'         => wp_create_nonce( 'wp_rest' ),
            'ajax_nonce'         => wp_create_nonce( 'updates' ),
            'homepage_editor_url' => $this->get_homepage_site_editor_url(),
            'countries_and_states' => $this->get_countries_and_states(),
            'site_locale' => $language_code
        );

        wp_localize_script(
            'hostinger_ai_websites_main_scripts',
            'hostinger_ai_websites',
            $localize_data
        );

        wp_enqueue_script(
            'hostinger_ai_websites_admin_scripts',
            HOSTINGER_AI_WEBSITES_ASSETS_URL . '/js/admin.min.js',
            array(
                'jquery',
                'wp-i18n',
            ),
            wp_get_theme()->get( 'Version' ),
            false
        );
	}

    private function get_homepage_site_editor_url(): string {
        $homepage_editor_url = add_query_arg( array(
            'canvas' => 'edit',
        ), admin_url( 'site-editor.php' ) );

        return $homepage_editor_url;
    }

    private function get_countries_and_states(): array {
        $countries = include self::WOO_I18N_PATH . 'countries.php';
        if ( ! $countries ) {
            return array();
        }
        $output = array();
        foreach ( $countries as $key => $value ) {
            $states = include self::WOO_I18N_PATH . 'states.php';

            if ( ! empty( $states[ $key ] ) ) {
                $states = $states[ $key ];

                foreach ( $states as $state_key => $state_value ) {
                    $output[ $key . ':' . $state_key ] = $value . ' - ' . $state_value;
                }
            } else {
                $output[ $key ] = $value;
            }
        }

        return $output;
    }
}
