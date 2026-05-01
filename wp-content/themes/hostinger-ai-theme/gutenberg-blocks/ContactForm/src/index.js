import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import './editor.scss';
import './style.scss';
import Edit from './edit';

registerBlockType('hostinger-ai-theme/contact-form-block', {
    title: __('Contact Form', 'hostinger-ai-theme'),
    description: __('A customizable contact form for your website', 'hostinger-ai-theme'),
    category: 'widgets',
    icon: 'email',

    attributes: {
        title: {
            type: 'string',
            default: ''
        },
        description: {
            type: 'string',
            default: ''
        },
        showTitle: {
            type: 'boolean',
            default: true
        },
        showDescription: {
            type: 'boolean',
            default: true
        },
        buttonText: {
            type: 'string',
            default: __('Send Message', 'hostinger-ai-theme')
        },
        nameLabel: {
            type: 'string',
            default: __('Name', 'hostinger-ai-theme')
        },
        emailLabel: {
            type: 'string',
            default: __('Email', 'hostinger-ai-theme')
        },
        messageLabel: {
            type: 'string',
            default: __('Message', 'hostinger-ai-theme')
        },
        namePlaceholder: {
            type: 'string',
            default: __("What's your name?", 'hostinger-ai-theme')
        },
        emailPlaceholder: {
            type: 'string',
            default: __("What's your email?", 'hostinger-ai-theme')
        },
        messagePlaceholder: {
            type: 'string',
            default: __('Write your message...', 'hostinger-ai-theme')
        },
        privacyPolicyText: {
            type: 'string',
            default: ''
        },
    },

    edit: Edit,

    save: function() {
        return null;
    }
});