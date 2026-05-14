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

    // --- DATABASE LOGIC ---
    // IMPORTANT: Paste your Google Apps Script Web App URL below
    const GOOGLE_APP_URL = ""; 

    async function getOrders() {
        if (!GOOGLE_APP_URL) {
            alert("Database not connected. Please add your Google Apps Script URL to admin.js");
            return [];
        }
        
        try {
            const response = await fetch(GOOGLE_APP_URL);
            const data = await response.json();
            // Map the sheet data back to our UI format
            return data.map(row => ({
                id: row.id,
                name: row.customerName,
                contact: row.contactInfo,
                items: `${row.quantity}x ${row.item}`,
                pickupDate: row.pickupDate,
                pickupTime: row.pickupTime,
                returnDate: row.returnDate
            }));
        } catch (e) {
            console.error("Error fetching data:", e);
            return [];
        }
    }

    async function saveOrder(order) {
        if (!GOOGLE_APP_URL) return;
        
        try {
            // Re-map to the sheet headers expected by the script
            await fetch(GOOGLE_APP_URL, {
                method: 'POST',
                mode: 'no-cors', // Google Apps Script requires this for cross-origin posts
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: "ADD",
                    name: order.name,
                    contact: order.contact,
                    items: order.items,
                    pickupDate: order.pickupDate,
                    pickupTime: order.pickupTime,
                    returnDate: order.returnDate
                })
            });
            setTimeout(loadOrders, 1500); // Reload after a slight delay
        } catch (e) {
            console.error("Error saving data:", e);
        }
    }

    async function deleteOrder(id) {
        if (!GOOGLE_APP_URL || !confirm("Are you sure you want to delete this order?")) return;
        
        try {
            await fetch(GOOGLE_APP_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: "DELETE", id: id })
            });
            setTimeout(loadOrders, 1500);
        } catch (e) {
            console.error("Error deleting data:", e);
        }
    }
    
    // Make delete function global for inline onclick
    window.deleteOrder = deleteOrder;

    newOrderForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = newOrderForm.querySelector('button[type="submit"]');
        submitBtn.textContent = "Saving...";
        submitBtn.disabled = true;

        const newOrder = {
            name: document.getElementById('cust-name').value,
            contact: document.getElementById('cust-contact').value,
            items: document.getElementById('rental-items').value,
            pickupDate: document.getElementById('pickup-date').value,
            pickupTime: document.getElementById('pickup-time').value,
            returnDate: document.getElementById('return-date').value
        };

        await saveOrder(newOrder);
        
        newOrderForm.reset();
        submitBtn.textContent = "Save Order";
        submitBtn.disabled = false;
    });

    async function loadOrders() {
        ordersTableBody.innerHTML = '<tr><td colspan="5" style="text-align:center;">Loading database...</td></tr>';
        
        const orders = await getOrders();
        ordersTableBody.innerHTML = '';
        
        let pickupsThisWeek = 0;
        let returnsPending = 0;
        const today = new Date();
        today.setHours(0,0,0,0);

        // Sort by pickup date ascending
        orders.sort((a, b) => new Date(a.pickupDate) - new Date(b.pickupDate));

        if (orders.length === 0) {
            ordersTableBody.innerHTML = '<tr><td colspan="5" style="text-align:center; color: var(--text-secondary);">No orders found.</td></tr>';
        }

        orders.forEach(order => {
            if (!order.id) return; // Skip empty rows

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
