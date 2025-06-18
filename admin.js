// Admin dashboard script

document.addEventListener('DOMContentLoaded', function() {
    const adminEmail = 'admin@sialkotii.rstnt.com';

    // Check if current user is admin
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.email !== adminEmail) {
        alert('Access denied. Admins only.');
        window.location.href = 'login.html';
        return;
    }

    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });

    // Load data from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];

    // Populate users table
    const usersTableBody = document.querySelector('#users-table tbody');
    usersTableBody.innerHTML = '';
    users.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.name || ''}</td>
            <td>${user.email || ''}</td>
            <td>${user.password || ''}</td>
            <td>${user.phone || ''}</td>
        `;
        usersTableBody.appendChild(tr);
    });

    // Populate orders table
    const ordersTableBody = document.querySelector('#orders-table tbody');
    ordersTableBody.innerHTML = '';
    orders.forEach(order => {
        const tr = document.createElement('tr');
        const itemsDescription = order.items.map(item => `${item.name} x${item.quantity}`).join(', ');

        // Create payment screenshot thumbnail HTML
        let paymentScreenshotHTML = '';
        if (order.paymentScreenshot) {
            paymentScreenshotHTML = `<img src="${order.paymentScreenshot}" alt="Payment Screenshot" style="max-width: 100px; max-height: 100px; cursor: pointer;" onclick="window.open('${order.paymentScreenshot}', '_blank')">`;
        } else {
            paymentScreenshotHTML = 'No Screenshot';
        }

        // Create payment status button HTML
        const paymentStatus = order.paymentStatus || 'not paid';
        const paymentStatusBtnClass = paymentStatus === 'paid' ? 'paid-btn' : 'not-paid-btn';
        const paymentStatusBtnText = paymentStatus === 'paid' ? 'Paid' : 'Not Paid';

        tr.innerHTML = `
            <td>${order.id}</td>
            <td>${getUserEmailById(order.userId)}</td>
            <td>${order.branch}</td>
            <td>${itemsDescription}</td>
            <td>${order.total}</td>
            <td>${new Date(order.date).toLocaleString()}</td>
            <td>${order.status || 'pending'}</td>
            <td>${paymentScreenshotHTML}</td>
            <td><button class="payment-status-btn ${paymentStatusBtnClass}" data-id="${order.id}">${paymentStatusBtnText}</button></td>
            <td>
                <button class="cancel-btn" data-id="${order.id}">Cancel</button>
            </td>
        `;
        ordersTableBody.appendChild(tr);
    });

    // Populate reservations table
    const reservationsTableBody = document.querySelector('#reservations-table tbody');
    reservationsTableBody.innerHTML = '';
    reservations.forEach(reservation => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${reservation.id || ''}</td>
            <td>${reservation.name || ''}</td>
            <td>${reservation.email || ''}</td>
            <td>${reservation.phone || ''}</td>
            <td>${reservation.date || ''}</td>
            <td>${reservation.time || ''}</td>
            <td>${reservation.guests || ''}</td>
            <td>${reservation.branch || ''}</td>
            <td>${reservation.specialRequests || ''}</td>
            <td>${reservation.status || 'pending'}</td>
            <td>
                <button class="cancel-btn" data-id="${reservation.id}">Cancel</button>
            </td>
        `;
        reservationsTableBody.appendChild(tr);
    });

    // Helper to get user email by userId
    function getUserEmailById(userId) {
        const user = users.find(u => u.id === userId);
        return user ? user.email : 'Unknown';
    }

    // Cancel order handler and payment status toggle handler
    ordersTableBody.addEventListener('click', function(e) {
        if (e.target.classList.contains('cancel-btn')) {
            const orderId = parseInt(e.target.getAttribute('data-id'));
            if (confirm('Are you sure you want to cancel this order?')) {
                cancelOrder(orderId);
            }
        } else if (e.target.classList.contains('payment-status-btn')) {
            const orderId = parseInt(e.target.getAttribute('data-id'));
            togglePaymentStatus(orderId, e.target);
        }
    });

    // Cancel reservation handler
    reservationsTableBody.addEventListener('click', function(e) {
        if (e.target.classList.contains('cancel-btn')) {
            const reservationId = e.target.getAttribute('data-id');
            if (confirm('Are you sure you want to cancel this reservation?')) {
                cancelReservation(reservationId);
            }
        }
    });

    function cancelOrder(orderId) {
        const index = orders.findIndex(o => o.id === orderId);
        if (index !== -1) {
            orders[index].status = 'cancelled';
            localStorage.setItem('orders', JSON.stringify(orders));
            // Update UI
            const row = ordersTableBody.querySelector(`button[data-id="${orderId}"]`).closest('tr');
            row.querySelector('td:nth-child(7)').textContent = 'cancelled';
            alert('Order cancelled successfully.');
        }
    }

    function togglePaymentStatus(orderId, button) {
        const index = orders.findIndex(o => o.id === orderId);
        if (index !== -1) {
            const currentStatus = orders[index].paymentStatus || 'not paid';
            const newStatus = currentStatus === 'paid' ? 'not paid' : 'paid';
            orders[index].paymentStatus = newStatus;
            localStorage.setItem('orders', JSON.stringify(orders));

            // Update button UI
            button.textContent = newStatus === 'paid' ? 'Paid' : 'Not Paid';
            button.classList.toggle('paid-btn', newStatus === 'paid');
            button.classList.toggle('not-paid-btn', newStatus !== 'paid');
        }
    }

    function cancelReservation(reservationId) {
        const index = reservations.findIndex(r => r.id == reservationId);
        if (index !== -1) {
            reservations[index].status = 'cancelled';
            localStorage.setItem('reservations', JSON.stringify(reservations));
            // Update UI
            const row = reservationsTableBody.querySelector(`button[data-id="${reservationId}"]`).closest('tr');
            row.querySelector('td:nth-child(10)').textContent = 'cancelled';
            alert('Reservation cancelled successfully.');
        }
    }
});
