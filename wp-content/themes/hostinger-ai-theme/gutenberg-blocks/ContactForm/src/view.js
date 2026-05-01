document.addEventListener('DOMContentLoaded', function () {
    const forms = document.querySelectorAll('.hts-contacts form');

    forms.forEach(function ( form ) {
        const emailInput = form.querySelector('.contact-email');
        const privacyPolicy = form.querySelector('.privacy-policy-checkbox');
        const messageContainer = form.querySelector('.validate-message');
        const submitButton = form.querySelector('input[type="submit"]');

        const validateEmail = ( email ) => {
            const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(email);
        };

        if ( emailInput ) {
            emailInput.addEventListener('input', () => {
                const isValid = validateEmail(emailInput.value);
                if ( !isValid ) {
                    emailInput.classList.add('not-valid');
                } else {
                    emailInput.classList.remove('not-valid');
                }
            });
        }

        form.addEventListener('submit', function ( e ) {
            e.preventDefault();

            if (submitButton.disabled) {
                return;
            }

            const name = form.querySelector('.contact-name').value;
            const email = emailInput ? emailInput.value : '';
            const message = form.querySelector('.contact-message').value;
            let privacyPolicyAgree = false;

            if ( privacyPolicy && privacyPolicy.checked ) {
                privacyPolicyAgree = 'on';
            }

            if ( messageContainer ) {
                messageContainer.textContent = '';
            }

            submitButton.disabled = true;
            submitButton.classList.add('loading');

            const formData = new FormData();
            formData.append('action', 'submit_contactform');
            formData.append('name', name);
            formData.append('email', email);
            formData.append('message', message);
            formData.append('privacy_policy', privacyPolicyAgree);
            formData.append('nonce', form.querySelector('input[name="contactform_nonce"]').value);

            fetch(hostinger_contact_form.ajax_url, {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    submitButton.disabled = false;
                    submitButton.classList.remove('loading');

                    if ( data.success ) {

                        if ( messageContainer ) {
                            messageContainer.textContent = data.data.message;
                            messageContainer.style.color = '#00b341';
                        }
                        form.reset();
                    } else {
                        if ( messageContainer ) {
                            messageContainer.textContent = data.data.message;
                            messageContainer.style.color = '#ff0000';
                        }
                    }
                })
                .catch(error => {
                    submitButton.disabled = false;
                    submitButton.classList.remove('loading');

                    if ( messageContainer ) {
                        messageContainer.textContent = hostinger_contact_form.error;
                        messageContainer.style.color = '#ff0000';
                    }
                });
        });
    });
});