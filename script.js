// Shared functionality across all pages
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    const loginBtn = document.getElementById('login-btn');
    
    if (loginBtn) {
        if (currentUser) {
            loginBtn.textContent = 'Logout';
            loginBtn.onclick = function(e) {
                e.preventDefault();
                localStorage.removeItem('currentUser');
                window.location.href = 'index.html';
            };
        } else {
            loginBtn.textContent = 'Login';
        }
    }
    
    // Auth tabs switching
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    if (loginTab && registerTab) {
        loginTab.addEventListener('click', function() {
            loginTab.classList.add('active');
            registerTab.classList.remove('active');
            loginForm.classList.add('active');
            registerForm.classList.remove('active');
        });
        
        registerTab.addEventListener('click', function() {
            registerTab.classList.add('active');
            loginTab.classList.remove('active');
            registerForm.classList.add('active');
            loginForm.classList.remove('active');
        });
    }
    
    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.password === password);
            
if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    alert('Login successful!');
    if (user.email === 'admin@sialkotii.rstnt.com') {
        window.location.href = 'admin.html';
    } else {
        window.location.href = 'profile.html';
    }
} else {
    alert('Invalid email or password');
}
        });
    }
    
    // Register form submission
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const phone = document.getElementById('register-phone').value;
            
            const users = JSON.parse(localStorage.getItem('users')) || [];
            
            if (users.some(u => u.email === email)) {
                alert('User with this email already exists');
                return;
            }
            
            const newUser = {
                id: Date.now(),
                name,
                email,
                password,
                phone
            };
            
users.push(newUser);
localStorage.setItem('users', JSON.stringify(users));
localStorage.setItem('currentUser', JSON.stringify(newUser));

alert('Registration successful! You are now logged in.');
window.location.href = 'profile.html';
        });
    }
    
    // Reservation form submission
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Client-side validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const guests = document.getElementById('guests').value;
            const branch = document.getElementById('branch').value;

            if (!name || !email || !phone || !date || !time || !guests || !branch) {
                alert('Please fill in all required fields.');
                return;
            }

            // Basic email format check
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Basic phone number check (digits and optional +, -, spaces)
            const phoneRegex = /^[\d+\-\s]+$/;
            if (!phoneRegex.test(phone)) {
                alert('Please enter a valid phone number.');
                return;
            }

            const reservations = JSON.parse(localStorage.getItem('reservations')) || [];

            const reservation = {
                id: Date.now(),
                name,
                email,
                phone,
                date,
                time,
                guests: parseInt(guests),
                branch,
                specialRequests: document.getElementById('special-requests').value.trim(),
                status: 'pending'
            };

            reservations.push(reservation);
            localStorage.setItem('reservations', JSON.stringify(reservations));

            alert('Table booked successfully! We look forward to serving you.');
            bookingForm.reset();
        });
    }
    
    // Order page functionality
    if (window.location.pathname.includes('order.html')) {
        // Database simulation with Unsplash images
        const menuItems = {
            "appetizers": [
                {
                    id: 1,
                    name: "Chicken Tikka",
                    description: "Tender chicken pieces marinated in yogurt and spices, grilled to perfection",
                    price: 350,
                    tags: ["protein-rich"],
                    image: "https://thafd.bing.com/th/id/OIP.tuO7Fyg-ufMWPJexCnGCqAAAAA?w=254&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                },
                {
                    id: 2,
                    name: "Vegetable Samosa",
                    description: "Crispy pastry filled with spiced potatoes and peas",
                    price: 120,
                    tags: ["vegetarian"],
                    image: "https://thafd.bing.com/th/id/OIP.aoRB9MZLxw5T3neW3G7BNwHaEf?w=288&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                },
                {
                    id: 3,
                    name: "Seekh Kebab",
                    description: "Minced lamb mixed with herbs and spices, grilled on skewers",
                    price: 400,
                    tags: ["protein-rich"],
                    image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143"
                }
            ],
            "main-courses": [
                {
                    id: 4,
                    name: "Butter Chicken",
                    description: "Tender chicken in a rich tomato and butter sauce",
                    price: 550,
                    tags: ["protein-rich"],
                    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398"
                },
                {
                    id: 5,
                    name: "Paneer Tikka Masala",
                    description: "Grilled cottage cheese in a creamy tomato sauce",
                    price: 450,
                    tags: ["vegetarian"],
                    image: "https://thafd.bing.com/th/id/OIP.WgK16QECU-vZ6r44TTerGgHaF4?w=231&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                }
            ],
            "biryani-rice": [
                {
                    id: 6,
                    name: "Chicken Biryani",
                    description: "Fragrant basmati rice cooked with chicken and aromatic spices",
                    price: 500,
                    tags: ["protein-rich"],
                    image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a"
                },
                {
                    id: 7,
                    name: "Vegetable Pulao",
                    description: "Basmati rice cooked with mixed vegetables and mild spices",
                    price: 350,
                    tags: ["vegetarian"],
                    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b"
                }
            ],
            "breads": [
                {
                    id: 8,
                    name: "Garlic Naan",
                    description: "Soft leavened bread with garlic butter",
                    price: 80,
                    tags: ["artisan"],
                    image: "https://thafd.bing.com/th/id/OIP.VGBvBSYwh1avqtbti5bJwQHaHa?w=204&h=204&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                },
                {
                    id: 9,
                    name: "Roti",
                    description: "Whole wheat flatbread",
                    price: 30,
                    tags: ["organic"],
                    image: "https://thafd.bing.com/th/id/OIP.UKMLKzPzGeRf3FjBfTEphAHaE3?w=305&h=200&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                }
            ],
            "desserts": [
                {
                    id: 10,
                    name: "Gulab Jamun",
                    description: "Deep-fried milk balls soaked in sugar syrup",
                    price: 120,
                    tags: ["sweet"],
                    image: "https://thafd.bing.com/th/id/OIP.B32bansRI7RS3yfbUSEBNwHaHa?w=197&h=197&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                },
                {
                    id: 11,
                    name: "Kheer",
                    description: "Rice pudding with nuts and cardamom",
                    price: 150,
                    tags: ["creamy"],
                    image: "https://thafd.bing.com/th/id/OIP.NH6WQMkjF3FJpGlXlYI4cwHaE7?w=269&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                }
            ],
            "beverages": [
                {
                    id: 12,
                    name: "Mango Lassi",
                    description: "Refreshing yogurt drink with mango",
                    price: 150,
                    tags: ["refreshing"],
                    image: "https://thafd.bing.com/th/id/OIP.5ZUPBHdbU3wcvWnExJivFAHaLH?w=206&h=305&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                },
                {
                    id: 13,
                    name: "Masala Chai",
                    description: "Spiced Indian tea",
                    price: 80,
                    tags: ["herbal"],
                    image: "https://thafd.bing.com/th/id/OIP.asR3iayZAhO3ZIh733e4LwHaLG?w=126&h=189&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                }
            ]
        };
        
        // Check URL for branch parameter
        const urlParams = new URLSearchParams(window.location.search);
        const branchParam = urlParams.get('branch');
        
        // DOM Elements
        const branchSelection = document.getElementById('branch-selection');
        const menuSection = document.getElementById('menu-section');
        const branchName = document.getElementById('branch-name');
        const changeBranchBtn = document.getElementById('change-branch');
        const menuItemsContainer = document.getElementById('menu-items-container');
        const categoryButtons = document.querySelectorAll('.category-btn');
        const cartBtn = document.getElementById('cart-btn');
        const cartCount = document.getElementById('cart-count');
        const cartModal = document.getElementById('cart-modal');
        const closeCartModal = document.getElementById('close-cart-modal');
        const cartItemsContainer = document.getElementById('cart-items-container');
        const cartTotal = document.getElementById('cart-total');
        const cartBranchName = document.getElementById('cart-branch-name');
        const checkoutBtn = document.getElementById('checkout-btn');
        
        // State
        let currentBranch = null;
        let currentCategory = 'appetizers';
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Initialize
        if (branchParam) {
            // Show menu for selected branch
            currentBranch = branchParam;
            showMenuForBranch(currentBranch);
        } else {
            // Show branch selection
            branchSelection.style.display = 'block';
            menuSection.style.display = 'none';
        }
        
        // Event listeners for branch selection
        document.querySelectorAll('.select-branch').forEach(button => {
            button.addEventListener('click', function() {
                const branchCard = this.closest('.branch-card');
                currentBranch = branchCard.dataset.branch;
                showMenuForBranch(currentBranch);
            });
        });
        
        // Change branch button
        if (changeBranchBtn) {
            changeBranchBtn.addEventListener('click', function() {
                branchSelection.style.display = 'block';
                menuSection.style.display = 'none';
                window.history.pushState({}, '', 'order.html');
            });
        }
        
        // Category buttons
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                currentCategory = this.dataset.category;
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                renderMenuItems(currentCategory);
            });
        });
        
        // Cart button
        cartBtn.addEventListener('click', openCartModal);
        closeCartModal.addEventListener('click', closeModal);
        
        // Checkout button
        checkoutBtn.addEventListener('click', checkout);
        
        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === cartModal) {
                closeModal();
            }
        });
        
        // Functions
        function showMenuForBranch(branch) {
            branchSelection.style.display = 'none';
            menuSection.style.display = 'block';
            
            // Update branch name display
            let branchDisplayName = '';
            switch(branch) {
                case 'islamabad':
                    branchDisplayName = 'Islamabad (F-10)';
                    break;
                case 'wah':
                    branchDisplayName = 'Wah Cantt';
                    break;
                case 'sialkot':
                    branchDisplayName = 'Sialkot';
                    break;
            }
            
            branchName.textContent = branchDisplayName;
            cartBranchName.textContent = branchDisplayName;
            
            // Update URL
            window.history.pushState({}, '', `order.html?branch=${branch}`);
            
            // Render menu items
            renderMenuItems(currentCategory);
            updateCartCount();
        }
        
        function renderMenuItems(category) {
            menuItemsContainer.innerHTML = '';
            
            const items = menuItems[category];
            
            items.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'menu-card';
                itemElement.innerHTML = `
                    <div class="menu-card-img">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="menu-card-header">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                    </div>
                    <div class="menu-card-body">
                        <p>${item.tags.map(tag => `<span class="tag ${tag.split('-')[0]}">${tag.replace('-', ' ')}</span>`).join('')}</p>
                    </div>
                    <div class="menu-card-footer">
                        <div class="price">Rs. ${item.price}</div>
                        <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
                    </div>
                `;
                
                menuItemsContainer.appendChild(itemElement);
            });
            
            // Add event listeners to "Add to Cart" buttons
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', function(e) {
                    if (!currentUser) {
                        alert('Please login to place an order.');
                        window.location.href = 'login.html';
                        return;
                    }
                    
                    const itemId = parseInt(this.dataset.id);
                    addToCart(itemId);
                });
            });
        }
        
        function addToCart(itemId) {
            // Find the item in all categories
            let item = null;
            for (const category in menuItems) {
                const foundItem = menuItems[category].find(i => i.id === itemId);
                if (foundItem) {
                    item = foundItem;
                    break;
                }
            }
            
            if (!item) return;
            
            // Check if item already in cart
            const existingItem = cart.find(i => i.id === itemId && i.branch === currentBranch);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    ...item,
                    quantity: 1,
                    branch: currentBranch
                });
            }
            
            updateCart();
        }
        
        function updateCart() {
            // Filter cart to only include items from current branch
            const branchCart = cart.filter(item => item.branch === currentBranch);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            
            if (cartModal.style.display === 'flex') {
                renderCartItems();
            }
        }
        
        function updateCartCount() {
            const branchCart = cart.filter(item => item.branch === currentBranch);
            const count = branchCart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = count;
        }
        
        function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    
    const branchCart = cart.filter(item => item.branch === currentBranch);
    
    if (branchCart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
        cartTotal.textContent = '0';
        return;
    }
    
    let total = 0;
    
    branchCart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div>Rs. ${item.price} x ${item.quantity}</div>
            </div>
            <div class="cart-item-price">Rs. ${itemTotal}</div>
            <button class="remove-item" data-id="${item.id}">Remove</button>
        `;
        
        cartItemsContainer.appendChild(itemElement);
    });
    
    cartTotal.textContent = total;

    // Add event listeners to "Remove" buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = parseInt(this.dataset.id);
            removeFromCart(itemId);
        });
    });
}

const paymentMethodSelect = document.getElementById('payment-method');
        const paymentDetailsDiv = document.getElementById('payment-details');
        const creditDebitInfo = document.getElementById('credit-debit-info');
        const easyPaisaInfo = document.getElementById('easy-paisa-info');
        const jazzCashInfo = document.getElementById('jazzcash-info');
        const checkoutButton = document.getElementById('checkout-btn');

        // Screenshot inputs
        const screenshotCardInput = document.getElementById('screenshot-card');
        const screenshotEasyInput = document.getElementById('screenshot-easy');
        const screenshotJazzInput = document.getElementById('screenshot-jazz');

        // Initially disable checkout button
        checkoutButton.disabled = true;

        // Function to reset payment details visibility and required attributes
        function resetPaymentDetails() {
            paymentDetailsDiv.style.display = 'none';
            creditDebitInfo.style.display = 'none';
            easyPaisaInfo.style.display = 'none';
            jazzCashInfo.style.display = 'none';

            // Remove required attributes
            document.getElementById('card-number').required = false;
            document.getElementById('card-holder').required = false;
            document.getElementById('expiry-date').required = false;
            document.getElementById('cvv').required = false;
            screenshotCardInput.required = false;
            screenshotEasyInput.required = false;
            screenshotJazzInput.required = false;

            // Clear file inputs
            screenshotCardInput.value = '';
            screenshotEasyInput.value = '';
            screenshotJazzInput.value = '';
        }

        // Function to validate payment details and enable/disable checkout button
        function validatePaymentDetails() {
            const method = paymentMethodSelect.value;
            let valid = false;

            if (method === 'credit-card' || method === 'debit-card') {
                const cardNumber = document.getElementById('card-number').value.trim();
                const cardHolder = document.getElementById('card-holder').value.trim();
                const expiryDate = document.getElementById('expiry-date').value.trim();
                const cvv = document.getElementById('cvv').value.trim();
                const screenshot = screenshotCardInput.files.length > 0;

                valid = cardNumber !== '' && cardHolder !== '' && expiryDate !== '' && cvv !== '' && screenshot;
            } else if (method === 'easy-paisa') {
                valid = screenshotEasyInput.files.length > 0;
            } else if (method === 'jazzcash') {
                valid = screenshotJazzInput.files.length > 0;
            } else if (method === 'cash-on-delivery') {
                // No extra details needed for cash on delivery
                valid = true;
            } else {
                valid = false;
            }

            checkoutButton.disabled = !valid;
        }

        // Event listener for payment method change
        paymentMethodSelect.addEventListener('change', function() {
            resetPaymentDetails();

            const method = this.value;

            if (method === 'credit-card' || method === 'debit-card') {
                paymentDetailsDiv.style.display = 'block';
                creditDebitInfo.style.display = 'block';

                // Set required attributes
                document.getElementById('card-number').required = true;
                document.getElementById('card-holder').required = true;
                document.getElementById('expiry-date').required = true;
                document.getElementById('cvv').required = true;
                screenshotCardInput.required = true;
            } else if (method === 'easy-paisa') {
                paymentDetailsDiv.style.display = 'block';
                easyPaisaInfo.style.display = 'block';
                screenshotEasyInput.required = true;
            } else if (method === 'jazzcash') {
                paymentDetailsDiv.style.display = 'block';
                jazzCashInfo.style.display = 'block';
                screenshotJazzInput.required = true;
            } else if (method === 'cash-on-delivery') {
                // No payment details needed
                paymentDetailsDiv.style.display = 'none';
            } else {
                paymentDetailsDiv.style.display = 'none';
            }

            validatePaymentDetails();
        });

        // Event listeners for input changes to validate payment details
        document.getElementById('card-number').addEventListener('input', validatePaymentDetails);
        document.getElementById('card-holder').addEventListener('input', validatePaymentDetails);
        document.getElementById('expiry-date').addEventListener('input', validatePaymentDetails);
        document.getElementById('cvv').addEventListener('input', validatePaymentDetails);
        screenshotCardInput.addEventListener('change', validatePaymentDetails);
        screenshotEasyInput.addEventListener('change', validatePaymentDetails);
        screenshotJazzInput.addEventListener('change', validatePaymentDetails);

        // Modify checkout function to validate payment details before proceeding
        const originalCheckout = checkout;
        checkout = function() {
            const method = paymentMethodSelect.value;

            if (method === '') {
                alert('Please select a payment method.');
                return;
            }

            if (method === 'credit-card' || method === 'debit-card') {
                const cardNumber = document.getElementById('card-number').value.trim();
                const cardHolder = document.getElementById('card-holder').value.trim();
                const expiryDate = document.getElementById('expiry-date').value.trim();
                const cvv = document.getElementById('cvv').value.trim();
                const screenshot = screenshotCardInput.files.length > 0;

                if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
                    alert('Please fill in all card details.');
                    return;
                }

                if (!screenshot) {
                    alert('Please upload a screenshot of the payment.');
                    return;
                }
            } else if (method === 'easy-paisa') {
                if (screenshotEasyInput.files.length === 0) {
                    alert('Please upload a screenshot of the payment.');
                    return;
                }
            } else if (method === 'jazzcash') {
                if (screenshotJazzInput.files.length === 0) {
                    alert('Please upload a screenshot of the payment.');
                    return;
                }
            }

            // Proceed with original checkout logic
            originalCheckout();
        };


function removeFromCart(itemId) {
    // Remove item from cart
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    renderCartItems();
}

        
        function openCartModal() {
            if (!currentUser) {
                alert('Please login to view your cart.');
                window.location.href = 'login.html';
                return;
            }
            
            renderCartItems();
            cartModal.style.display = 'flex';
        }
        
        function closeModal() {
            cartModal.style.display = 'none';
        }
        
        function checkout() {
            if (!currentUser) {
                alert('Please login to proceed with checkout.');
                window.location.href = 'login.html';
                return;
            }
            
            const branchCart = cart.filter(item => item.branch === currentBranch);
            
            if (branchCart.length === 0) {
                alert('Your cart is empty');
                return;
            }

            // Get payment method and screenshot as base64 string
            const method = paymentMethodSelect.value;
            let paymentScreenshot = null;

            function getBase64(file) {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = error => reject(error);
                });
            }

            async function createOrder() {
                if (method === 'credit-card' || method === 'debit-card') {
                    paymentScreenshot = await getBase64(screenshotCardInput.files[0]);
                } else if (method === 'easy-paisa') {
                    paymentScreenshot = await getBase64(screenshotEasyInput.files[0]);
                } else if (method === 'jazzcash') {
                    paymentScreenshot = await getBase64(screenshotJazzInput.files[0]);
                }

                const order = {
                    id: Date.now(),
                    userId: currentUser.id,
                    branch: currentBranch,
                    items: [...branchCart],
                    total: branchCart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
                    date: new Date().toISOString(),
                    status: 'pending',
                    paymentMethod: method,
                    paymentScreenshot: paymentScreenshot,
                    paymentStatus: 'not paid'
                };

                // Save order to "database" (localStorage)
                const orders = JSON.parse(localStorage.getItem('orders')) || [];
                orders.push(order);
                localStorage.setItem('orders', JSON.stringify(orders));

                // Remove items from cart for this branch
                cart = cart.filter(item => item.branch !== currentBranch);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();

                closeModal();
                alert(`Order placed successfully! Your order ID is ${order.id}. Total: Rs. ${order.total}`);
            }

            createOrder();
        }
    }
});