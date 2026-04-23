// State Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    if (window.location.hash === '#cart' || window.location.hash === '#checkout') {
        if (typeof router === 'function') router();
    } else if (window.location.hash === '#rentals') {
        if (typeof refreshRentalsUI === 'function') refreshRentalsUI();
    }
}

function showToast(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i data-feather="check-circle" style="color: var(--primary-color)"></i> <span>${message}</span>`;

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
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    saveCart();
    showToast(`Added ${item.title} to cart!`);
}

function getItemPrice(item) {
    if (item.id === 4 && item.quantity >= 30) {
        return 1.5;
    }
    return item.price;
}

function getItemTotal(item) {
    return getItemPrice(item) * item.quantity;
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + getItemTotal(item), 0);
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart();
}

function updateQuantity(id, change) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            saveCart();
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

    if (qty <= 0) {
        removeFromCart(id);
        return;
    }

    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity = qty;
        saveCart();
    }
}

// Data
const rentalItems = [
    { id: 1, title: 'Round Fold-In-Half Table', price: 12, img: 'https://petalsparadiseevents.com/wp-content/uploads/2025/05/Screen-Shot-2025-05-12-at-5.19.35-PM.png', desc: 'Perfect Table to match any occasion and theme (60" x 29.8").' },
    { id: 2, title: 'Cocktail Table (With Cloths)', price: 11, img: 'https://petalsparadiseevents.com/wp-content/uploads/2025/12/image.png', desc: 'Elegant cocktail tables with black/white cloths.' },
    { id: 3, title: 'Adult Folding Table Rental', price: 8, img: 'https://petalsparadiseevents.com/wp-content/uploads/2025/04/Tables.webp', desc: 'Perfect seating to match any occasion and theme.' },
    { id: 4, title: 'Adult Folding Chair', price: 2, img: 'https://petalsparadiseevents.com/wp-content/uploads/2025/04/Chairs.webp', desc: 'Perfect seating for any occasion. Note: Bulk discount! $1.50 each when renting 30 or more.' },
    { id: 5, title: 'Wedding Tent (16x26)', price: 150, img: 'https://petalsparadiseevents.com/wp-content/uploads/2026/04/image.png', desc: 'Light weight yet sturdy, high quality yet affordable tent.' },
    { id: 6, title: 'Round Cylinder Pedestal Display', price: 30, img: 'https://petalsparadiseevents.com/wp-content/uploads/2025/05/Screen-Shot-2025-05-11-at-9.53.07-PM.png', desc: 'Set of 5 pedestals with gold/white covers for grand displays.' },
    { id: 7, title: 'Buffet Food Warmers', price: 10, img: 'https://petalsparadiseevents.com/wp-content/uploads/2025/04/Buffet-Food-Warmers.webp', desc: 'Let your guests enjoy every bite at the perfect temperature.' },
    { id: 8, title: 'Loveseat for rental', price: 100, img: 'https://petalsparadiseevents.com/wp-content/uploads/2026/03/IMG_1048-scaled.jpg', desc: 'Perfect for parties, baby showers, weddings, and more. Visit our website to explore our full range of rental items.' },
    { id: 9, title: 'Elegant Hand-Carved Accent Chair', price: 75, img: 'https://petalsparadiseevents.com/wp-content/uploads/2025/12/IMG_0755-1-scaled.jpg', desc: 'Perfect as accent seating for special event décor or baby showers.' },
    { id: 10, title: 'Haldi Urli`s', price: 125, img: 'https://petalsparadiseevents.com/wp-content/uploads/2025/09/image-edited.png', desc: 'Haldi / Maiyan Tub / Urli. Vibrant and traditional backdrops.' },
    { id: 11, title: 'Pipe and Drape Backdrop Stand', price: 50, img: 'https://petalsparadiseevents.com/wp-content/uploads/2025/04/image-10.png', desc: 'Heavy Duty Double Crossbar Stand for Trade Shows and Decor.' },
    { id: 12, title: 'GRAD Marquee Letters', price: 30, img: 'https://petalsparadiseevents.com/wp-content/uploads/2025/12/image-1.png', desc: 'Lighted GRAD marquee letters for rent.' },
    { id: 13, title: '4FT Marquee Numbers', price: 20, img: 'https://petalsparadiseevents.com/wp-content/uploads/2025/07/image-7.png', desc: 'Giant Marquee Numbers for birthdays, anniversaries, or graduations.' },
    { id: 14, title: 'Photo/Any Event Backdrop', price: 150, img: 'https://petalsparadiseevents.com/wp-content/uploads/2025/06/image-2.png', desc: 'Celebrate the beauty of your Mehendi ceremony with our elegant and artistic backdrops, perfect for creating a stunning photo-worthy setting.' },
    { id: 15, title: 'New Born Baby Photo Prop', price: 20, img: 'https://petalsparadiseevents.com/wp-content/uploads/2025/05/Baby-backdrop-1-scaled.jpg', desc: 'Dreamy Moon Swing Photo Prop for cozy gatherings.' }
];

const services = [
    { title: 'Wedding Party', desc: 'From breathtaking floral arrangements to elegant backdrops, we craft the perfect ambiance for your special day.', img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
    { title: 'HouseWarming', desc: 'Elegant décor and personalized styling for your housewarming party, creating a warm and welcoming ambiance.', img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
    { title: 'Birthday Party', desc: 'From vibrant balloon garlands to elegant tablescapes, we create magical setups tailored to your theme.', img: 'https://images.unsplash.com/photo-1530103862676-de3c9de59a9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
    { title: 'Baby Shower', desc: 'Dreamy and elegant décor featuring soft pastels, enchanting backdrops, and custom-themed setups.', img: 'https://images.unsplash.com/photo-1566207137358-1545465c4015?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' }
];

// Rendering Layout
function renderNavbar() {
    const nav = document.getElementById('navbar');
    nav.innerHTML = `
        <a href="#" class="logo-text">Petals Paradise Events</a>
        <div class="nav-links">
            <a href="#" class="nav-link">Home</a>
            <a href="#rentals" class="nav-link">Rentals</a>
            <a href="#services" class="nav-link">Services</a>
            <a href="#videos" class="nav-link">Videos</a>
            <a href="#gallery" class="nav-link">Gallery</a>
            <a href="#contact" class="nav-link">Contact Us</a>
        </div>
        <a href="#cart" class="cart-icon-container">
            <i data-feather="shopping-bag"></i>
            <span id="cart-badge" class="cart-badge">0</span>
        </a>
    `;
    feather.replace();
    updateCartBadge();
}

function renderFooter() {
    const footer = document.getElementById('footer');
    footer.innerHTML = `
        <div class="footer-grid">
            <div class="footer-col">
                <h3>Petals Paradise Events</h3>
                <p>Crafting Unforgettable Moments with elegant decor and personalized touches for every occasion in the DMV area.</p>
                <div class="social-links">
                    <a href="#"><i data-feather="facebook"></i></a>
                    <a href="#"><i data-feather="instagram"></i></a>
                    <a href="#"><i data-feather="message-circle"></i></a>
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
                <p><i data-feather="phone" style="width:16px; margin-right:8px;"></i> +1 848-448-6993</p>
                <p><i data-feather="mail" style="width:16px; margin-right:8px;"></i> contact@petalsparadiseevents.com</p>
                <p><i data-feather="map-pin" style="width:16px; margin-right:8px;"></i> 25025 Coats Sq, Aldie, VA, 20105</p>
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
                <a href="#rentals" class="btn btn-primary">Explore Rentals</a>
                <a href="#contact" class="btn btn-outline" style="margin-left: 1rem;">Contact Us</a>
            </div>
        </section>
        
        <section class="container mt-2">
            <div class="text-center">
                <h2 class="section-title">Our Featured Services</h2>
                <p class="section-subtitle">Let us add a touch of paradise to your next celebration.</p>
            </div>
            <div class="grid">
                ${services.slice(0, 3).map(s => `
                    <div class="card">
                        <div class="card-img-wrapper">
                            <img src="${s.img}" alt="${s.title}">
                        </div>
                        <div class="card-body">
                            <h3 class="card-title">${s.title}</h3>
                            <p class="card-desc">${s.desc}</p>
                            <a href="#services" class="btn btn-outline" style="width:100%; text-align:center;">Learn More</a>
                        </div>
                    </div>
                `).join('')}
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
}

function renderRentals() {
    window.handleAddToCart = (id) => {
        const item = rentalItems.find(i => i.id === id);
        addToCart(item);
    };
    window.changeQty = updateQuantity;
    window.setQty = setQuantity;

    return `
        <div class="container">
            <div class="text-center">
                <h2 class="section-title">Event Rentals</h2>
                <p class="section-subtitle">Browse our exquisite collection of decor items available for rent to elevate your event.</p>
            </div>
            <div class="grid">
                ${rentalItems.map(item => {
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

        let priceDisplay = `$${item.price}`;
        let priceStyle = '';
        if (item.id === 4) {
            priceDisplay = `$2.00 (<30)<br/>$1.50 (30+)`;
            priceStyle = 'font-size: 0.85em; line-height: 1.2; text-align: left;';
        }

        return `
                    <div class="card">
                        <div class="card-img-wrapper">
                            <img src="${item.img}" alt="${item.title}">
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
    }).join('')}
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
                            <img src="${s.img}" alt="${s.title}">
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
    const images = [
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed',
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc',
        'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3',
        'https://images.unsplash.com/photo-1519167758481-83f550bb49b3',
        'https://images.unsplash.com/photo-1478146896981-b80fe463b330',
        'https://images.unsplash.com/photo-1530103862676-de3c9de59a9e'
    ].map(url => url + '?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80');

    return `
        <div class="container">
            <div class="text-center">
                <h2 class="section-title">Gallery</h2>
                <p class="section-subtitle">A glimpse into the magical moments we've created.</p>
            </div>
            <div class="grid">
                ${images.map(img => `
                    <div class="card-img-wrapper" style="border-radius: 12px;">
                        <img src="${img}" alt="Gallery Image" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; cursor: pointer;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderVideos() {
    return `
        <div class="container">
            <div class="text-center">
                <h2 class="section-title">Videos</h2>
                <p class="section-subtitle">Watch our beautiful decor setups come to life.</p>
            </div>
            <div class="empty-state">
                <i data-feather="video"></i>
                <h3>More videos coming soon!</h3>
                <p style="color: var(--text-secondary); margin-top:1rem;">Follow us on Instagram to see our latest reels.</p>
                <a href="#" class="btn btn-primary mt-2">View Instagram</a>
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
                        <p style="margin-bottom: 1rem;"><i data-feather="phone"></i> +1 848-448-6993</p>
                        <p style="margin-bottom: 1rem;"><i data-feather="mail"></i> contact@petalsparadiseevents.com</p>
                        <p style="margin-bottom: 1rem;"><i data-feather="map-pin"></i> 25025 Coats Sq, Aldie, VA, 20105</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderCart() {
    window.changeQty = updateQuantity;
    window.removeItem = removeFromCart;
    window.setQty = setQuantity;

    if (cart.length === 0) {
        return `
            <div class="container">
                <h2 class="section-title">Your Cart</h2>
                <div class="empty-state">
                    <i data-feather="shopping-bag"></i>
                    <h3>Your cart is empty</h3>
                    <p style="color: var(--text-secondary); margin-top:1rem;">Browse our rentals to add items.</p>
                    <a href="#rentals" class="btn btn-primary mt-2">View Rentals</a>
                </div>
            </div>
        `;
    }

    const total = getCartTotal();

    return `
        <div class="container">
            <h2 class="section-title">Your Cart</h2>
            <div class="cart-layout">
                <div>
                    ${cart.map(item => `
                        <div class="cart-item">
                            <img src="${item.img}" alt="${item.title}">
                            <div class="cart-item-info">
                                <h4 class="cart-item-title">${item.title}</h4>
                                <p style="color: var(--primary-color); font-weight:600;">$${getItemPrice(item)}${item.id === 4 && item.quantity >= 30 ? " <small style='font-size: 0.8em; color: var(--text-secondary);'>(Bulk Rate)</small>" : ""}</p>
                            </div>
                            <div class="quantity-controls">
                                <button class="quantity-btn" onclick="changeQty(${item.id}, -1)">-</button>
                                <input type="number" min="0" value="${item.quantity}" style="width: 40px; text-align: center; background: transparent; border: none; color: var(--text-primary); font-family: var(--font-family); font-size: 1rem; -moz-appearance: textfield;" onchange="setQty(${item.id}, this.value)">
                                <button class="quantity-btn" onclick="changeQty(${item.id}, 1)">+</button>
                            </div>
                            <button class="remove-btn" onclick="removeItem(${item.id})">
                                <i data-feather="trash-2"></i>
                            </button>
                        </div>
                    `).join('')}
                </div>
                <div class="cart-summary">
                    <h3 style="margin-bottom: 1.5rem;">Order Summary</h3>
                    <div class="summary-row">
                        <span>Items (${cart.reduce((s, i) => s + i.quantity, 0)})</span>
                        <span>$${total}</span>
                    </div>
                    <p style="color: var(--text-secondary); font-size:0.9rem; margin-bottom:1rem;">* Payment will be collected in person.</p>
                    <div class="summary-total">
                        <span>Total Estimate:</span>
                        <span style="float:right;">$${total}</span>
                    </div>
                    <a href="#checkout" class="btn btn-primary" style="width: 100%; text-align:center; margin-top:1.5rem;">Proceed to Checkout</a>
                </div>
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

        let body = `New Rental Request:\n\n`;
        body += `Name: ${details.name}\n`;
        body += `Email: ${details.email}\n`;
        body += `Phone: ${details.phone}\n`;
        body += `Event Date: ${details.date}\n`;
        body += `Location: ${details.location}\n`;
        body += `Pick Up: ${details.pickup_date} at ${details.pickup_time}\n`;
        body += `Drop Off: ${details.dropoff_date} at ${details.dropoff_time}\n\n`;
        body += `Items Requested:\n`;

        let total = 0;
        cart.forEach(item => {
            body += `- ${item.quantity}x ${item.title} ($${getItemTotal(item)})\n`;
            total += getItemTotal(item);
        });
        body += `\nEstimated Total: $${total}`;

        const subject = encodeURIComponent(`Rental Request: ${details.name} - ${details.date}`);
        window.location.href = `mailto:contact@petalsparadiseevents.com?subject=${subject}&body=${encodeURIComponent(body)}`;

        cart = [];
        saveCart();

        const main = document.getElementById('main-content');
        main.innerHTML = `
            <div class="container text-center" style="padding: 4rem 2rem;">
                <div style="color: var(--primary-color); margin-bottom:1rem;">
                    <i data-feather="check-circle" style="width: 64px; height: 64px;"></i>
                </div>
                <h2 class="section-title">Request Prepared!</h2>
                <p class="section-subtitle">Your email client has been opened to send the rental request to us. We will contact you shortly to confirm availability and coordinate payment in person.</p>
                <a href="#" class="btn btn-primary mt-2">Back to Home</a>
            </div>
        `;
        feather.replace();
    };

    return `
        <div class="container">
            <h2 class="section-title">Checkout</h2>
            <div class="cart-layout">
                <div class="cart-summary" style="position: static;">
                    <h3 style="margin-bottom: 1.5rem;">Event Details</h3>
                    <form onsubmit="handleOrderSubmit(event)">
                        <div class="form-group">
                            <label class="form-label">Full Name</label>
                            <input type="text" name="name" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Email</label>
                            <input type="email" name="email" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Phone</label>
                            <input type="tel" name="phone" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Event Date</label>
                            <input type="date" name="date" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Venue Location</label>
                            <input type="text" name="location" class="form-control" required>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            <div class="form-group">
                                <label class="form-label">Pick Up Date</label>
                                <input type="date" name="pickup_date" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Pick Up Time</label>
                                <input type="time" name="pickup_time" class="form-control" required>
                            </div>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            <div class="form-group">
                                <label class="form-label">Drop Off Date</label>
                                <input type="date" name="dropoff_date" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Drop Off Time</label>
                                <input type="time" name="dropoff_time" class="form-control" required>
                            </div>
                        </div>
                        <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1.5rem;">
                            <i data-feather="info" style="width:16px; margin-right:4px; vertical-align:middle;"></i>
                            Please call us at +1 848-448-6993 if you have any questions!
                        </p>
                        <button type="submit" class="btn btn-primary" style="width: 100%;">Submit Rental Request</button>
                    </form>
                </div>
                <div class="cart-summary">
                    <h3 style="margin-bottom: 1.5rem;">Your Items</h3>
                    ${cart.map(item => `
                        <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; color:var(--text-secondary);">
                            <span>${item.quantity}x ${item.title}</span>
                            <span>$${getItemTotal(item)}</span>
                        </div>
                    `).join('')}
                    <div class="summary-total" style="margin-top: 1rem; padding-top: 1rem;">
                        <span>Total:</span>
                        <span style="float:right;">$${getCartTotal()}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Router
function router() {
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
    switch (hash) {
        case '#': content = renderHome(); break;
        case '#rentals': content = renderRentals(); break;
        case '#services': content = renderServices(); break;
        case '#gallery': content = renderGallery(); break;
        case '#videos': content = renderVideos(); break;
        case '#contact': content = renderContact(); break;
        case '#cart': content = renderCart(); break;
        case '#checkout': content = renderCheckout(); break;
        default: content = renderHome();
    }

    main.innerHTML = content;
    feather.replace(); // Re-initialize icons
    
    // Initialize date and time pickers with Flatpickr
    if (typeof flatpickr !== 'undefined') {
        flatpickr("input[type=date]", {
            altInput: true,
            altFormat: "F j, Y",
            dateFormat: "Y-m-d",
            minDate: "today"
        });
        flatpickr("input[type=time]", {
            enableTime: true,
            noCalendar: true,
            dateFormat: "h:i K" // AM/PM format
        });
    }

    window.scrollTo(0, 0); // Scroll to top on page change
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    renderNavbar();
    renderFooter();
    router();
    window.addEventListener('hashchange', router);
});
