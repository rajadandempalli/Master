(function(api) {

    api.sectionConstructor['event-management-blocks-upsell'] = api.Section.extend({
        attachEvents: function() {},
        isContextuallyActive: function() {
            return true;
        }
    });

})(wp.customize);