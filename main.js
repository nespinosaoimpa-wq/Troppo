document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Logic
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });

    mobileMenuClose.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
    });

    // Reveal on Scroll
    const observerOptions = {
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // Cart Notification Logic
    const addCartButtons = document.querySelectorAll('.btn-add-cart');
    const cartNotification = document.getElementById('cart-notification');

    addCartButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            cartNotification.classList.remove('translate-y-20', 'opacity-0');
            cartNotification.classList.add('translate-y-0', 'opacity-100');

            setTimeout(() => {
                cartNotification.classList.add('translate-y-20', 'opacity-0');
                cartNotification.classList.remove('translate-y-0', 'opacity-100');
            }, 3000);
        });
    });

    // Wholesale Form Logic
    const wholesaleForm = document.getElementById('wholesale-form');
    const formSuccess = document.getElementById('form-success');

    if (wholesaleForm) {
        wholesaleForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple validation check
            const name = document.getElementById('form-name').value;
            const whatsapp = document.getElementById('form-whatsapp').value;

            if (name && whatsapp) {
                wholesaleForm.classList.add('hidden');
                formSuccess.classList.remove('hidden');
            }
        });
    }

    // Location Interactive List
    const locationItems = document.querySelectorAll('.location-item');
    const mapMarker = document.getElementById('map-marker');
    const mapPointsContainer = document.getElementById('map-points-container');

    // Render static dots for all locations
    if (mapPointsContainer) {
        locationItems.forEach(item => {
            const x = item.dataset.x;
            const y = item.dataset.y;
            const point = document.createElement('div');
            point.className = 'absolute w-2 h-2 bg-primary/40 rounded-full -translate-x-1/2 -translate-y-1/2 hover:scale-150 transition-transform';
            point.style.left = `${x}%`;
            point.style.top = `${y}%`;
            mapPointsContainer.appendChild(point);
        });
    }

    locationItems.forEach(item => {
        item.addEventListener('click', () => {
            // Update UI list items
            locationItems.forEach(i => i.classList.remove('bg-white/10', 'border-white/10'));
            locationItems.forEach(i => i.classList.add('border-transparent'));

            item.classList.add('bg-white/10', 'border-white/10');
            item.classList.remove('border-transparent');

            // Move Marker
            const x = item.dataset.x;
            const y = item.dataset.y;

            if (mapMarker) {
                mapMarker.style.left = `${x}%`;
                mapMarker.style.top = `${y}%`;

                // Visual feedback "ping" logic already handled by CSS animation in index.html
                // plus a manual scale boost
                mapMarker.classList.add('scale-125');
                setTimeout(() => {
                    mapMarker.classList.remove('scale-125');
                }, 700);
            }
        });
    });
});

// Exposed Global functions
window.resetForm = function () {
    const wholesaleForm = document.getElementById('wholesale-form');
    const formSuccess = document.getElementById('form-success');

    wholesaleForm.reset();
    wholesaleForm.classList.remove('hidden');
    formSuccess.classList.add('hidden');
};
