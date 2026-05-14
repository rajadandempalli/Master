document.addEventListener('DOMContentLoaded', () => {
    const loginScreen = document.getElementById('login-screen');
    const dashboardScreen = document.getElementById('dashboard-screen');
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    const logoutBtn = document.getElementById('logout-btn');
    const newOrderForm = document.getElementById('new-order-form');
    const ordersTableBody = document.getElementById('orders-table-body');
    
    // Stats
    const statPickups = document.getElementById('stat-pickups');
    const statReturns = document.getElementById('stat-returns');

    // Simple Authentication Check (Placeholder - Not secure for production)
    const ACCESS_CODE = "admin123"; // Easy placeholder

    if (localStorage.getItem('admin_auth') === 'true') {
        showDashboard();
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pwd = document.getElementById('admin-password').value;
        if (pwd === ACCESS_CODE) {
            localStorage.setItem('admin_auth', 'true');
            showDashboard();
            loginError.style.display = 'none';
        } else {
            loginError.style.display = 'block';
        }
    });

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('admin_auth');
        loginScreen.style.display = 'flex';
        dashboardScreen.style.display = 'none';
        document.getElementById('admin-password').value = '';
    });

    function showDashboard() {
        loginScreen.style.display = 'none';
        dashboardScreen.style.display = 'block';
        loadOrders();
    }

    // Database Logic (Using LocalStorage for prototype)
    function getOrders() {
        const data = localStorage.getItem('petals_orders');
        return data ? JSON.parse(data) : [];
    }

    function saveOrder(order) {
        const orders = getOrders();
        orders.push(order);
        localStorage.setItem('petals_orders', JSON.stringify(orders));
        loadOrders();
    }

    function deleteOrder(id) {
        let orders = getOrders();
        orders = orders.filter(o => o.id !== id);
        localStorage.setItem('petals_orders', JSON.stringify(orders));
        loadOrders();
    }
    
    // Make delete function global for inline onclick
    window.deleteOrder = deleteOrder;

    newOrderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newOrder = {
            id: Date.now().toString(),
            name: document.getElementById('cust-name').value,
            contact: document.getElementById('cust-contact').value,
            items: document.getElementById('rental-items').value,
            pickupDate: document.getElementById('pickup-date').value,
            pickupTime: document.getElementById('pickup-time').value,
            returnDate: document.getElementById('return-date').value,
            createdAt: new Date().toISOString()
        };

        saveOrder(newOrder);
        newOrderForm.reset();
    });

    function loadOrders() {
        const orders = getOrders();
        ordersTableBody.innerHTML = '';
        
        let pickupsThisWeek = 0;
        let returnsPending = 0;
        const today = new Date();
        today.setHours(0,0,0,0);

        // Sort by pickup date ascending
        orders.sort((a, b) => new Date(a.pickupDate) - new Date(b.pickupDate));

        orders.forEach(order => {
            const pDate = new Date(order.pickupDate);
            const rDate = new Date(order.returnDate);
            
            // Calculate stats logic
            if (pDate >= today && pDate <= new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)) {
                pickupsThisWeek++;
            }
            if (rDate >= today) {
                returnsPending++;
            }

            // Status Badge
            let statusBadge = '';
            if (today < pDate) {
                statusBadge = '<span class="status-badge status-pickup">Upcoming Pickup</span>';
            } else if (today >= pDate && today <= rDate) {
                statusBadge = '<span class="status-badge status-return">Active Rental</span>';
            } else {
                statusBadge = '<span class="status-badge" style="background: var(--border-color); color: var(--text-secondary);">Completed</span>';
            }

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <strong>${order.name}</strong><br>
                    <span style="font-size: 0.8rem; color: var(--text-secondary);">${order.contact}</span>
                </td>
                <td>${order.items}</td>
                <td>
                    ${pDate.toLocaleDateString()}<br>
                    <span style="font-size: 0.8rem; color: var(--text-secondary);">${order.pickupTime || 'Time TBD'}</span>
                </td>
                <td>${rDate.toLocaleDateString()}</td>
                <td>
                    ${statusBadge}
                    <button onclick="deleteOrder('${order.id}')" style="background:none; border:none; color: #ff4757; cursor:pointer; margin-left: 10px;" title="Delete">
                        <i data-feather="trash-2" style="width: 16px; height: 16px;"></i>
                    </button>
                </td>
            `;
            ordersTableBody.appendChild(tr);
        });

        statPickups.textContent = pickupsThisWeek;
        statReturns.textContent = returnsPending;
        
        if (window.feather) feather.replace();
    }
});
