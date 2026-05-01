jQuery(document).ready(function ($) {
    // Attach click event to the dismiss button
    $(document).on('click', '.notice[data-notice="get-start"] button.notice-dismiss', function () {
        // Dismiss the notice via AJAX
        $.ajax({
            type: 'POST',
            url: ajaxurl,
            data: {
                action: 'event_management_blocks_dismissed_notice',
            },
            success: function () {
                // Remove the notice on success
                $('.notice[data-notice="example"]').remove();
            }
        });
    });
});
