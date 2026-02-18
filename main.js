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
    window.mapMarkers = [];

    // Google Maps Initialization
    window.initMap = function () {
        const defaultCenter = { lat: -31.6373087, lng: -60.6986888 }; // Troppo Francia

        window.map = new google.maps.Map(document.getElementById("google-map"), {
            zoom: 13,
            center: defaultCenter,
            styles: [
                { "featureType": "all", "elementType": "all", "stylers": [{ "saturation": -100 }] },
                { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#1E4B99" }, { "visibility": "on" }] }
            ],
            disableDefaultUI: true,
            zoomControl: true
        });

        const infoWindow = new google.maps.InfoWindow();

        locationItems.forEach((item, index) => {
            const lat = parseFloat(item.dataset.lat);
            const lng = parseFloat(item.dataset.lng);
            const title = item.querySelector('p.font-bold').innerText;

            const marker = new google.maps.Marker({
                position: { lat, lng },
                map: window.map,
                title: title,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 8,
                    fillColor: "#D4AF37",
                    fillOpacity: 1,
                    strokeWeight: 2,
                    strokeColor: "#FFFFFF"
                }
            });

            window.mapMarkers.push(marker);

            marker.addListener("click", () => {
                window.map.panTo(marker.getPosition());
                window.map.setZoom(16);
                infoWindow.setContent(`<div class="p-2 pt-0"><b class="text-primary font-display">${title}</b></div>`);
                infoWindow.open(window.map, marker);

                // Highlight item in list
                highlightLocationItem(item);
            });
        });
    };

    function highlightLocationItem(item) {
        locationItems.forEach(i => i.classList.remove('bg-white/10', 'border-white/10'));
        locationItems.forEach(i => i.classList.add('border-transparent'));
        item.classList.add('bg-white/10', 'border-white/10');
        item.classList.remove('border-transparent');
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    locationItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            highlightLocationItem(item);

            // Pan map to marker if active
            if (window.map && window.mapMarkers[index]) {
                const marker = window.mapMarkers[index];
                window.map.panTo(marker.getPosition());
                window.map.setZoom(16);
                google.maps.event.trigger(marker, 'click');
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
