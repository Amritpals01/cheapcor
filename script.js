// Load products from localStorage
let products = [];

function loadProducts() {
    const stored = localStorage.getItem('cheapCornerProducts');
    if (stored) {
        products = JSON.parse(stored);
    } else {
        // Default products if none exist
        products = [
            { id: 1, name: 'UV Protection Arm Sleeves', category: 'clothing', price: 299, image: '' },
            { id: 2, name: 'Premium Cotton T-Shirt', category: 'clothing', price: 499, image: '' },
            { id: 3, name: 'Designer Dress', category: 'clothing', price: 899, image: '' },
            { id: 4, name: 'Casual Button Shirt', category: 'clothing', price: 599, image: '' },
            { id: 5, name: 'Sports Towel - Pink', category: 'clothing', price: 249, image: '' },
            { id: 6, name: 'Jockey Sports Towel', category: 'undergarments', price: 349, image: '' },
            { id: 7, name: 'Premium Gym Towel', category: 'undergarments', price: 399, image: '' },
            { id: 8, name: 'Cooling Towel Blue', category: 'undergarments', price: 299, image: '' },
            { id: 9, name: 'Workout Towel Set', category: 'undergarments', price: 549, image: '' },
            { id: 10, name: 'Denver Perfume Collection', category: 'fragrance', price: 599, image: '' },
            { id: 11, name: 'Denver Premium Cologne', category: 'fragrance', price: 799, image: '' },
            { id: 12, name: 'Denver Luxury Perfume', category: 'fragrance', price: 899, image: '' },
            { id: 13, name: 'Denver Gift Set', category: 'fragrance', price: 1299, image: '' }
        ];
    }
}

function createProductCard(product) {
    const imageHTML = product.image 
        ? `<img src="${product.image}" alt="${product.name}">`
        : `<span class="placeholder-icon">📷</span>`;
    
    return `
        <div class="product-card reveal" onclick="viewProduct(${product.id})">
            <div class="product-image">
                ${imageHTML}
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-price">₹${product.price}</div>
                <a href="#" class="whatsapp-btn" onclick="event.stopPropagation(); orderOnWhatsApp(${product.id}); return false;">
                    <span></span> Order Now
                </a>
            </div>
        </div>
    `;
}

function renderCategoryProducts() {
    const clothingProducts = products.filter(p => p.category === 'clothing').slice(0, 4);
    const undergarmentProducts = products.filter(p => p.category === 'undergarments');
    const fragranceProducts = products.filter(p => p.category === 'fragrance');

    document.getElementById('clothingGrid').innerHTML = clothingProducts.map(createProductCard).join('');
    document.getElementById('undergarmentsGrid').innerHTML = undergarmentProducts.map(createProductCard).join('');
    document.getElementById('fragranceGrid').innerHTML = fragranceProducts.map(createProductCard).join('');

    setTimeout(() => {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach((el, i) => {
            setTimeout(() => {
                el.classList.add('active');
            }, i * 100);
        });
    }, 100);
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    document.getElementById('navLinks').classList.remove('active');
}

function filterAndScroll(category) {
    scrollToSection(category + '-section');
}

function showAllProducts() {
    scrollToSection('clothing-section');
    document.querySelectorAll('.category-pill').forEach(pill => {
        pill.classList.remove('active');
    });
    event.target.classList.add('active');
}

function orderOnWhatsApp(productId) {
    const product = products.find(p => p.id === productId);
    const message = `Hi! I'm interested in ordering:\n\n${product.name}\nPrice: ₹${product.price}\nCategory: ${product.category}`;
    
    // Get WhatsApp number from settings or use default
    const phoneNumber = localStorage.getItem('whatsappNumber') || '+919988009491';
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
    
    const notification = document.getElementById('notification');
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

function openWhatsApp() {
    const phoneNumber = localStorage.getItem('whatsappNumber') || '+919988009491';
    const message = 'Hi! I would like to know more about your products.';
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

function viewProduct(productId) {
    const product = products.find(p => p.id === productId);
    const message = `${product.name}\nPrice: ₹${product.price}\n\nClick "ORDER NOW" to purchase via WhatsApp`;
    alert(message);
}

function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

// Initialize
loadProducts();
renderCategoryProducts();

// Scroll reveal
window.addEventListener('scroll', () => {
    const reveals = document.querySelectorAll('.reveal:not(.active)');
    reveals.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        if (isVisible) {
            el.classList.add('active');
        }
    });
});

// Parallax effect for hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});