const toggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

toggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Contact form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const action = contactForm.getAttribute('action');

        try {
            const response = await fetch(action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Your message has been sent successfully.';
                successMessage.style.cssText = `
                    background: #28a745;
                    color: white;
                    padding: 15px;
                    border-radius: 5px;
                    margin-top: 15px;
                    text-align: center;
                    font-weight: bold;
                `;

                // Remove any existing success message
                const existingMessage = contactForm.querySelector('.success-message');
                if (existingMessage) {
                    existingMessage.remove();
                }

                contactForm.appendChild(successMessage);
                contactForm.reset();

                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            } else {
                alert('There was a problem sending your message. Please try again.');
            }
        } catch (error) {
            alert('There was a problem sending your message. Please try again.');
        }
    });
}