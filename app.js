// State Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let appliedPromo = JSON.parse(localStorage.getItem('appliedPromo')) || null;
let fulfillmentMethod = localStorage.getItem('fulfillmentMethod') || 'Pickup';
let rentalDays = parseInt(localStorage.getItem('rentalDays')) || 1;
let searchQuery = '';

function saveCart(skipRouter = false) {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('appliedPromo', JSON.stringify(appliedPromo));
    localStorage.setItem('fulfillmentMethod', fulfillmentMethod);
    localStorage.setItem('rentalDays', rentalDays);
    updateCartBadge();
    if (!skipRouter) {
        if (window.location.hash === '#cart' || window.location.hash === '#checkout') {
            if (typeof router === 'function') router(true);
        } else if (window.location.hash === '#rentals') {
            if (typeof refreshRentalsUI === 'function') refreshRentalsUI();
        }
    }
}

window.handleSearch = (e) => {
    // Handle both input events and form submit events
    const val = e.target.value !== undefined ? e.target.value : (e.target.querySelector ? e.target.querySelector('input').value : searchQuery);
    searchQuery = val.toLowerCase();
    if (window.refreshRentalsUI) window.refreshRentalsUI();
};

window.changeQty = (id, change) => updateQuantity(id, change);
window.setQty = (id, qty) => setQuantity(id, qty);
window.removeItem = (id) => removeFromCart(id);
window.handleClearCart = () => clearCart();
window.setRentalDays = (days) => {
    rentalDays = parseInt(days) || 1;
    if (rentalDays < 1) rentalDays = 1;
    saveCart();
};

window.refreshRentalsUI = () => {
    const grid = document.getElementById('rentals-grid');
    if (!grid) return;
    
    const filtered = rentalItems.filter(item => {
        const title = item.title.toLowerCase();
        const desc = (item.desc || "").toLowerCase();
        const category = (item.category || "").toLowerCase();
        const q = searchQuery.toLowerCase().trim();

        if (!q) return true;

        // Direct match
        if (title.includes(q) || desc.includes(q) || category.includes(q)) return true;

        // Plural fallback: if search is "chairs", also check for "chair"
        if (q.endsWith('s') && q.length > 3) {
            const singular = q.slice(0, -1);
            if (title.includes(singular) || desc.includes(singular) || category.includes(singular)) return true;
        }

        return false;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem 2rem;">
                <i data-feather="search" style="width: 48px; height: 48px; color: var(--border-color); margin-bottom: 1rem;"></i>
                <h3 style="color: var(--text-secondary);">No items found for "${searchQuery}"</h3>
                <p style="color: var(--text-secondary); margin-top: 0.5rem;">Try searching for something else or browse all categories.</p>
            </div>
        `;
        if (window.feather) feather.replace();
        return;
    }

    grid.innerHTML = filtered.map(item => {
        const cartItem = cart.find(i => i.id === item.id);
        const qty = cartItem ? cartItem.quantity : 0;
        
        let actionHtml = '';
        if (qty > 0) {
            actionHtml = `
                <div class="quantity-controls" style="background: var(--bg-color); border: 1px solid var(--border-color); display: inline-flex;">
                    <button class="quantity-btn" onclick="changeQty(${item.id}, -1)" aria-label="Decrease quantity for ${item.title.replace(/"/g, '&quot;')}">-</button>
                    <input type="number" min="0" value="${qty}" aria-label="Quantity for ${item.title.replace(/"/g, '&quot;')}" style="width: 40px; text-align: center; background: transparent; border: none; color: var(--text-primary); font-family: var(--font-family); font-size: 1rem; -moz-appearance: textfield;" onchange="setQty(${item.id}, this.value)">
                    <button class="quantity-btn" onclick="changeQty(${item.id}, 1)" aria-label="Increase quantity for ${item.title.replace(/"/g, '&quot;')}">+</button>
                </div>
            `;
        } else {
            actionHtml = `<button class="btn btn-primary" style="width: 100%;" onclick="handleAddToCart(${item.id})">Add to Request</button>`;
        }

        let priceDisplay = typeof item.price === 'number' ? `$${item.price}` : item.price;
        let priceStyle = '';
        if (item.id === 4) {
            priceDisplay = `$2.00 (<30)<br/>$1.50 (30+)`;
            priceStyle = 'font-size: 0.85em; line-height: 1.2; text-align: left;';
        }

        return `
            <div class="card product-card">
                <div class="card-img-wrapper" style="position: relative; cursor: pointer;" onclick="document.getElementById('image-modal').classList.add('active'); document.getElementById('modal-img').src='${item.img}'; document.body.style.overflow='hidden';">
                    <img loading="lazy" src="${item.img}" alt="${item.title}">
                    <div class="quick-view-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.4); display: flex; justify-content: center; align-items: center; opacity: 0; transition: opacity 0.3s; color: white; font-weight: bold; font-size: 1.1rem; border-radius: 12px 12px 0 0;">
                        <i data-feather="zoom-in" style="margin-right: 8px;"></i> Quick View
                    </div>
                </div>
                <div class="card-body">
                    <h3 class="card-title">${item.title}</h3>
                    <p class="card-desc" style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem;">${item.desc || ''}</p>
                    <div class="card-footer" style="display: flex; justify-content: space-between; align-items: center; margin-top: auto;">
                        <span class="price" style="${priceStyle}">${priceDisplay}</span>
                        <div id="action-controls-${item.id}">${actionHtml}</div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    if (window.feather) feather.replace();

    const stickyCart = document.getElementById('sticky-view-cart');
    if (stickyCart) {
        if (cart.length > 0) {
            stickyCart.style.display = 'block';
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            const btn = stickyCart.querySelector('a');
            if (btn) btn.textContent = `View Cart (${totalItems} item${totalItems !== 1 ? 's' : ''})`;
        } else {
            stickyCart.style.display = 'none';
        }
    }
};

function showToast(message, showCartLink = false) {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    let html = `<i data-feather="check-circle" style="color: var(--primary-color)"></i> <span>${message}</span>`;
    if (showCartLink) {
        html += ` <a href="#cart" style="color: var(--primary-color); margin-left: auto; font-weight: bold; text-decoration: underline;">View Cart</a>`;
    }
    toast.innerHTML = html;

    container.appendChild(toast);
    if (window.feather) feather.replace();

    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 3000);
}

function addToCart(item) {
    const existing = cart.find(i => i.id === item.id);
    if (existing) {
        existing.quantity += 1;
        showToast(`1 more ${item.title} added to cart. Total: ${existing.quantity}`, true);
    } else {
        cart.push({ ...item, quantity: 1 });
        showToast(`Added ${item.title} to cart!`, true);
    }
    saveCart();
}

function getItemPrice(item) {
    if (item.id === 4 && item.quantity >= 30) {
        return 1.5;
    }
    return item.price;
}

function getItemTotal(item) {
    return getItemPrice(item) * item.quantity * rentalDays;
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + getItemTotal(item), 0);
}

function getDynamicRecommendations() {
    if (cart.length === 0) return rentalItems.slice(0, 5);

    const cartTitles = cart.map(item => item.title.toLowerCase());
    const cartCategories = [];
    
    if (cartTitles.some(t => t.includes('grad'))) cartCategories.push('grad');
    if (cartTitles.some(t => t.includes('baby') || t.includes('seemantham'))) cartCategories.push('baby');
    if (cartTitles.some(t => t.includes('wedding') || t.includes('centerpiece'))) cartCategories.push('wedding');
    if (cartTitles.some(t => t.includes('neon'))) cartCategories.push('neon');

    let recommendations = rentalItems.filter(item => {
        const inCart = cart.some(c => c.id === item.id);
        if (inCart) return false;

        const title = item.title.toLowerCase();
        return cartCategories.some(cat => {
            if (cat === 'grad') return title.includes('grad') || title.includes('marquee');
            if (cat === 'baby') return title.includes('baby') || title.includes('seemantham') || title.includes('chair');
            if (cat === 'wedding') return title.includes('wedding') || title.includes('centerpiece') || title.includes('tent');
            if (cat === 'neon') return title.includes('neon') || title.includes('vibes');
            return false;
        });
    });

    if (recommendations.length < 4) {
        const general = rentalItems.filter(item => 
            !cart.some(c => c.id === item.id) && 
            !recommendations.some(r => r.id === item.id)
        );
        recommendations = [...recommendations, ...general];
    }

    return recommendations.slice(0, 5);
}

function getDiscount() {
    if (!appliedPromo) return 0;
    const subtotal = getCartTotal();
    const promo = PROMOS[appliedPromo];
    if (promo && subtotal >= promo.min) {
        return promo.discount;
    }
    return 0;
}

const PROMOS = {
    'PETALS5': { min: 100, discount: 5 },
    'PETALS10': { min: 150, discount: 10 },
    'PETALS15': { min: 200, discount: 15 },
    'PETALS20': { min: 300, discount: 20 }
};

function applyPromoCode(code) {
    const subtotal = getCartTotal();
    const promo = PROMOS[code.toUpperCase()];
    if (promo) {
        if (subtotal >= promo.min) {
            appliedPromo = code.toUpperCase();
            saveCart();
            showToast(`Promo ${appliedPromo} applied! $${promo.discount} off.`);
        } else {
            showToast(`Min. order for ${code} is $${promo.min}. (Excl. delivery)`);
        }
    } else {
        showToast('Invalid promo code.');
    }
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart();
}

function clearCart() {
    if (confirm('Are you sure you want to clear your entire cart?')) {
        cart = [];
        saveCart();
        showToast('Cart cleared.');
    }
}

function updateQuantity(id, change) {
    const item = cart.find(i => i.id === id);
    if (item) {
        const oldQty = item.quantity;
        item.quantity += change;
        if (item.quantity <= 0) {
            const itemName = item.title;
            removeFromCart(id);
            showToast(`Removed ${itemName} from cart.`);
        } else {
            saveCart();
            const diff = Math.abs(change);
            if (change > 0) {
                showToast(`${diff} item${diff > 1 ? 's' : ''} added for ${item.title}. Total: ${item.quantity}`, true);
            } else {
                showToast(`${diff} item${diff > 1 ? 's' : ''} removed for ${item.title}. Total: ${item.quantity}`);
            }
        }
    }
}

function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    if (badge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function setQuantity(id, newQty) {
    const qty = parseInt(newQty, 10);
    if (isNaN(qty)) return;

    const item = cart.find(i => i.id === id);
    if (!item) return;

    if (qty <= 0) {
        const itemName = item.title;
        removeFromCart(id);
        showToast(`Removed ${itemName} from cart.`);
        return;
    }

    const oldQty = item.quantity;
    if (qty === oldQty) return;

    item.quantity = qty;
    saveCart();
    
    const diff = Math.abs(qty - oldQty);
    if (qty > oldQty) {
        showToast(`${diff} more ${item.title} added to cart. Total: ${qty}`, true);
    } else {
        showToast(`${diff} ${item.title} removed from cart. Total: ${qty}`);
    }
}

// Data
const rentalItems = [
    { id: 1, title: 'Round Fold-In-Half Table', price: 12, img: './wp-content/uploads/2025/05/Screen-Shot-2025-05-12-at-5.19.35-PM.png', desc: 'Perfect Table to match any occasion and theme (60" x 29.8").' },
    { id: 2, title: 'Cocktail Table (With Cloths)', price: 11, img: './wp-content/uploads/2025/12/image.png', desc: 'Elegant cocktail tables with black/white cloths.' },
    { id: 3, title: 'Adult Rectangular Folding Table Rental', price: 8, img: './wp-content/uploads/2025/04/Tables.webp', desc: 'Perfect seating to match any occasion and theme.' },
    { id: 4, title: 'Adult Folding Chair', price: 2, img: './wp-content/uploads/2025/04/Chairs.webp', desc: 'Perfect seating for any occasion. Note: Bulk discount! $1.50 each when renting 30 or more.' },
    { id: 5, title: 'Wedding Tent (16x26)', price: 150, img: './wp-content/uploads/2026/04/image.png', desc: 'Light weight yet sturdy, high quality yet affordable tent.' },
    { id: 6, title: 'Round Cylinder Pedestal Display', price: 30, img: './wp-content/uploads/2025/05/Screen-Shot-2025-05-11-at-9.53.07-PM.png', desc: 'Set of 5 pedestals with gold/white covers for grand displays.' },
    { id: 7, title: 'Buffet Food Warmers', price: 10, img: './wp-content/uploads/2025/04/Buffet-Food-Warmers.webp', desc: 'Let your guests enjoy every bite at the perfect temperature.' },
    { id: 8, title: 'Loveseat for rental', price: 100, img: './wp-content/uploads/2026/03/IMG_1048-scaled.jpg', desc: 'Perfect for parties, baby showers, weddings, and more. Visit our website to explore our full range of rental items.' },
    { id: 9, title: 'Elegant Hand-Carved Accent Chair', price: 75, img: './wp-content/uploads/2025/12/IMG_0755-1-scaled.jpg', desc: 'Perfect as accent seating for special event décor or baby showers.' },
    { id: 10, title: 'Haldi Urli`s', price: 125, img: './wp-content/uploads/2025/09/image-edited.png', desc: 'Haldi / Maiyan Tub / Urli. Vibrant and traditional backdrops.' },
    { id: 11, title: 'Pipe and Drape Backdrop Stand', price: 50, img: './wp-content/uploads/2025/04/image-10.png', desc: 'Heavy Duty Double Crossbar Stand for Trade Shows and Decor.' },
    { id: 12, title: 'GRAD Marquee Letters', price: 40, img: './wp-content/uploads/2025/12/image-1.png', desc: 'Lighted GRAD marquee letters for rent.' },
    { id: 13, title: '4FT Marquee Numbers', price: 20, img: './wp-content/uploads/2025/07/image-7.png', desc: 'Giant Marquee Numbers for birthdays, anniversaries, or graduations.' },
    { id: 14, title: 'Photo/Any Event Backdrop', price: 150, img: './wp-content/uploads/2025/06/image-2.png', desc: 'Celebrate the beauty of your Mehendi ceremony with our elegant and artistic backdrops, perfect for creating a stunning photo-worthy setting.' },
    { id: 15, title: 'New Born Baby Photo Prop', price: 20, img: './wp-content/uploads/2025/05/Baby-backdrop-1-scaled.jpg', desc: 'Dreamy Moon Swing Photo Prop for cozy gatherings.' },
    { id: 16, title: 'Custom Graduation Setup', price: 'Varies', img: './wp-content/uploads/2025/07/IMG_9906-1-scaled.jpg', desc: 'Personalized graduation decor setup tailored to your school colors and theme. Contact us for a quote.' },
    { id: 17, title: 'Premium GRAD Decor', price: 'Varies', img: './wp-content/uploads/2025/07/IMG_9901-1-scaled.jpg', desc: 'Exquisite graduation celebration setup with premium backdrops and floral arrangements. Price varies by request.' },
    { id: 18, title: 'Seemantham/Baby Shower Backdrop', price: 150, img: './wp-content/uploads/2025/07/Seemantham-2.jpg', desc: 'Traditional Seemantham or Baby Shower backdrop for your special occasion.' },
    { id: 19, title: 'VEVOR Metal Wedding Centerpiece (2PCS)', price: 25, img: './wp-content/uploads/2025/04/image-19-908x1024.png', desc: 'Gold crystal metal centerpiece (55cm / 21.65\") - Set of 2 pieces.' },
    { id: 20, title: 'Happy Birthday Neon Sign', price: 10, img: './wp-content/uploads/2025/05/HBD.jpg', desc: 'Bright and festive Happy Birthday neon sign to light up your party.' },
    { id: 21, title: 'Good Vibes Only Neon Sign', price: 10, img: './wp-content/uploads/2025/07/image-5.png', desc: 'Trendy \"Good Vibes Only\" neon sign for a modern event feel.' },
    { id: 22, title: 'Congrats Grad Neon Sign', price: 10, img: './wp-content/uploads/2025/07/81i8bvay0GL._AC_SX679_.jpg', desc: 'Celebratory Congrats Grad neon sign - perfect for Class of 2026 parties!' },
    { id: 23, title: 'Mehandi Umbrella Set', price: 3, img: './wp-content/uploads/2025/05/Umbrella.jpg', desc: 'Colorful traditional umbrellas for Mehandi or festive ceremonies ($3 each).' },
    { id: 24, title: 'Easel for Rent', price: 10, img: './wp-content/uploads/2025/09/gold-litton-lane-boards-easels-27391-64_600.jpg', desc: 'Elegant gold easel for displaying welcome signs or photos.' }
];

const services = [
    { title: 'Wedding Party', desc: 'From breathtaking floral arrangements to elegant backdrops, we craft the perfect ambiance for your special day.', img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80' },
    { title: 'HouseWarming', desc: 'Elegant décor and personalized styling for your housewarming party, creating a warm and welcoming ambiance.', img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80' },
    { title: 'Birthday Party', desc: 'From vibrant balloon garlands to elegant tablescapes, we create magical setups tailored to your theme.', img: './wp-content/uploads/2025/12/IMG_0670-2-scaled.jpg' },
    { title: 'Baby Shower', desc: 'Dreamy and elegant décor featuring soft pastels, enchanting backdrops, and custom-themed setups.', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80' },
    { title: 'Haldi / Mehandi Parties', desc: 'Vibrant and traditional décor with beautiful backdrops, marigold arrangements, and artistic seating for your special ceremonies.', img: './wp-content/uploads/2025/05/Haldi-backdrop-3-2-scaled.jpg' },
    { title: 'Festival Parties & Events', desc: 'Celebrate Diwali, Eid, Christmas, or any festive occasion with our specialized themed décor and lighting solutions.', img: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=800&q=80' }
];

// Rendering Layout
function renderBanner() {
    const banner = document.getElementById('top-banner');
    if (!banner) return;

    banner.innerHTML = `
        <div class="promo-banner">
            <div class="ticker-wrap">
                <div class="ticker">
                    <span class="ticker-item">📞 QUESTIONS? CALL US AT +1 848-448-6993</span>
                    <span class="ticker-item">✨ EXCLUSIVE GRAD DECOR NOW AVAILABLE! ✨</span>
                    <span class="ticker-item">🎊 <a href="#graduation">EXPLORE GRAD COLLECTION</a> 🎊</span>
                    <span class="ticker-item">🚚 WE OFFER DELIVERY & PICKUP OPTIONS! 🚚</span>
                    <!-- Duplicate for seamless loop -->
                    <span class="ticker-item">🎓 CONGRATULATIONS CLASS OF 2026! 🎓</span>
                    <span class="ticker-item">📞 QUESTIONS? CALL US AT +1 848-448-6993</span>
                    <span class="ticker-item">✨ EXCLUSIVE GRAD DECOR NOW AVAILABLE! ✨</span>
                    <span class="ticker-item">🎊 <a href="#graduation">EXPLORE GRAD COLLECTION</a> 🎊</span>
                </div>
            </div>
        </div>
    `;
}

function renderNavbar() {
    const nav = document.getElementById('navbar');
    nav.innerHTML = `
        <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Open navigation menu">
            <i data-feather="menu"></i>
        </button>
        <a href="#" class="logo-text">Petals Paradise Events</a>
        <div class="nav-links">
            <a href="#" class="nav-link">Home</a>
            <a href="#rentals" class="nav-link">Rentals</a>
            <a href="#graduation" class="nav-link" style="color: #f1c40f; font-weight: 700;">GRAD 2026</a>
            <a href="#services" class="nav-link">Services</a>
            <a href="#videos" class="nav-link">Videos</a>
            <a href="#gallery" class="nav-link">Gallery</a>
            <a href="#contact" class="nav-link">Contact Us</a>
        </div>
        <a href="#cart" class="cart-icon-container" aria-label="View cart with ${cart.reduce((sum, item) => sum + item.quantity, 0)} items">
            <i data-feather="shopping-bag"></i>
            <span id="cart-badge" class="cart-badge">0</span>
        </a>
        
        <!-- Mobile Menu Overlay -->
        <div class="mobile-menu" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Mobile navigation">
            <button class="mobile-menu-close" id="mobile-menu-close" aria-label="Close navigation menu">
                <i data-feather="x"></i>
            </button>
            <a href="#" class="nav-link">Home</a>
            <a href="#rentals" class="nav-link">Rentals</a>
            <a href="#graduation" class="nav-link" style="color: #f1c40f;">GRAD 2026</a>
            <a href="#services" class="nav-link">Services</a>
            <a href="#videos" class="nav-link">Videos</a>
            <a href="#gallery" class="nav-link">Gallery</a>
            <a href="#contact" class="nav-link">Contact Us</a>
        </div>
    `;
    feather.replace();
    updateCartBadge();

    // Toggle Mobile Menu
    const menuBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && closeBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => mobileMenu.classList.add('active'));
        closeBtn.addEventListener('click', () => mobileMenu.classList.remove('active'));
        
        // Close menu on link click
        mobileMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => mobileMenu.classList.remove('active'));
        });
    }
}

function renderFooter() {
    const footer = document.getElementById('footer');
    footer.innerHTML = `
        <div class="footer-grid">
            <div class="footer-col">
                <h3>Petals Paradise Events</h3>
                <p>Crafting Unforgettable Moments with elegant decor and personalized touches for every occasion in the DMV area.</p>
                <div class="social-links">
                    <a href="https://www.facebook.com/people/Petals-Paradise-Events/61574977307091/" target="_blank" rel="noopener noreferrer" aria-label="Visit our Facebook page">
                       <i data-feather="facebook"></i>
                    </a>

                    <a href="https://www.instagram.com/petalsparadiseevents/" target="_blank" rel="noopener noreferrer" aria-label="Visit our Instagram profile">
                       <i data-feather="instagram"></i>
                    </a>

                    <a href="https://wa.me/qr/UGD3LZ3UNUCQP1" target="_blank" rel="noopener noreferrer" aria-label="Contact us on WhatsApp">
                       <i data-feather="message-circle"></i>
                    </a>
                </div>
            </div>
            <div class="footer-col">
                <h3>Quick Links</h3>
                <a href="#">Home</a>
                <a href="#rentals">Rentals</a>
                <a href="#services">Services</a>
                <a href="#gallery">Gallery</a>
            </div>
            <div class="footer-col">
                <h3>Contact Us</h3>
                <p style="display: flex; align-items: center; gap: 12px; margin-bottom: 1rem;"><i data-feather="phone" style="width: 20px; height: 20px; flex-shrink: 0; color: var(--primary-color);"></i> <a href="tel:+18484486993" class="phone-link" style="color: inherit; text-decoration: none; line-height: 1;">+1 848-448-6993</a></p>
                <p style="display: flex; align-items: center; gap: 12px; margin-bottom: 1rem;"><i data-feather="mail" style="width: 20px; height: 20px; flex-shrink: 0; color: var(--primary-color);"></i> <a href="mailto:contact@petalsparadiseevents.com" style="color: inherit; text-decoration: none; word-break: break-word; line-height: 1;">contact@petalsparadiseevents.com</a></p>
                <p style="display: flex; align-items: center; gap: 12px; margin-bottom: 1rem;"><i data-feather="map-pin" style="width: 20px; height: 20px; flex-shrink: 0; color: var(--primary-color);"></i> <span style="line-height: 1;">Serving Ashburn, Aldie & DMV Area</span></p>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} Petals Paradise Events. All Rights Reserved.</p>
        </div>
    `;
    feather.replace();
}

// Views
function renderHome() {
    return `
        <section class="hero">
            <div class="hero-content">
                <h1>Crafting Unforgettable Moments</h1>
                <p>We specialize in transforming your celebrations into beautiful memories with elegant decor and personalized touches for every occasion.</p>
                <div class="hero-btns">
                    <a href="#rentals" class="btn btn-primary">Explore Rentals</a>
                    <a href="#contact" class="btn btn-outline">Contact Us</a>
                </div>
            </div>
        </section>


        <section class="container mt-2">
            <div class="text-center">
                <h2 class="section-title">Our Featured Services</h2>
                <p class="section-subtitle">Let us add a touch of paradise to your next celebration.</p>
            </div>
            <div class="grid">
                ${services.map(s => `
                    <div class="card">
                        <div class="card-img-wrapper">
                            <img loading="lazy" src="${s.img}" alt="${s.title}">
                        </div>
                        <div class="card-body">
                            <h3 class="card-title">${s.title}</h3>
                            <p class="card-desc">${s.desc}</p>
                            <a href="#services" class="btn btn-outline" style="width:100%; text-align:center;" aria-label="Learn more about ${s.title}">Learn More</a>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>

        <section class="container" style="background: var(--surface-color); border-radius: 12px; padding: 3rem 2rem; margin-top: 3rem; margin-bottom: 2rem; border-top: 4px solid var(--primary-color);">
            <div class="text-center" style="max-width: 800px; margin: 0 auto;">
                <h2 class="section-title" style="font-size: 2rem; margin-bottom: 1rem;">About Petals Paradise</h2>
                <p class="section-subtitle" style="font-size: 1.1rem; line-height: 1.8; color: var(--text-secondary); margin-bottom: 0;">
                    Welcome to Petals Paradise Events! Based in Aldie, VA, we are a premium event decor and party rental company serving Loudoun County and the entire DMV area. Our passion is transforming your vision into reality—whether it's an elegant wedding, a joyful baby shower, or a milestone graduation. We pride ourselves on providing high-quality inventory, impeccable service, and a personal touch to make your celebrations unforgettable.
                </p>
            </div>
        </section>
    `;
}

function refreshRentalsUI() {
    rentalItems.forEach(item => {
        const container = document.getElementById(`action-controls-${item.id}`);
        if (container) {
            const cartItem = cart.find(i => i.id === item.id);
            const qty = cartItem ? cartItem.quantity : 0;
            if (qty > 0) {
                container.innerHTML = `
                    <div class="quantity-controls" style="background: var(--bg-color); border: 1px solid var(--border-color); display: inline-flex;">
                        <button class="quantity-btn" onclick="changeQty(${item.id}, -1)">-</button>
                        <input type="number" min="0" value="${qty}" style="width: 40px; text-align: center; background: transparent; border: none; color: var(--text-primary); font-family: var(--font-family); font-size: 1rem; -moz-appearance: textfield;" onchange="setQty(${item.id}, this.value)">
                        <button class="quantity-btn" onclick="changeQty(${item.id}, 1)">+</button>
                    </div>
                `;
            } else {
                container.innerHTML = `<button class="btn btn-primary" onclick="handleAddToCart(${item.id})">Add to Cart</button>`;
            }
        }
    });

    const stickyCart = document.getElementById('sticky-view-cart');
    if (stickyCart) {
        if (cart.length > 0) {
            stickyCart.style.display = 'block';
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            const btn = stickyCart.querySelector('a');
            if (btn) btn.textContent = `View Cart (${totalItems} item${totalItems !== 1 ? 's' : ''})`;
        } else {
            stickyCart.style.display = 'none';
        }
    }
}

function renderRentals() {
    window.handleAddToCart = (id) => {
        const item = rentalItems.find(i => i.id === id);
        if (item) addToCart(item);
    };

    // Trigger initial refresh
    setTimeout(() => {
        if (window.refreshRentalsUI) window.refreshRentalsUI();
    }, 0);

    return `
        <div class="container">
            <div class="text-center">
                <h2 class="section-title">Rentals Collection</h2>
                <p class="section-subtitle">Browse our premium selection of event decor and party essentials.</p>
            </div>

            <!-- Search Bar -->
            <div style="max-width: 600px; margin: 0 auto 3rem;">
                <form onsubmit="event.preventDefault(); window.handleSearch(event);" style="position: relative;">
                    <i data-feather="search" style="position: absolute; left: 1.5rem; top: 50%; transform: translateY(-50%); color: var(--text-secondary); width: 20px;"></i>
                    <input type="text" 
                        placeholder="Search for backdrops, marquee letters, neon signs..." 
                        class="form-control" 
                        style="padding-left: 3.5rem; border-radius: 50px; height: 60px; font-size: 1.1rem; box-shadow: var(--shadow-sm); border: 2px solid var(--border-color);"
                        oninput="window.handleSearch(event)"
                        value="${searchQuery}">
                    <button type="submit" style="display: none;"></button>
                </form>
            </div>

            <div id="rentals-grid" class="grid">
                <div style="grid-column: 1/-1; text-align: center; padding: 2rem;">Loading collection...</div>
            </div>

            <div class="empty-state mt-2">
                <i data-feather="help-circle"></i>
                <h3>Can't find what you're looking for?</h3>
                <p style="color: var(--text-secondary); margin-top:1rem;">If there's a specific item you need for your event that isn't listed here, please let us know! We are constantly updating our inventory.</p>
                <a href="#contact" class="btn btn-outline mt-2">Inquire About Missing Items</a>
            </div>

            <!-- Sticky Cart Button -->
            <div id="sticky-view-cart" class="sticky-checkout-container" style="display: none;">
                <a href="#cart" class="btn btn-primary" style="width: 100%; text-align:center;">View Cart</a>
            </div>
        </div>
    `;
}

function renderServices() {
    return `
        <div class="container">
            <div class="text-center">
                <h2 class="section-title">Our Services</h2>
                <p class="section-subtitle">Comprehensive decor solutions tailored for your unique celebrations.</p>
            </div>
            <div class="grid">
                ${services.map(s => `
                    <div class="card">
                        <div class="card-img-wrapper">
                            <img loading="lazy" src="${s.img}" alt="${s.title}" onerror="this.onerror=null;this.src='https://via.placeholder.com/300?text=Image+Not+Found'"/>
                        </div>
                        <div class="card-body">
                            <h3 class="card-title">${s.title}</h3>
                            <p class="card-desc">${s.desc}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderGallery() {
    const gallery = {
        "Graduation 2026": [
            "./wp-content/uploads/2025/07/IMG_9906-scaled.jpg",
            "./wp-content/uploads/2025/07/IMG_9901-1-scaled.jpg",
            "./wp-content/uploads/2025/07/image-2-scaled.png"
        ],
        "Traditional & Seemantham": [
            "./wp-content/uploads/2025/07/Seemantham-4.jpg",
            "./wp-content/uploads/2025/05/Haldi-backdrop-3-2-scaled.jpg",
            "./wp-content/uploads/2025/05/Baby-backdrop-1-scaled.jpg",
            "./wp-content/uploads/2025/05/backdrop-2-1-scaled.jpg",
            "./wp-content/uploads/2025/05/31782321-EE45-4F6A-9482-25F39324F8B7-scaled.jpg",
            "./wp-content/uploads/2025/07/IMG_9925-1-scaled.jpg"
        ],
        "Event Highlights": [
            "./wp-content/uploads/2026/05/IMG_1314.jpeg",
            "./wp-content/uploads/2025/09/IMG_0012-scaled.jpg",
            "./wp-content/uploads/2025/12/IMG_0670-2-scaled.jpg",
            "./wp-content/uploads/2025/09/IMG_0048-scaled.jpg",
            "./wp-content/uploads/2025/09/IMG_0079-scaled.jpg",
            "./wp-content/uploads/2025/12/IMG_0755-2-scaled.jpg",
            "./wp-content/uploads/2025/07/image-1.png",
            "./wp-content/uploads/2025/07/image-scaled.png"
        ]
    };

    window.currentGalleryCategory = window.currentGalleryCategory || 'All';
    window.filterGallery = (category) => {
        window.currentGalleryCategory = category;
        const container = document.getElementById('gallery-container');
        if (container) {
            container.outerHTML = renderGallery();
            if (window.feather) feather.replace();
            
            // Re-bind image modal clicks for new content
            const modal = document.getElementById('image-modal');
            const modalImg = document.getElementById('modal-img');
            document.querySelectorAll('#gallery-container img:not(.no-zoom)').forEach(img => {
                img.onclick = function() {
                    modal.classList.add('active');
                    modalImg.src = this.src;
                    document.body.style.overflow = 'hidden';
                };
            });
        }
    };

    const categories = ['All', ...Object.keys(gallery)];
    
    let renderedContent = '';
    Object.entries(gallery).forEach(([category, images]) => {
        if (window.currentGalleryCategory !== 'All' && window.currentGalleryCategory !== category) return;
        
        renderedContent += `
            <div class="mt-2 gallery-category-block">
                <h3 style="margin-bottom: 1.5rem; color: var(--primary-color); border-left: 4px solid var(--primary-color); padding-left: 1rem;">${category}</h3>
                <div class="grid" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem;">
                    ${images.map(img => `
                        <div class="card" style="padding: 0; overflow: hidden; border-radius: 12px; height: 350px;">
                            <img loading="lazy" src="${img}" alt="${category}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; cursor: zoom-in;" onerror="this.onerror=null;this.src='https://via.placeholder.com/300?text=Image+Not+Found'" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    });

    return `
        <div class="container" id="gallery-container">
            <div class="text-center">
                <h2 class="section-title">Our Gallery</h2>
                <p class="section-subtitle">A glimpse into the stunning events we've brought to life.</p>
            </div>
            
            <div class="gallery-filters" style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; margin-bottom: 2rem;">
                ${categories.map(cat => `
                    <button onclick="filterGallery('${cat}')" class="btn ${window.currentGalleryCategory === cat ? 'btn-primary' : 'btn-outline'}" style="padding: 0.5rem 1.5rem; font-size: 0.9rem;">${cat}</button>
                `).join('')}
            </div>

            ${renderedContent}
        </div>
    `;
}

function renderVideos() {
    const videos = [
        { url: "./wp-content/uploads/2025/09/Wedding-Set-up-@dcwarmemorial-petalsparadiseevents-eventrentals-eventdecor-weddingsetup-dcw.mp4", title: "Wedding Set-up @ DC War Memorial" },
        { url: "./wp-content/uploads/2025/12/IMG_0560.mov", title: "Elegant Event Highlight" },
        { url: "./wp-content/uploads/2025/09/Winnie-the-Pooh-Themed-Birthday-DecorThank-you-@tdupexperience-It-was-great-collaborating-with-y.mp4", title: "Winnie the Pooh Themed Birthday" },
        { url: "./wp-content/uploads/2025/09/Bridal-Shower-Decorpetalsparadiseevents-eventdecor-eventrentals-babyshowerdecor-birthdaydec.mp4", title: "Bridal Shower Decor" },
        { url: "./wp-content/uploads/2025/07/Seemantham-Video-1.mp4", title: "Seemantham Celebration" },
        { url: "./wp-content/uploads/2025/07/July-4th-Video-1.mp4", title: "July 4th Celebration" },
        { url: "./wp-content/uploads/2025/07/Bday-Decor-Video.mp4", title: "Birthday Party Setup" },
        { url: "./wp-content/uploads/2025/07/Baby-Shower-Video.mp4", title: "Baby Shower Highlights" },
        { url: "./wp-content/uploads/2025/07/Seemantham-Video.mp4", title: "Traditional Seemantham" },
        { url: "./wp-content/uploads/2025/06/7BB8EC83-E840-4082-9C8D-C2B664F3C78Asegment_video_2.mp4", title: "Grand Event Setup" },
        { url: "./wp-content/uploads/2025/06/0B6B56B8-F9AD-466F-B758-DEC86D60898Dsegment_video_1.mp4", title: "Ceremony Backdrop" },
        { url: "./wp-content/uploads/2025/06/Sharing-some-recent-event-setups-we-had-pleasure-meeting-some-nice-people-🫰1030-tent-available-for-rent.eventrental-event-decor.mp4", title: "Recent Tent & Decor Setups" },
        { url: "./wp-content/uploads/2025/06/House-warming-decoreventdecor-eventrentals-petalsparadiseevents-babyshower.mp4", title: "House Warming Decor" },
        { url: "./wp-content/uploads/2025/06/Birthday-Decor.Please-contact-us-for-any-event-decorations.birthdaydecor-babyshower-graduationparty🎓-sweet16.mp4", title: "Dream Birthday Decorations" },
        { url: "./wp-content/uploads/2025/06/Baby-Shower-Decor-🎈eventdecoration-babyshowerdecor-petalsparadiseevents-eventrentals.mp4", title: "Deluxe Baby Shower Decor" }
    ];

    return `
        <div class="container">
            <div class="text-center">
                <h2 class="section-title">Videos Gallery</h2>
                <p class="section-subtitle">Experience the magic of our event transformations through these highlights.</p>
            </div>
            
            <div class="grid" style="grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem;">
                ${videos.map(v => `
                    <div class="card" style="padding: 0.5rem; background: var(--surface-color); overflow: hidden; border-radius: 16px;">
                        <div style="aspect-ratio: 9/16; width: 100%; border-radius: 12px; overflow: hidden; background: #000; display: flex; align-items: center;">
                            <video controls preload="metadata" style="width: 100%; height: auto; display: block;">
                                <source src="${v.url}">
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <div style="padding: 1rem 0.5rem;">
                            <h4 style="color: var(--primary-color); font-size: 0.95rem; margin-bottom: 0.2rem;">${v.title}</h4>
                            <p style="color: var(--text-secondary); font-size: 0.8rem; font-style: italic;">#petalsparadiseevents</p>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="text-center mt-2">
                <a href="https://www.instagram.com/petalsparadiseevents/" target="_blank" class="btn btn-outline">
                    <i data-feather="instagram" style="width: 16px; margin-right: 8px; vertical-align: middle;"></i> View More on Instagram
                </a>
            </div>
        </div>
    `;
}

function renderContact() {
    window.handleContactSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;
        const msg = form.querySelector('textarea').value;

        const subject = encodeURIComponent(`New Inquiry from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`);
        window.location.href = `mailto:contact@petalsparadiseevents.com?subject=${subject}&body=${body}`;

        form.reset();
        showToast('Opening your email client to send the message...');
    };

    return `
        <div class="container">
            <div class="text-center">
                <h2 class="section-title">Contact Us</h2>
                <p class="section-subtitle">We would love to hear from you. Let's start planning your dream event.</p>
            </div>
            <div class="cart-layout">
                <div class="cart-summary" style="position: static;">
                    <form onsubmit="handleContactSubmit(event)">
                        <div class="form-group">
                            <label class="form-label">Full Name</label>
                            <input type="text" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Email</label>
                            <input type="email" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Message</label>
                            <textarea class="form-control" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary" style="width: 100%;">Send Message</button>
                    </form>
                </div>
                <div>
                    <div class="card" style="padding: 2rem; background: var(--surface-color);">
                        <h3 style="color: var(--primary-color); margin-bottom: 1.5rem;">Contact Information</h3>
                        <p style="margin-bottom: 1rem;"><i data-feather="phone"></i> <a href="tel:+18484486993" style="color: inherit; text-decoration: none;">+1 848-448-6993</a></p>
                        <p style="margin-bottom: 1rem;"><i data-feather="mail"></i> <a href="mailto:contact@petalsparadiseevents.com" style="color: inherit; text-decoration: none;">contact@petalsparadiseevents.com</a></p>
                        <p style="margin-bottom: 1rem;"><i data-feather="map-pin"></i> Serving Ashburn, Aldie & DMV Area</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderCart() {
    window.handlePromo = (e) => {
        e.preventDefault();
        const input = e.target.querySelector('input');
        applyPromoCode(input.value);
    };
    window.quickAdd = (id) => {
        const item = rentalItems.find(i => i.id === id);
        if (item) addToCart(item);
    };
    window.setFulfillment = (method) => {
        fulfillmentMethod = method;
        saveCart(true); // Save without full re-render
        
        // Update Total Display manually to avoid flicker/scroll
        const totalDisplays = document.querySelectorAll('#summary-total-val');
        const finalTotal = getCartTotal() - getDiscount();
        const text = method === 'Delivery' ? `$${finalTotal} + Delivery (TBD)` : `$${finalTotal}`;
        
        totalDisplays.forEach(el => {
            el.innerHTML = `<span style="font-size: 1rem; color: var(--text-secondary);">Total Estimate:</span> <span style="font-size: 1.25rem; font-weight: 700; color: var(--primary-color); text-align: right;">${text}</span>`;
            el.style.display = 'flex';
            el.style.justifyContent = 'space-between';
            el.style.alignItems = 'center';
            el.style.flexWrap = 'wrap';
            el.style.gap = '0.5rem';
            el.style.width = '100%';
        });
        
        // Also toggle any delivery-specific summary rows
        const deliveryRows = document.querySelectorAll('#delivery-summary-row');
        deliveryRows.forEach(el => {
            el.style.display = method === 'Delivery' ? 'flex' : 'none';
        });
    };

    window.initStickyObserver = (buttonId, stickyId) => {
        const btn = document.getElementById(buttonId);
        const sticky = document.getElementById(stickyId);
        if (btn && sticky) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    sticky.style.display = entry.isIntersecting ? 'none' : 'block';
                });
            }, { threshold: 0.1 });
            observer.observe(btn);
        }
    };

    setTimeout(() => window.initStickyObserver('cart-checkout-btn', 'sticky-checkout'), 100);

    if (cart.length === 0) {
        return `
            <div class="container">
                <h2 class="section-title">Your Cart</h2>
                <div class="empty-state" style="margin-bottom: 4rem;">
                    <i data-feather="shopping-bag" style="width: 64px; height: 64px; color: var(--border-color); margin-bottom: 1.5rem;"></i>
                    <h3>Your cart is empty</h3>
                    <p style="color: var(--text-secondary); margin-top:1rem;">Browse our rentals to find the perfect decor for your event.</p>
                    <a href="#rentals" class="btn btn-primary mt-2">View Rentals</a>
                </div>
                
                <div class="mt-2" style="border-top: 1px solid var(--border-color); padding-top: 2rem;">
                    <h3 style="margin-bottom: 1.5rem; color: var(--primary-color);">Recommended for Your Event</h3>
                    <div class="grid" style="grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));">
                        ${getDynamicRecommendations().map(item => `
                            <div class="card recommendation-card">
                                <div class="card-img-wrapper" style="height: 150px;">
                                    <img loading="lazy" src="${item.img}" alt="${item.title}">
                                </div>
                                <div class="card-body" style="padding: 1rem;">
                                    <h4 style="font-size: 0.9rem; margin-bottom: 0.5rem; line-height: 1.2;">${item.title}</h4>
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <span class="price" style="font-size: 0.9rem;">$${item.price}</span>
                                        <button class="btn btn-primary" style="padding: 4px 12px; font-size: 0.75rem;" onclick="quickAdd(${item.id})">Add</button>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    const subtotal = getCartTotal();
    const discount = getDiscount();

    return `
        <div class="container">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; margin-bottom: 1rem;">
                <h2 class="section-title" style="margin-bottom: 0;">Your Cart</h2>
                <button class="btn btn-outline" style="border-color: #ef4444; color: #ef4444;" onclick="handleClearCart()">
                    <i data-feather="trash-2" style="width: 16px; vertical-align: middle; margin-right: 8px;"></i>Clear All
                </button>
            </div>
            <p class="section-subtitle" style="margin-bottom: 2rem; text-align: left; margin-left: 0;">Review your selected rental items below.</p>
            <div class="cart-layout">
                <div>
                    ${cart.map(item => `
                        <div class="cart-item">
                            <img loading="lazy" src="${item.img}" alt="${item.title}">
                            <div class="cart-item-info">
                                <h4 class="cart-item-title">${item.title}</h4>
                                <p style="color: var(--primary-color); font-weight:600;">$${getItemPrice(item)}</p>
                            </div>
                            <div class="cart-item-actions">
                                <div class="quantity-controls">
                                    <button class="quantity-btn" onclick="changeQty(${item.id}, -1)">-</button>
                                    <input type="number" min="0" value="${item.quantity}" style="width: 40px; text-align: center; background: transparent; border: none; color: var(--text-primary); font-family: var(--font-family); font-size: 1rem; -moz-appearance: textfield;" onchange="setQty(${item.id}, this.value)">
                                    <button class="quantity-btn" onclick="changeQty(${item.id}, 1)">+</button>
                                </div>
                                <button class="remove-btn" onclick="removeItem(${item.id})">
                                    <i data-feather="trash-2"></i>
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="cart-summary">
                    <h3 style="margin-bottom: 1.5rem;">Order Summary</h3>
                    <div class="summary-row">
                        <span>Items (${cart.reduce((s, i) => s + i.quantity, 0)})</span>
                        <span>$${subtotal}</span>
                    </div>
                    ${discount > 0 ? `
                        <div class="summary-row" style="color: #10b981;">
                            <span>Discount (${appliedPromo})</span>
                            <span>-$${discount}</span>
                        </div>
                    ` : ''}
                    
                    <div class="form-group" style="margin-top: 1.5rem;">
                        <label class="form-label" style="font-size: 0.85rem;">Fulfillment Method</label>
                        <div style="display: flex; gap: 1.5rem; margin-top: 0.5rem;">
                            <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 0.85rem;">
                                <input type="radio" name="cart_fulfillment" value="Pickup" ${fulfillmentMethod === 'Pickup' ? 'checked' : ''} onclick="setFulfillment('Pickup')"> Pickup
                            </label>
                            <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 0.85rem;">
                                <input type="radio" name="cart_fulfillment" value="Delivery" ${fulfillmentMethod === 'Delivery' ? 'checked' : ''} onclick="setFulfillment('Delivery')"> Delivery
                            </label>
                        </div>
                    </div>

                    <div class="form-group" style="margin-top: 1.5rem;">
                        <label class="form-label" style="font-size: 0.85rem;">Rental Duration (Days)</label>
                        <input type="number" min="1" class="form-control" value="${rentalDays}" onchange="setRentalDays(this.value)" style="margin-top: 0.5rem; width: 100px;">
                    </div>

                    ${fulfillmentMethod === 'Delivery' ? `
                        <div class="summary-row" style="margin-top: 0.5rem;">
                            <span>Delivery</span>
                            <span style="color: var(--primary-color);">TBD</span>
                        </div>
                    ` : ''}
                    
                    <form onsubmit="handlePromo(event)" style="margin-top: 1.5rem;">
                        <div class="form-group" style="display: flex; gap: 0.5rem; margin-bottom: 0;">
                            <input type="text" class="form-control" placeholder="Promo Code" value="${appliedPromo || ''}" style="margin-bottom: 0;">
                            <button type="submit" class="btn btn-primary">Apply</button>
                        </div>
                    </form>

                    <div id="summary-total-val" class="summary-total" style="margin-top: 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
                        <span style="font-size: 1rem; color: var(--text-secondary);">Total Estimate:</span>
                        <span style="font-size: 1.25rem; font-weight: 700; color: var(--primary-color); text-align: right;">$${subtotal - discount}${fulfillmentMethod === 'Delivery' ? ' + Delivery (TBD)' : ''}</span>
                    </div>
                    <a href="#checkout" id="cart-checkout-btn" class="btn btn-primary" style="width: 100%; text-align: center; margin-top: 1.5rem; display: block; padding: 1.2rem;">
                        Proceed to Checkout
                    </a>
                    <a href="#rentals" class="btn btn-outline" style="width: 100%; text-align:center; margin-top:1rem;">Continue Shopping</a>
                </div>
            </div>

            <div class="mt-2" style="border-top: 1px solid var(--border-color); padding-top: 2rem;">
                <h3 style="margin-bottom: 1.5rem; color: var(--primary-color);">Complete Your Event Setup</h3>
                <div class="grid" style="grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));">
                    ${getDynamicRecommendations().map(item => `
                        <div class="card recommendation-card">
                            <div class="card-img-wrapper" style="height: 150px;">
                                <img loading="lazy" src="${item.img}" alt="${item.title}">
                            </div>
                            <div class="card-body" style="padding: 1rem;">
                                <h4 style="font-size: 0.9rem; margin-bottom: 0.5rem; line-height: 1.2;">${item.title}</h4>
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <span class="price" style="font-size: 0.9rem;">$${item.price}</span>
                                    <button class="btn btn-primary" style="padding: 4px 12px; font-size: 0.75rem;" onclick="quickAdd(${item.id})">Add</button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- Sticky Checkout Button for Mobile -->
            <div id="sticky-checkout" class="sticky-checkout-container">
                <a href="#checkout" class="btn btn-primary" style="width: 100%; text-align:center;">Proceed to Checkout</a>
            </div>
        </div>
    `;
}

function renderCheckout() {
    if (cart.length === 0) {
        window.location.hash = '#cart';
        return '';
    }

    window.handleOrderSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const details = Object.fromEntries(formData);

        let body = `Hi Petals Paradise Events team,\n\nI would like to request the following rentals for my upcoming event. Below are the details:\n\n`;
        
        body += `CUSTOMER INFORMATION\n`;
        body += `--------------------\n`;
        body += `Name: ${details.name}\n`;
        body += `Email: ${details.email}\n`;
        body += `Phone: ${details.phone}\n\n`;
        
        body += `EVENT LOGISTICS\n`;
        body += `---------------\n`;
        body += `Fulfillment: ${details.fulfillment}\n`;
        if (details.fulfillment === 'Delivery') {
            body += `Delivery Address: ${details.delivery_address}\n`;
            body += `Delivery Date: ${details.delivery_date_manual} at ${details.delivery_time_manual}\n`;
            body += `Collection Date: ${details.collection_date_manual} at ${details.collection_time_manual}\n`;
        } else {
            body += `Pick Up Date: ${details.pickup_date_manual} at ${details.pickup_time_manual}\n`;
            body += `Return Date: ${details.dropoff_date_manual} at ${details.dropoff_time_manual}\n`;
        }
        body += `Event Date: ${details.date}\n`;
        body += `Venue Location: ${details.location || 'N/A'}\n\n`;
        
        body += `ORDER SUMMARY\n`;
        body += `-------------\n`;
        body += `Rental Duration: ${rentalDays} Day(s)\n`;
        let total = 0;
        cart.forEach(item => {
            body += `- ${item.quantity}x ${item.title} ($${getItemTotal(item)})\n`;
            total += getItemTotal(item);
        });
        
        if (appliedPromo) {
            body += `\nPromo Code Applied: ${appliedPromo} (-$${getDiscount()})\n`;
        }
        
        const finalTotal = total - getDiscount();
        body += `\nEstimated Total: $${finalTotal}${details.fulfillment === 'Delivery' ? ' + Delivery Fee (TBD)' : ''}\n\n`;

        if (details.special_requests) {
            body += `SPECIAL REQUESTS / MISSING ITEMS\n`;
            body += `--------------------------------\n`;
            body += `${details.special_requests}\n\n`;
        }
        
        body += `Thank you!`;

        const subject = encodeURIComponent(`Rental Request: ${details.name} - ${details.date}`);
        window.location.href = `mailto:contact@petalsparadiseevents.com?subject=${subject}&body=${encodeURIComponent(body)}`;

        cart = [];
        appliedPromo = null;
        saveCart();

        window.location.hash = '#confirmation';
    };

    window.initAutocomplete = () => {
        try {
            const input = document.querySelector('input[name="delivery_address"]');
            if (input && !input.hasAttribute('data-autocomplete-init') && window.google && window.google.maps && window.google.maps.places) {
                const autocomplete = new google.maps.places.Autocomplete(input);
                autocomplete.setComponentRestrictions({ country: ['us'] });
                input.setAttribute('data-autocomplete-init', 'true');
                
                // Prevent 'Enter' from submitting the form when selecting an autocomplete option
                input.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                    }
                });
            }
        } catch (error) {
            console.error("Google Maps Autocomplete failed to initialize:", error);
            // Non-blocking: Input remains a standard text field
        }
    };

    // Global handler for Google Maps authentication failures
    window.gm_authFailure = () => {
        console.warn("Google Maps authentication failed. Switching to manual address entry.");
        const input = document.querySelector('input[name="delivery_address"]');
        if (input) {
            // Remove any Google-injected styles that might block the input
            input.style.backgroundImage = 'none';
            input.placeholder = "Enter full address manually";
            input.disabled = false;
            input.readOnly = false;
            input.removeAttribute('disabled');
            input.removeAttribute('readonly');
            input.classList.remove('pac-target-input');
        }
    };

    window.toggleDelivery = (type) => {
        const deliverySection = document.getElementById('delivery-section');
        const summaryTotal = document.getElementById('summary-total-val');
        const deliverySummary = document.getElementById('delivery-summary-row');
        
        if (deliverySection) {
            deliverySection.style.display = type === 'Delivery' ? 'block' : 'none';
            const addressInput = deliverySection.querySelector('input');
            if (addressInput) {
                addressInput.required = type === 'Delivery';
                if (type === 'Delivery') setTimeout(window.initAutocomplete, 100);
            }
        }
        
        if (deliverySummary) {
            deliverySummary.style.display = type === 'Delivery' ? 'flex' : 'none';
        }
        
        if (summaryTotal) {
            const finalTotal = getCartTotal() - getDiscount();
            summaryTotal.textContent = type === 'Delivery' ? `$${finalTotal} + Delivery (TBD)` : `$${finalTotal}`;
        }

        fulfillmentMethod = type;
        saveCart(true); // Skip full router refresh to prevent jumping/flickering

        // Toggle Dedicated Logistics Blocks
        const pickupLogistics = document.getElementById('logistics-pickup');
        const deliveryLogistics = document.getElementById('logistics-delivery');
        const venueSection = document.getElementById('venue-location-section');
        
        if (venueSection) {
            venueSection.style.display = type === 'Delivery' ? 'none' : 'block';
            const venueInput = venueSection.querySelector('input');
            if (venueInput) venueInput.required = type === 'Pickup';
        }

        if (pickupLogistics && deliveryLogistics) {
            pickupLogistics.style.display = type === 'Pickup' ? 'block' : 'none';
            deliveryLogistics.style.display = type === 'Delivery' ? 'block' : 'none';
            
            // Set required status for active inputs
            pickupLogistics.querySelectorAll('input').forEach(i => i.required = type === 'Pickup');
            deliveryLogistics.querySelectorAll('input').forEach(i => i.required = type === 'Delivery');
        }
    };

    const subtotal = getCartTotal();
    const discount = getDiscount();

    return `
        <div class="container">
            <h2 class="section-title">Checkout</h2>
            <div class="cart-layout">
                <div class="cart-summary" style="position: static;">
                    <h3 style="margin-bottom: 1.5rem;">Event Details</h3>
                    <form onsubmit="handleOrderSubmit(event)">
                        <div class="form-group">
                            <label for="checkout-name" class="form-label">Full Name</label>
                            <input type="text" id="checkout-name" name="name" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="checkout-email" class="form-label">Email</label>
                            <input type="email" id="checkout-email" name="email" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="checkout-phone" class="form-label">Phone</label>
                            <input type="tel" id="checkout-phone" name="phone" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="checkout-date" class="form-label">Event Date</label>
                            <input type="date" id="checkout-date" name="date" class="form-control" required>
                        </div>
                        <div id="venue-location-section" class="form-group">
                            <label class="form-label">Venue Location (Name/City)</label>
                            <input type="text" name="location" class="form-control" placeholder="e.g. Westfields Marriott or Aldie, VA" required>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Fulfillment Method</label>
                            <div style="display: flex; gap: 2rem; margin-top: 0.5rem;">
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                                    <input type="radio" name="fulfillment" value="Pickup" ${fulfillmentMethod === 'Pickup' ? 'checked' : ''} onclick="toggleDelivery('Pickup')"> Pickup
                                </label>
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                                    <input type="radio" name="fulfillment" value="Delivery" ${fulfillmentMethod === 'Delivery' ? 'checked' : ''} onclick="toggleDelivery('Delivery')"> Delivery
                                </label>
                            </div>
                        </div>

                        <div id="delivery-section" style="display: ${fulfillmentMethod === 'Delivery' ? 'block' : 'none'}; border: 1px dashed var(--primary-color); padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; background: rgba(212, 175, 55, 0.05);">
                            <div class="form-group" style="margin-bottom: 0;">
                                <label class="form-label">Delivery Address</label>
                                <input type="text" name="delivery_address" class="form-control" placeholder="Enter full address for delivery quote" ${fulfillmentMethod === 'Delivery' ? 'required' : ''}>
                                <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.5rem;">
                                    <i data-feather="truck" style="width: 14px; vertical-align: middle;"></i> 
                                    Delivery fee will be based on location. Our team will contact you with the final estimate once the request is submitted.
                                </p>
                            </div>
                        </div>
                        <div id="logistics-container">
                            <!-- Dedicated Pickup Mode Fields -->
                            <div id="logistics-pickup" style="display: ${fulfillmentMethod === 'Pickup' ? 'block' : 'none'};">
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                    <div class="form-group">
                                        <label class="form-label">Pick Up Date</label>
                                        <input type="date" name="pickup_date_manual" class="form-control" ${fulfillmentMethod === 'Pickup' ? 'required' : ''}>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Pick Up Time</label>
                                        <input type="time" name="pickup_time_manual" class="form-control" ${fulfillmentMethod === 'Pickup' ? 'required' : ''}>
                                    </div>
                                </div>
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                    <div class="form-group">
                                        <label class="form-label">Return Date</label>
                                        <input type="date" name="dropoff_date_manual" class="form-control" ${fulfillmentMethod === 'Pickup' ? 'required' : ''}>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Return Time</label>
                                        <input type="time" name="dropoff_time_manual" class="form-control" ${fulfillmentMethod === 'Pickup' ? 'required' : ''}>
                                    </div>
                                </div>
                            </div>

                            <!-- Dedicated Delivery Mode Fields -->
                            <div id="logistics-delivery" style="display: ${fulfillmentMethod === 'Delivery' ? 'block' : 'none'};">
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                    <div class="form-group">
                                        <label class="form-label">Delivery Date</label>
                                        <input type="date" name="delivery_date_manual" class="form-control" ${fulfillmentMethod === 'Delivery' ? 'required' : ''}>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Delivery Time</label>
                                        <input type="time" name="delivery_time_manual" class="form-control" ${fulfillmentMethod === 'Delivery' ? 'required' : ''}>
                                    </div>
                                </div>
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                    <div class="form-group">
                                        <label class="form-label">Collection Date</label>
                                        <input type="date" name="collection_date_manual" class="form-control" ${fulfillmentMethod === 'Delivery' ? 'required' : ''}>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Collection Time</label>
                                        <input type="time" name="collection_time_manual" class="form-control" ${fulfillmentMethod === 'Delivery' ? 'required' : ''}>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Special Requests / Missing Items</label>
                            <textarea name="special_requests" class="form-control" placeholder="Is there something specific you're looking for that's missing from our catalog? Or any other special instructions?"></textarea>
                        </div>
                        <button type="submit" id="checkout-submit-btn" class="btn btn-primary" style="width: 100%; padding: 1.2rem;">Submit Rental Request</button>
                    </form>
                </div>
                <div class="cart-summary">
                    <h3 style="margin-bottom: 1.5rem;">Order Summary</h3>
                    <div class="summary-row">
                        <span>Items (${cart.reduce((s, i) => s + i.quantity, 0)})</span>
                        <span>$${subtotal}</span>
                    </div>
                    ${discount > 0 ? `
                        <div class="summary-row" style="color: #10b981;">
                            <span>Discount (${appliedPromo})</span>
                            <span>-$${discount}</span>
                        </div>
                    ` : ''}
                    <div id="delivery-summary-row" class="summary-row" style="display: none;">
                        <span>Delivery</span>
                        <span style="color: var(--primary-color);">TBD</span>
                    </div>
                    
                    <form onsubmit="handlePromo(event)" style="margin-top: 1.5rem; margin-bottom: 1.5rem;">
                        <div class="form-group" style="display: flex; gap: 0.5rem; margin-bottom: 0;">
                            <input type="text" class="form-control" placeholder="Promo Code" value="${appliedPromo || ''}" style="margin-bottom: 0;">
                            <button type="submit" class="btn btn-primary">Apply</button>
                        </div>
                    </form>

                    <div id="summary-total-val" class="summary-total" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
                        <span style="font-size: 1rem; color: var(--text-secondary);">Total Estimate:</span>
                        <span style="font-size: 1.25rem; font-weight: 700; color: var(--primary-color); text-align: right;">$${subtotal - discount}${fulfillmentMethod === 'Delivery' ? ' + Delivery (TBD)' : ''}</span>
                    </div>
                    <p style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 1rem;">
                        <i data-feather="info" style="width:16px; margin-right:4px; vertical-align:middle;"></i>
                        Call us: <a href="tel:+18484486993" class="phone-link" style="text-decoration: underline;">+1 848-448-6993</a>
                    </p>
                </div>
            </div>
        </div>
    `;
}

function renderGraduation() {
    const gradSpecific = rentalItems.filter(i => i.title.toLowerCase().includes('grad') || i.title.includes('Marquee'));
    const essentials = rentalItems.filter(i => ['Round Fold-In-Half Table', 'Adult Folding Chair', 'Wedding Tent (16x26)'].includes(i.title));

    return `
        <div class="container">
            <div class="text-center">
                <h2 class="section-title">Class of 2026 Graduation Collection</h2>
                <p class="section-subtitle">Make your graduation party unforgettable with our premium decor and party essentials.</p>
            </div>

            <div class="mb-2">
                <h3 style="margin-bottom: 2rem; color: var(--primary-color); border-bottom: 2px solid var(--border-color); padding-bottom: 0.5rem;">Featured Graduation Decor</h3>
                <div class="grid">
                    ${gradSpecific.map(item => renderItemCard(item)).join('')}
                </div>
            </div>

            <div class="mt-2">
                <h3 style="margin-bottom: 2rem; color: var(--primary-color); border-bottom: 2px solid var(--border-color); padding-bottom: 0.5rem;">Party Essentials You'll Need</h3>
                <div class="grid">
                    ${essentials.map(item => renderItemCard(item)).join('')}
                </div>
            </div>
        </div>
    `;
}

function renderItemCard(item) {
    const cartItem = cart.find(i => i.id === item.id);
    const qty = cartItem ? cartItem.quantity : 0;

    let actionHtml = '';
    if (qty > 0) {
        actionHtml = `
            <div class="quantity-controls" style="background: var(--bg-color); border: 1px solid var(--border-color); display: inline-flex;">
                <button class="quantity-btn" onclick="changeQty(${item.id}, -1)">-</button>
                <input type="number" min="0" value="${qty}" style="width: 40px; text-align: center; background: transparent; border: none; color: var(--text-primary); font-family: var(--font-family); font-size: 1rem; -moz-appearance: textfield;" onchange="setQty(${item.id}, this.value)">
                <button class="quantity-btn" onclick="changeQty(${item.id}, 1)">+</button>
            </div>
        `;
    } else {
        actionHtml = `<button class="btn btn-primary" onclick="handleAddToCart(${item.id})">Add to Cart</button>`;
    }

    let priceDisplay = typeof item.price === 'number' ? `$${item.price}` : item.price;
    let priceStyle = '';
    if (item.id === 4) {
        priceDisplay = `$2.00 (<30)<br/>$1.50 (30+)`;
        priceStyle = 'font-size: 0.85em; line-height: 1.2; text-align: left;';
    } else if (item.price === 'Varies') {
        priceStyle = 'color: var(--primary-color); font-weight: 700;';
    }

    return `
        <div class="card">
            <div class="card-img-wrapper">
                <img loading="lazy" src="${item.img}" alt="${item.title}" onerror="this.onerror=null;this.src='https://via.placeholder.com/300?text=Image+Not+Found'"/>
            </div>
            <div class="card-body">
                <h3 class="card-title">${item.title}</h3>
                <p class="card-desc">${item.desc}</p>
                <div class="card-footer">
                    <span class="price" style="${priceStyle}">${priceDisplay}</span>
                    <div id="action-controls-${item.id}">${actionHtml}</div>
                </div>
            </div>
        </div>
    `;
}

// Helper for Mobile Sticky Actions
function initStickyObserver(targetId, actionText, actionFnStr) {
    const stickyContainer = document.getElementById('sticky-action-container');
    const targetBtn = document.getElementById(targetId);

    if (!stickyContainer) return;

    if (!targetBtn) {
        stickyContainer.classList.remove('visible');
        return;
    }

    // Set content
    stickyContainer.innerHTML = `<button class="btn btn-primary" onclick="${actionFnStr}">${actionText}</button>`;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Show sticky if target is NOT intersecting (off-screen)
            if (entry.isIntersecting) {
                stickyContainer.classList.remove('visible');
            } else {
                stickyContainer.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    observer.observe(targetBtn);
}

function renderConfirmation() {
    setTimeout(() => {
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    }, 100);

    return `
        <div class="container text-center" style="padding: 4rem 2rem;">
            <div style="color: var(--primary-color); margin-bottom:1rem;">
                <i data-feather="check-circle" style="width: 64px; height: 64px;"></i>
            </div>
            <h2 class="section-title">Request Prepared!</h2>
            <p class="section-subtitle">Your email client has been opened to send the rental request to us. We will contact you shortly to confirm availability and coordinate payment in person.</p>
            
            <div style="margin-top: 3rem; background: var(--surface-color); padding: 2.5rem; border-radius: 12px; border: 1px dashed var(--primary-color); max-width: 600px; margin-left: auto; margin-right: auto;">
                <h3 style="margin-bottom: 1rem; color: var(--text-primary); font-size: 1.5rem;">How was your experience?</h3>
                <p style="margin-bottom: 1.5rem; color: var(--text-secondary); font-size: 1.1rem;">We'd love to hear from you. Please consider leaving us a review on Google!</p>
                <a href="https://g.page/r/CXcHwjVlRTQIEBM/review" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 8px;">
                    <i data-feather="star"></i> Leave a Google Review
                </a>
            </div>

            <div style="margin-top: 3rem;">
                <a href="#" class="btn btn-outline">Back to Home</a>
            </div>
        </div>
    `;
}

// Router
function router(preserveScroll = false) {
    const hash = window.location.hash || '#';
    const main = document.getElementById('main-content');

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === hash || (hash === '#' && link.getAttribute('href') === '#')) {
            link.classList.add('active');
        }
    });

    let content = '';
    let pageTitle = 'Petals Paradise Events | Event Decor & Party Rentals DMV';
    let metaDesc = 'Transform your celebrations into unforgettable moments with Petals Paradise Events. Premium party rentals, elegant backdrops, and custom decor in the DMV area.';

    switch (hash) {
        case '#': 
            content = renderHome(); 
            break;
        case '#rentals': 
            content = renderRentals(); 
            pageTitle = 'Party & Event Rentals | Petals Paradise Events';
            metaDesc = 'Explore our wide range of event rentals including rectangular folding tables, gold chairs, tents, and traditional backdrops.';
            break;
        case '#graduation': 
            content = renderGraduation(); 
            pageTitle = 'Graduation Party Decor 2026 | Petals Paradise Events';
            metaDesc = 'Make your 2026 graduation unforgettable with marquee letters, custom setups, and party essentials.';
            break;
        case '#services': 
            content = renderServices(); 
            pageTitle = 'Our Event Services | Petals Paradise Events';
            metaDesc = 'From weddings to housewarmings, we offer comprehensive decor solutions tailored to your unique celebration.';
            break;
        case '#gallery': 
            content = renderGallery(); 
            pageTitle = 'Event Inspiration Gallery | Petals Paradise Events';
            metaDesc = 'View our portfolio of beautiful event setups, traditional Seemantham backdrops, and graduation celebrations.';
            break;
        case '#videos': 
            content = renderVideos(); 
            pageTitle = 'Video Highlights | Petals Paradise Events';
            metaDesc = 'Watch our event decor in action through cinematic video highlights of our latest setups.';
            break;
        case '#contact': 
            content = renderContact(); 
            pageTitle = 'Contact Us | Petals Paradise Events';
            metaDesc = 'Get a custom quote for your next event. Contact Petals Paradise Events for premium decor and rentals in DMV.';
            break;
        case '#cart': 
            content = renderCart(); 
            pageTitle = 'Your Rental Cart | Petals Paradise Events';
            break;
        case '#checkout': 
            content = renderCheckout(); 
            pageTitle = 'Secure Checkout | Petals Paradise Events';
            break;
        case '#confirmation':
            content = renderConfirmation();
            pageTitle = 'Order Confirmed | Petals Paradise Events';
            break;
        default: 
            content = renderHome();
    }

    document.title = pageTitle;
    const metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (metaDescriptionTag) {
        metaDescriptionTag.setAttribute('content', metaDesc);
    }

    main.innerHTML = content;
    feather.replace(); // Re-initialize icons

    // Reset Sticky Mobile Actions
    const stickyContainer = document.getElementById('sticky-action-container');
    if (stickyContainer) stickyContainer.classList.remove('visible');

    // Initialize Sticky Observers based on page
    if (hash === '#cart') {
        setTimeout(() => initStickyObserver('cart-checkout-btn', 'Proceed to Checkout', "window.location.hash = '#checkout'"), 200);
    } else if (hash === '#checkout') {
        setTimeout(() => initStickyObserver('checkout-submit-btn', 'Submit Rental Request', "document.getElementById('checkout-submit-btn').click()"), 200);
    }


    if (!preserveScroll) {
        window.scrollTo(0, 0); // Scroll to top on page change
    }

}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    renderBanner();
    renderNavbar();
    renderFooter();
    router();
    window.addEventListener('hashchange', router);
    renderSMSWidget();
    initImageModal();
});

function initImageModal() {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.modal-close');

    if (!modal || !modalImg) return;

    // Global listener for image clicks
    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG' && !e.target.classList.contains('no-zoom') && !e.target.closest('.sms-btn')) {
            modal.classList.add('active');
            modalImg.src = e.target.src;
            document.body.style.overflow = 'hidden'; // Prevent scroll
        }
    });

    // Close modal
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

function renderSMSWidget() {
    if (document.getElementById('sms-widget')) return;
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const bodySeparator = isIOS ? '&' : '?';
    const bodyText = encodeURIComponent("Hi Petals Paradise Events! I'm interested in your event decor rentals for an upcoming event. Could you please help me?");
    const smsHref = `sms:+18484486993${bodySeparator}body=${bodyText}`;

    const widget = document.createElement('div');
    widget.id = 'sms-widget';
    widget.innerHTML = `
        <a href="${smsHref}" class="sms-btn" title="Text us">
            <div class="sms-pulsate"></div>
            <i data-feather="message-square" style="width: 28px; height: 28px;"></i>
            <span class="sms-text">Text Petals Paradise Events</span>
        </a>
    `;
    document.body.appendChild(widget);
    if (window.feather) feather.replace();
}
