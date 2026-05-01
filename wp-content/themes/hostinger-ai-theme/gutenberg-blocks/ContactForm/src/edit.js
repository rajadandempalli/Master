import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';
import {
    PanelBody,
    TextControl,
    TextareaControl,
    ToggleControl
} from '@wordpress/components';

export default function Edit(props) {
    const {
        title,
        description,
        showTitle,
        showDescription,
        buttonText,
        nameLabel,
        emailLabel,
        messageLabel,
        namePlaceholder,
        emailPlaceholder,
        messagePlaceholder,
        privacyPolicyText
    } = props.attributes;

    const inspector_controls = (
        <InspectorControls>
            <PanelBody title={__('Form Settings', 'hostinger-ai-theme')} initialOpen={true}>
                <ToggleControl
                    label={__('Show Title', 'hostinger-ai-theme')}
                    checked={showTitle}
                    onChange={(value) => props.setAttributes({ showTitle: value })}
                />

                {showTitle && (
                    <TextControl
                        label={__('Title', 'hostinger-ai-theme')}
                        value={title}
                        onChange={(value) => props.setAttributes({ title: value })}
                        placeholder={__('Enter form title...', 'hostinger-ai-theme')}
                    />
                )}

                <ToggleControl
                    label={__('Show Description', 'hostinger-ai-theme')}
                    checked={showDescription}
                    onChange={(value) => props.setAttributes({ showDescription: value })}
                />

                {showDescription && (
                    <TextareaControl
                        label={__('Description', 'hostinger-ai-theme')}
                        value={description}
                        onChange={(value) => props.setAttributes({ description: value })}
                        placeholder={__('Enter form description...', 'hostinger-ai-theme')}
                    />
                )}
            </PanelBody>

            <PanelBody title={__('Form Fields', 'hostinger-ai-theme')} initialOpen={false}>
                <TextControl
                    label={__('Name Label', 'hostinger-ai-theme')}
                    value={nameLabel}
                    onChange={(value) => props.setAttributes({ nameLabel: value })}
                />
                <TextControl
                    label={__('Name Placeholder', 'hostinger-ai-theme')}
                    value={namePlaceholder}
                    onChange={(value) => props.setAttributes({ namePlaceholder: value })}
                />

                <TextControl
                    label={__('Email Label', 'hostinger-ai-theme')}
                    value={emailLabel}
                    onChange={(value) => props.setAttributes({ emailLabel: value })}
                />
                <TextControl
                    label={__('Email Placeholder', 'hostinger-ai-theme')}
                    value={emailPlaceholder}
                    onChange={(value) => props.setAttributes({ emailPlaceholder: value })}
                />

                <TextControl
                    label={__('Message Label', 'hostinger-ai-theme')}
                    value={messageLabel}
                    onChange={(value) => props.setAttributes({ messageLabel: value })}
                />
                <TextControl
                    label={__('Message Placeholder', 'hostinger-ai-theme')}
                    value={messagePlaceholder}
                    onChange={(value) => props.setAttributes({ messagePlaceholder: value })}
                />

                <TextControl
                    label={__('Button Text', 'hostinger-ai-theme')}
                    value={buttonText}
                    onChange={(value) => props.setAttributes({ buttonText: value })}
                />
            </PanelBody>

            <PanelBody title={__('Privacy Policy', 'hostinger-ai-theme')} initialOpen={false}>
                <TextareaControl
                    label={__('Privacy Policy Text', 'hostinger-ai-theme')}
                    value={privacyPolicyText}
                    onChange={(value) => props.setAttributes({ privacyPolicyText: value })}
                    placeholder={__('Leave empty to use default privacy policy text', 'hostinger-ai-theme')}
                    help={__('Leave empty to use the default privacy policy text with automatic link generation.', 'hostinger-ai-theme')}
                />
            </PanelBody>
        </InspectorControls>
    );

    return (
        <div {...useBlockProps()}>
            {inspector_controls}
            <ServerSideRender
                key="hostinger-contact-form-server-side-renderer"
                block="hostinger-ai-theme/contact-form-block"
                attributes={props.attributes}
            />
        </div>
    );
}