<?php

namespace Hostinger\AiTheme\Builder;

use Exception;
use Hostinger\AiTheme\Constants\PreviewImageConstant;

defined( 'ABSPATH' ) || exit;

class WebsiteBuilder {
    /**
     * @var RequestClient
     */
    private RequestClient $request_client;
    private ImageManager $image_manager;
    private AffiliateBuilder $affiliate_builder;
    private HostingerReachBuilder $hostinger_reach_builder;
    private WooBuilder $woo_builder;
    private const WOO_BLOCKS_PATH = HOSTINGER_AI_WEBSITES_THEME_PATH . DIRECTORY_SEPARATOR . 'blocks' . DIRECTORY_SEPARATOR . 'woo' . DIRECTORY_SEPARATOR;

    public function __construct( RequestClient $request_client, ImageManager $image_manager, AffiliateBuilder $affiliate_builder, WooBuilder $woo_builder, HostingerReachBuilder $hostinger_reach_builder ) {
        $this->request_client = $request_client;
        $this->image_manager = $image_manager;
        $this->affiliate_builder = $affiliate_builder;
        $this->woo_builder = $woo_builder;
        $this->hostinger_reach_builder = $hostinger_reach_builder;
    }

    public function init() {
        add_filter( 'wp_theme_json_data_theme', [ $this, 'update_theme_json'], 999 );
    }

    public function update_theme_json( $theme_json) {

        $hostinger_ai_version = get_option( 'hostinger_ai_version', false );

        if(empty($hostinger_ai_version)) {
            return $theme_json;
        }

        $new_data = array(
            'version'  => $hostinger_ai_version,
            'settings' => array(
                'color' => $this->get_theme_json_colors()
            ),
            'styles' => array(
                'typography' => $this->get_theme_json_typography( $theme_json ),
            )
        );

        return $theme_json->update_with( $new_data );

    }

    /**
     * Get a random font from the theme.json font family list.
     *
     * @param \WP_Theme_JSON_Data $theme_json
     * @return array The font family data.
     */
    protected function get_theme_json_typography( \WP_Theme_JSON_Data $theme_json ): array {
        $theme_json_data = $theme_json->get_data();

        // void when no available fonts
        if ( ! isset( $theme_json_data['settings']['typography']['fontFamilies']['theme'] ) ) {
            return array();
        }

        $fonts = $theme_json_data['settings']['typography']['fontFamilies']['theme'];
        $current_font = get_option( 'hostinger_ai_font', false );

        // Attempt to get the already selected font, otherwise select a random one from the available fonts.
        if ( $current_font && in_array( $current_font, array_column( $fonts, 'fontFamily' ) ) ) {
            $selected_font = $current_font;
        } else {
            $random_key = array_rand( $fonts );
            $selected_font = $fonts[$random_key]['fontFamily'];
            update_option( 'hostinger_ai_font', $selected_font );
        }

        return array(
            "fontFamily" => $selected_font,
        );
    }

    protected function get_theme_json_colors() {
        $hostinger_ai_colors = get_option( 'hostinger_ai_colors', false );
        $gradient_key = array_key_first($hostinger_ai_colors['color_palette']['gradients']);

        return array(
            'palette' => [
                [
                    'slug' => 'color1',
                    'color' => !empty($hostinger_ai_colors['color_palette']['color1']) ? $hostinger_ai_colors['color_palette']['color1'] : '',
                    'name' => 'Color 1 (Section backgrounds)'
                ],
                [
                    'slug' => 'color2',
                    'color' => !empty($hostinger_ai_colors['color_palette']['color2']) ? $hostinger_ai_colors['color_palette']['color2'] : '',
                    'name' => 'Color 2 (Section backgrounds)'
                ],
                [
                    'slug' => 'color3',
                    'color' => !empty($hostinger_ai_colors['color_palette']['color3']) ? $hostinger_ai_colors['color_palette']['color3'] : '',
                    'name' => 'Color 3 (Button background)'
                ],
                [
                    'slug' => 'light',
                    'color' => !empty($hostinger_ai_colors['color_palette']['light']) ? $hostinger_ai_colors['color_palette']['light'] : '',
                    'name' => 'Light (Text on Color 2 and Gradient)'
                ],
                [
                    'slug' => 'dark',
                    'color' => !empty($hostinger_ai_colors['color_palette']['dark']) ? $hostinger_ai_colors['color_palette']['dark'] : '',
                    'name' => 'Dark (Text on Light and Color 1)'
                ],
                [
                    'slug' => 'grey',
                    'color' => !empty($hostinger_ai_colors['color_palette']['grey']) ? $hostinger_ai_colors['color_palette']['grey'] : '',
                    'name' => 'Grey (Form borders)'
                ]
            ],
            'gradients' => [
                [
                    'slug' => 'gradient-one',
                    'gradient' => 'linear-gradient(135deg, '.(!empty($hostinger_ai_colors['color_palette']['color3']) ? $hostinger_ai_colors['color_palette']['color3'] : '').' 0%, '.(!empty($hostinger_ai_colors['color_palette']['gradients']) ? $hostinger_ai_colors['color_palette']['gradients'][$gradient_key]['gradient'] : '').' 100%)',
                    'name' => 'Section background gradient'
                ]
            ]
        );
    }

    /**
     * @param string $description
     *
     * @return bool
     */
    public function generate_colors( string $description ): bool {
        $colors = new Colors( $description );
        $colors->setRequestClient( $this->request_client );

        return $colors->generate_colors();
    }

    /**
     * @param string $brand_name
     * @param string $website_type
     * @param string $description
     *
     * @return bool
     */
    public function generate_structure( string $brand_name, string $website_type, string $description ): bool {
        $structure = new Structure( $brand_name, $website_type, $description );
        $structure->setRequestClient( $this->request_client );

        $website_structure = $structure->generate_structure( $website_type );

        if ( empty( $website_structure ) ) {
            return false;
        }

        $this->mark_blog_section($website_structure);

        update_option( 'hostinger_ai_website_structure', $website_structure );

        return true;
    }

    /**
     * @throws Exception
     */
    public function generate_content( string $brand_name, string $website_type, string $description ): bool {
        $structure = new Structure( $brand_name, $website_type, $description );
        $structure->setRequestClient( $this->request_client );

        $website_structure = get_option( 'hostinger_ai_website_structure' );

        $page_data = $structure->generate_builder_data( $website_structure );

        $content = $structure->generate_content( $page_data );

        if(empty($content)) {
            throw new Exception('There was an error generating a content');
        }

        $content = $structure->merge_content( $page_data, $content );

        update_option( 'hostinger_ai_website_content', $content );

        $blog_content_needed = get_option( 'hostinger_ai_blog_needed', false );

        if(!empty($blog_content_needed)) {
            $this->affiliate_builder->boot();

            $blog_builder = new BlogBuilder( $brand_name, $website_type, $description );
            $blog_builder->generate_blog();
        }

        $woocommerce = get_option( 'hostinger_ai_woo', false );

        if(!empty($woocommerce)) {
            $this->woo_builder->boot();
            $this->woo_builder->generate_products($content);
        }

		$this->hostinger_reach_builder->boot();

        return true;
    }

    /**
     * @param array $content
     *
     * @return bool
     */
    public function build_content( array $content ): bool {
        $page_builder = new PageBuilder( $content );

        $options = get_option( 'hostinger_ai_theme_display_options', [] );

        $this->maybe_delete_woo_pages();

        $pages = $page_builder->build_pages();

        $home_key = array_key_first( $pages );

        if ( ! empty( $pages[$home_key] ) ) {
            update_option( 'show_on_front', 'page' );
            update_option( 'page_on_front', $pages[$home_key]['page_id'] );
        }

        $this->maybe_build_woo_pages( $pages );

        $navigation_builder = new NavigationBuilder( $pages );
        $navigation_builder->updateMenus();

        // Handle header visibility separately
        $this->update_header_visibility( $content );

        return true;
    }

    /**
     * @return void
     */
    public function clear_ai_data(): void {
        // Prompt.
        delete_option('hostinger_ai_brand_name');
        delete_option('hostinger_ai_website_type');
        delete_option('hostinger_ai_description');
        delete_option('hostinger_ai_selected_language');

        // Affiliate flag.
        delete_option('hostinger_ai_affiliate');

        // Disable WooCommerce if previously installed & activated.
        $hostinger_ai_woo = get_option('hostinger_ai_woo', false);
        if ( $hostinger_ai_woo ) {
            deactivate_plugins( 'woocommerce/woocommerce.php' );
        }

        // Woo flag.
        delete_option('hostinger_ai_woo');

        // Colors & selected font.
        delete_option('hostinger_ai_version');
        delete_option('hostinger_ai_colors');
        delete_option('hostinger_ai_font');

        // Images.
        delete_option('hostinger_ai_used_images');

        // Structure
        delete_option('hostinger_ai_website_structure');

        // Content
        delete_option('hostinger_ai_website_content');
    }

    /**
     * @return bool
     */
    public function clear_ai_content(): bool {
        remove_theme_support('custom-logo');

        $pages = get_option('hostinger_ai_created_pages', array());

        if ( empty( $pages ) ) {
            return false;
        }

        foreach ( $pages as $page ) {
            wp_delete_post( $page['page_id'], true );
        }

        delete_option('hostinger_ai_created_pages');

        // Blog flag
        delete_option('hostinger_ai_blog_needed');

        $this->clean_products();

        // Blog posts
        $created_blog_posts = get_option( 'hostinger_ai_created_blog_posts', array() );

        if ( empty( $created_blog_posts ) ) {
            return true;
        }

        foreach($created_blog_posts as $post_id) {
            wp_delete_post( $post_id, true );

            $this->image_manager->delete_attachments_by_meta_value( PreviewImageConstant::POST_ID, $post_id );
        }

        delete_option( 'hostinger_ai_created_blog_posts' );

        return true;
    }

    public function mark_blog_section( array $structure ): void {
        if (!empty($structure)) {
            foreach ($structure as $page_data) {
                if (!empty($page_data['sections'])) {
                    $sections = array_column($page_data['sections'], 'section');
                    if (array_search('blog-posts', $sections) !== false) {
                        update_option('hostinger_ai_blog_needed', 1);
                        break;
                    }
                }
            }
        }
    }

    /**
     * Handle header visibility based on website type
     *
     * @param array $content The content configuration
     */
    private function update_header_visibility( array $content ): void {
        $options = get_option( 'hostinger_ai_theme_display_options', [] );

        $is_landing_page = isset( $content['website_type'] ) && $content['website_type'] === 'landing page';
        $header_hidden   = isset( $options['hide_header'] );

        if ( $is_landing_page && ! $header_hidden ) {
            $options['hide_header'] = 1;
            update_option( 'hostinger_ai_theme_display_options', $options );
        } elseif ( ! $is_landing_page && $header_hidden ) {
            unset( $options['hide_header'] );
            update_option( 'hostinger_ai_theme_display_options', $options );
        }
    }

    private function clean_products(): bool {
        $products = get_option( 'hostinger_ai_created_products', array() );

        foreach($products as $post_id) {
            wp_delete_post( $post_id, true );
        }

        delete_option( 'hostinger_ai_created_products' );

        return true;
    }

    private function maybe_build_woo_pages(array $pages): bool {
        if (empty(get_option('hostinger_ai_woo'))) {
            return false;
        }

        $new_pages = array();

        $cart_page = $this->create_woo_page(
            'cart.html',
            __('Cart', 'hostinger-ai-theme'),
            'woocommerce_cart_page_id'
        );
        if ($cart_page) {
            $new_pages['cart'] = $cart_page;
        }

        $checkout_page = $this->create_woo_page(
            'checkout.html',
            __('Checkout', 'hostinger-ai-theme'),
            'woocommerce_checkout_page_id'
        );
        if ($checkout_page) {
            $new_pages['checkout'] = $checkout_page;
        }

        $myaccount_page = $this->create_woo_page(
            'my-account.html',
            __('My Account', 'hostinger-ai-theme'),
            'woocommerce_myaccount_page_id'
        );
        if ($myaccount_page) {
            $new_pages['myaccount'] = $myaccount_page;
        }

        if (!empty($new_pages)) {
            $existing_pages = get_option('hostinger_ai_created_pages', []);
            update_option('hostinger_ai_created_pages', array_merge($existing_pages, $new_pages));
        }

        if (count($pages) < 2) {
            return false;
        }

        $shop_page_key = get_option( 'hostinger_ai_woo_shop_page_key', false );
        if ( ! empty( $shop_page_key ) && ! empty( $pages[ $shop_page_key ] ) ) {
            update_option('woocommerce_shop_page_id', $pages[ $shop_page_key ]['page_id']);
        }

        return true;
    }

    private function create_woo_page( string $template_file, string $title, string $option_name ): array {
        $template_path = self::WOO_BLOCKS_PATH . $template_file;

        if (!file_exists($template_path)) {
            return array();
        }

        $content = file_get_contents($template_path);
        if ($content === false) {
            return array();
        }
        $page_id = wp_insert_post([
            'post_title' => $title,
            'post_content' => $content,
            'post_status' => 'publish',
            'post_type' => 'page',
        ]);

        if (!$page_id || is_wp_error($page_id)) {
            return array();
        }

        update_option($option_name, $page_id);

        return array(
            'title' => $title,
            'page_id' => $page_id,
        );
    }

    private function maybe_delete_woo_pages(): void {
        if ( empty( get_option( 'hostinger_ai_woo' ) ) ) {
            return;
        }

        $woo_pages = [
            'woocommerce_shop_page_id',
            'woocommerce_cart_page_id',
            'woocommerce_checkout_page_id',
            'woocommerce_myaccount_page_id',
        ];

        foreach ( $woo_pages as $page_option ) {
            $page_id = get_option( $page_option );
            if ( $page_id ) {
                wp_delete_post( $page_id, true );
                delete_option( $page_option );
            }
        }
    }
}
