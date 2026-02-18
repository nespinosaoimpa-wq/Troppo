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
    const mapImg = document.getElementById('map-img');
    const mapMarker = document.getElementById('map-marker');

    locationItems.forEach(item => {
        item.addEventListener('click', () => {
            // Update UI
            locationItems.forEach(i => i.classList.remove('bg-white/10', 'border-white/10'));
            locationItems.forEach(i => i.classList.add('border-transparent'));
            
            item.classList.add('bg-white/10', 'border-white/10');
            item.classList.remove('border-transparent');

            // Simulate Map Pan
            const lat = parseFloat(item.dataset.lat);
            const lng = parseFloat(item.dataset.lng);
            
            // Just a visual feedback for simulation
            mapMarker.classList.add('scale-150', 'text-accent');
            setTimeout(() => {
                mapMarker.classList.remove('scale-150', 'text-accent');
            }, 500);
        });
    });
});

// Exposed Global functions
window.resetForm = function() {
    const wholesaleForm = document.getElementById('wholesale-form');
    const formSuccess = document.getElementById('form-success');
    
    wholesaleForm.reset();
    wholesaleForm.classList.remove('hidden');
    formSuccess.classList.add('hidden');
};
