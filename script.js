/* ==========================================================================
   PREMIUM GLASSMORPHISM PORTFOLIO v3 — JAVASCRIPT
   AOS · Feather Icons · Left Drawer · Parallax · Shrink Navbar
   ScrollSpy · Copy Email · Contact Form
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ------------------------------------------------------------------
       1. AOS
    ------------------------------------------------------------------ */
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 720, easing: 'ease-out-cubic', once: true, offset: 55 });
    }

    /* ------------------------------------------------------------------
       2. Feather Icons
    ------------------------------------------------------------------ */
    function initFeather() {
        if (typeof feather !== 'undefined') feather.replace();
    }
    initFeather();

    /* ------------------------------------------------------------------
       3. LEFT DRAWER MOBILE NAV
    ------------------------------------------------------------------ */
    const mobileToggle  = document.getElementById('mobile-toggle');
    const mobileDrawer  = document.getElementById('mobile-drawer');
    const drawerOverlay = document.getElementById('drawer-overlay');
    const drawerClose   = document.getElementById('drawer-close');
    const drawerLinks   = document.querySelectorAll('.drawer-link');

    function openDrawer() {
        mobileDrawer.classList.add('open');
        drawerOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'true');
    }

    function closeDrawer() {
        mobileDrawer.classList.remove('open');
        drawerOverlay.classList.remove('active');
        document.body.style.overflow = '';
        if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
    }

    if (mobileToggle)   mobileToggle.addEventListener('click', () => mobileDrawer.classList.contains('open') ? closeDrawer() : openDrawer());
    if (drawerClose)    drawerClose.addEventListener('click', closeDrawer);
    if (drawerOverlay)  drawerOverlay.addEventListener('click', closeDrawer);
    drawerLinks.forEach(l => l.addEventListener('click', closeDrawer));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

    /* ------------------------------------------------------------------
       4. NAVBAR — Sticky Centered 1400px (No scroll resize effect)
    ------------------------------------------------------------------ */
    const navbar = document.getElementById('navbar');

    /* ------------------------------------------------------------------
       5. PARALLAX — Orbs & Sections
    ------------------------------------------------------------------ */
    const parallaxOrbs       = document.querySelectorAll('.parallax-orb');
    const parallaxBgSections = document.querySelectorAll('[data-parallax-bg]');

    function handleParallax() {
        const scrollY = window.pageYOffset;

        parallaxOrbs.forEach(orb => {
            const speed = parseFloat(orb.getAttribute('data-parallax-speed')) || 0.1;
            orb.style.transform = `translateY(${scrollY * speed}px)`;
        });

        parallaxBgSections.forEach(section => {
            const top    = section.getBoundingClientRect().top + scrollY;
            const height = section.offsetHeight;
            if (scrollY + window.innerHeight > top && scrollY < top + height) {
                const yPos = (scrollY - top) * 0.28;
                section.style.backgroundPositionY = `calc(50% + ${yPos}px)`;
            }
        });
    }

    window.addEventListener('scroll', handleParallax, { passive: true });
    handleParallax();

    /* ------------------------------------------------------------------
       6. SCROLLSPY
    ------------------------------------------------------------------ */
    const sections  = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-link');
    const dLinks    = document.querySelectorAll('.drawer-link');

    function scrollSpy() {
        const scrollY   = window.pageYOffset;
        const navH      = 90;

        sections.forEach(section => {
            const top    = section.offsetTop - navH - 40;
            const height = section.offsetHeight;
            const id     = section.getAttribute('id');
            const active = scrollY >= top && scrollY < top + height;

            navLinks.forEach(l => { if (l.getAttribute('href') === `#${id}`) l.classList.toggle('active', active); });
            dLinks.forEach(l   => { if (l.getAttribute('href') === `#${id}`) l.classList.toggle('active', active); });
        });
    }

    window.addEventListener('scroll', scrollSpy, { passive: true });
    scrollSpy();

    /* ------------------------------------------------------------------
       7. COPY EMAIL & PHONE
    ------------------------------------------------------------------ */
    const btnCopy      = document.getElementById('btn-copy-email');
    const emailEl      = document.getElementById('email-address');
    const copyTextEl   = document.getElementById('copy-text');

    if (btnCopy && emailEl) {
        btnCopy.addEventListener('click', async () => {
            const text = emailEl.innerText.trim();
            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(text);
                } else {
                    const ta = document.createElement('textarea');
                    ta.value = text;
                    document.body.appendChild(ta);
                    ta.select();
                    document.execCommand('copy');
                    document.body.removeChild(ta);
                }
                btnCopy.classList.add('copied');
                if (copyTextEl) copyTextEl.innerText = 'Copied!';
                btnCopy.style.color        = '#059669';
                btnCopy.style.borderColor  = 'rgba(5,150,105,0.4)';
                setTimeout(() => {
                    btnCopy.classList.remove('copied');
                    if (copyTextEl) copyTextEl.innerText = 'Copy';
                    btnCopy.style.color       = '';
                    btnCopy.style.borderColor = '';
                }, 2200);
            } catch (err) {
                console.error('Copy failed:', err);
            }
        });
    }

    const btnCopyPhone = document.getElementById('btn-copy-phone');
    const phoneEl      = document.getElementById('phone-number');
    const copyPhoneEl  = document.getElementById('copy-phone-text');

    if (btnCopyPhone && phoneEl) {
        btnCopyPhone.addEventListener('click', async () => {
            const text = phoneEl.innerText.trim();
            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(text);
                } else {
                    const ta = document.createElement('textarea');
                    ta.value = text;
                    document.body.appendChild(ta);
                    ta.select();
                    document.execCommand('copy');
                    document.body.removeChild(ta);
                }
                btnCopyPhone.classList.add('copied');
                if (copyPhoneEl) copyPhoneEl.innerText = 'Copied!';
                btnCopyPhone.style.color        = '#059669';
                btnCopyPhone.style.borderColor  = 'rgba(5,150,105,0.4)';
                setTimeout(() => {
                    btnCopyPhone.classList.remove('copied');
                    if (copyPhoneEl) copyPhoneEl.innerText = 'Copy';
                    btnCopyPhone.style.color       = '';
                    btnCopyPhone.style.borderColor = '';
                }, 2200);
            } catch (err) {
                console.error('Copy phone failed:', err);
            }
        });
    }

    /* ------------------------------------------------------------------
       8. CONTACT FORM
    ------------------------------------------------------------------ */
    const contactForm = document.getElementById('contact-form');
    const formStatus  = document.getElementById('form-status');
    const submitBtn   = document.getElementById('form-submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.7';
                const span = submitBtn.querySelector('span');
                if (span) span.innerText = 'Sending…';
            }

            setTimeout(() => {
                contactForm.reset();

                if (formStatus) {
                    formStatus.className = 'form-status success';
                    formStatus.innerText = '✓ Thank you! Message received. I\'ll be in touch soon.';
                }

                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    const span = submitBtn.querySelector('span');
                    if (span) span.innerText = 'Send Message';
                }

                setTimeout(() => {
                    if (formStatus) { formStatus.innerText = ''; formStatus.className = 'form-status'; }
                }, 6000);
            }, 1100);
        });
    }});
