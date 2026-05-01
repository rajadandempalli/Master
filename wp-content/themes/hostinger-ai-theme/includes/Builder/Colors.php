<?php

namespace Hostinger\AiTheme\Builder;

defined( 'ABSPATH' ) || exit;

class Colors {

    use ColorUtils;

    /**
     * @var string
     */
    private string $description;

    /**
     * @var RequestClient
     */
    private RequestClient $request_client;

    public function __construct( string $description ) {
        $this->description = $description;
    }

    /**
     * @param RequestClient $request_client
     *
     * @return void
     */
    public function setRequestClient( RequestClient $request_client ): void {
        $this->request_client = $request_client;
    }

    public function generate_colors(): bool {
        $params = array(
            'description' => $this->description,
            'gradients'   => array(
                'z48lj' => 1,
            ),
        );

        $colors = $this->request_client->post( '/v3/wordpress/plugin/builder/colors-v2', $params );

        if ( ! empty( $colors['color_palette'] ) ) {
            $colors['color_palette'] = $this->ensure_accessible_contrast_ratio( $colors['color_palette'] );
            update_option( 'hostinger_ai_version', uniqid(), true );
            update_option( 'hostinger_ai_colors', $colors, true );

            return true;
        }

        return false;
    }

    private function ensure_accessible_contrast_ratio( array $color_palette ): array {

        $color_pairs = array(
            'color1' => 'dark',
            'color2' => 'light',
            'color3' => 'light',
        );

        foreach ( $color_pairs as $background => $foreground ) {
            $background_color = $color_palette[ $background ];
            $foreground_color = $color_palette[ $foreground ];

            $current_contrast = $this->calculate_contrast_ratio( $background_color, $foreground_color );

            if ( $current_contrast < $this->get_required_contrast_ratio() ) {
                $color_palette[ $background ] = $this->adjust_color_for_contrast(
                    $background_color,
                    $foreground_color
                );
            }
        }

        return $color_palette;
    }
}
