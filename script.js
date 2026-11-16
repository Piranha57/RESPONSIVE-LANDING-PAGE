document.addEventListener('DOMContentLoaded', () => {
            const header = document.getElementById('siteHeader');
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const mobileNavDrawer = document.getElementById('mobileNavDrawer');
            const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
            const actionModal = document.getElementById('actionModal');
            const closeModalBtn = document.getElementById('closeModalBtn');
            const leadForm = document.getElementById('leadForm');
            const toast = document.getElementById('toastNotification');
            const toastMessage = document.getElementById('toastMessage');

            // 1. Sticky Header Shadow on Scroll
            window.addEventListener('scroll', () => {
                if (window.scrollY > 12) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });

            // 2. Toggle Mobile Navigation Drawer
            function toggleMobileMenu() {
                const isOpen = mobileNavDrawer.classList.toggle('open');
                mobileMenuBtn.classList.toggle('active', isOpen);
                mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
            }

            mobileMenuBtn.addEventListener('click', toggleMobileMenu);

            // Close mobile drawer when a link is clicked
            mobileNavItems.forEach(link => {
                link.addEventListener('click', () => {
                    mobileNavDrawer.classList.remove('open');
                    mobileMenuBtn.classList.remove('active');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                });
            });

            // Close mobile drawer on window resize above mobile breakpoint
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768 && mobileNavDrawer.classList.contains('open')) {
                    mobileNavDrawer.classList.remove('open');
                    mobileMenuBtn.classList.remove('active');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
            });

            // 3. Modal Controls (Accessible & Custom)
            window.openModal = function(titleText) {
                // Close mobile menu if open
                mobileNavDrawer.classList.remove('open');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');

                document.getElementById('modalTitle').textContent = titleText;
                actionModal.classList.add('open');
                document.getElementById('userName').focus();
            };

            document.querySelectorAll('[data-modal-title]').forEach(button => {
                button.addEventListener('click', () => {
                    window.openModal(button.getAttribute('data-modal-title'));
                });
            });

            function closeModal() {
                actionModal.classList.remove('open');
            }

            closeModalBtn.addEventListener('click', closeModal);

            actionModal.addEventListener('click', (e) => {
                if (e.target === actionModal) closeModal();
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && actionModal.classList.contains('open')) {
                    closeModal();
                }
            });

            // 4. Form Submission with Toast Notification
            leadForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('userName').value.trim();
                closeModal();
                leadForm.reset();

                toastMessage.textContent = `Thanks, ${name || 'there'}! Your workspace link is on the way.`;
                toast.classList.add('show');

                setTimeout(() => {
                    toast.classList.remove('show');
                }, 4000);
            });
        });
