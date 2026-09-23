/* ==========================================================================
   MINIMALIST PERSONAL PORTFOLIO - JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ----------------------------------------------------------------------
       1. Initialize AOS (Animate On Scroll) Library
       ---------------------------------------------------------------------- */
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 700,
            easing: 'ease-out-cubic',
            once: true,
            offset: 60,
            disable: false
        });
    }

    /* ----------------------------------------------------------------------
       2. Initialize Feather Icons
       ---------------------------------------------------------------------- */
    if (typeof feather !== 'undefined') {
        feather.replace();
    }

    /* ----------------------------------------------------------------------
       3. Mobile Navigation Menu Toggle
       ---------------------------------------------------------------------- */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('active');
            mobileToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
            
            // Toggle icon between menu and x
            const iconName = isActive ? 'x' : 'menu';
            mobileToggle.innerHTML = `<i data-feather="${iconName}"></i>`;
            feather.replace();
        });

        // Close mobile menu when a nav link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileToggle.innerHTML = `<i data-feather="menu"></i>`;
                    feather.replace();
                }
            });
        });
    }

    /* ----------------------------------------------------------------------
       4. Navbar Scroll State
       ---------------------------------------------------------------------- */
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ----------------------------------------------------------------------
       5. Active Navigation Link ScrollSpy
       ---------------------------------------------------------------------- */
    const sections = document.querySelectorAll('section[id]');

    function scrollSpy() {
        const scrollY = window.pageYOffset;
        const navHeight = 80;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - navHeight - 50;
            const sectionId = current.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

            if (correspondingLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    correspondingLink.classList.add('active');
                } else {
                    correspondingLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', scrollSpy);

    /* ----------------------------------------------------------------------
       6. Copy Email to Clipboard
       ---------------------------------------------------------------------- */
    const btnCopyEmail = document.getElementById('btn-copy-email');
    const emailAddress = document.getElementById('email-address');
    const copyText = document.getElementById('copy-text');

    if (btnCopyEmail && emailAddress) {
        btnCopyEmail.addEventListener('click', async () => {
            const textToCopy = emailAddress.innerText.trim();

            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(textToCopy);
                } else {
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = textToCopy;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                }

                // Show feedback
                copyText.innerText = 'Copied!';
                btnCopyEmail.style.backgroundColor = 'var(--status-green-bg)';
                btnCopyEmail.style.borderColor = 'rgba(16, 185, 129, 0.3)';
                btnCopyEmail.style.color = '#065f46';

                setTimeout(() => {
                    copyText.innerText = 'Copy';
                    btnCopyEmail.style.backgroundColor = '';
                    btnCopyEmail.style.borderColor = '';
                    btnCopyEmail.style.color = '';
                }, 2000);

            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        });
    }

    /* ----------------------------------------------------------------------
       7. Contact Form Handling
       ---------------------------------------------------------------------- */
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('form-submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Disable submit button temporarily
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.7';
                submitBtn.querySelector('span').innerText = 'Sending...';
            }

            // Simulate form submission delay
            setTimeout(() => {
                contactForm.reset();

                if (formStatus) {
                    formStatus.className = 'form-status success';
                    formStatus.innerText = 'Thank you! Your message has been received.';
                }

                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.querySelector('span').innerText = 'Send Message';
                }

                setTimeout(() => {
                    if (formStatus) {
                        formStatus.innerText = '';
                        formStatus.className = 'form-status';
                    }
                }, 5000);
            }, 1000);
        });
    }

});
