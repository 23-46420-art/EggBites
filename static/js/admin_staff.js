// Initialize staff accounts (demo accounts)
function initializeStaffAccounts() {
    if (!localStorage.getItem('staffAccounts')) {
        const defaultStaff = [
            {
                id: 1,
                name: 'Staff Member',
                email: 'staff@egg.com',
                password: 'egg.staff',
                role: 'staff',
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                name: 'Administrator',
                email: 'admin@egg.com',
                password: 'egg.admin',
                role: 'admin',
                createdAt: new Date().toISOString()
            }
        ];
        localStorage.setItem('staffAccounts', JSON.stringify(defaultStaff));
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeStaffAccounts();
    // Migrate existing default accounts to new passwords if needed
    migrateDefaultStaffPasswords();
});

// Migrate passwords for default seeded accounts if they already exist in storage
function migrateDefaultStaffPasswords() {
    const raw = localStorage.getItem('staffAccounts');
    if (!raw) return;
    let accounts;
    try {
        accounts = JSON.parse(raw) || [];
    } catch (e) {
        return;
    }

    let changed = false;
    accounts = accounts.map(acc => {
        if (acc && acc.email === 'staff@egg.com' && acc.role === 'staff' && acc.password !== 'egg.staff') {
            changed = true;
            return { ...acc, password: 'egg.staff' };
        }
        if (acc && acc.email === 'admin@egg.com' && acc.role === 'admin' && acc.password !== 'egg.admin') {
            changed = true;
            return { ...acc, password: 'egg.admin' };
        }
        return acc;
    });

    if (changed) {
        localStorage.setItem('staffAccounts', JSON.stringify(accounts));
    }
}

// Handle Staff/Admin Login
function handleStaffLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('staffEmail').value;
    const password = document.getElementById('staffPassword').value;
    const role = document.getElementById('staffRole').value;
    const rememberMe = document.getElementById('staffRememberMe').checked;
    
    // Get stored staff accounts
    const staffAccounts = JSON.parse(localStorage.getItem('staffAccounts')) || [];
    
    // Find staff member
    const staff = staffAccounts.find(s => 
        s.email === email && 
        s.password === password && 
        s.role === role
    );
    
    if (staff) {
        // Login successful
        localStorage.setItem('isStaffLoggedIn', 'true');
        localStorage.setItem('currentStaff', JSON.stringify({
            id: staff.id,
            name: staff.name,
            email: staff.email,
            role: staff.role
        }));
        
        if (rememberMe) {
            localStorage.setItem('staffRememberMe', 'true');
        }
        
        showAlert('success', 'Login successful! Redirecting to dashboard...');
        
        setTimeout(() => {
            window.location.href = 'templates/dashboard.html';
        }, 1500);
    } else {
        showAlert('error', 'Invalid credentials or incorrect role selected!');
    }
    
    return false;
}

// Handle Staff/Admin Logout
function handleStaffLogout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('isStaffLoggedIn');
        localStorage.removeItem('currentStaff');
        localStorage.removeItem('staffRememberMe');
        
        showAlert('success', 'Logged out successfully!');
        
        setTimeout(() => {
            window.location.href = '../admin_staff.html';
        }, 1000);
    }
}

// ============================================
// INITIALIZATION FUNCTIONS
// ============================================

// Initialize menu items if not present
function initializeMenuItems() {
    const defaultMenuItems = [
            // Breakfast Classics (from your HTML)
        { id: 1, name: 'Sunny Side Up', price: 95.00, category: 'Breakfast', image: '../static/images/menu-items/sunnysideup.jpg', available: true },
        { id: 2, name: 'Fluffy Scrambled Eggs', price: 110.00, category: 'Breakfast', image: '../static/images/menu-items/scrambledegg.jpg', available: true },
        { id: 3, name: 'Breakfast Burrito', price: 145.00, category: 'Breakfast', image: '../static/images/menu-items/burito.jpg', available: true },
        { id: 4, name: 'Huevos Rancheros', price: 135.00, category: 'Breakfast', image: '../static/images/menu-items/huevos.jpg', available: true },
        { id: 5, name: 'Breakfast Sandwich', price: 125.00, category: 'Breakfast', image: '../static/images/menu-items/breakfast-sammich.webp', available: true },
        { id: 6, name: 'Egg in Toast', price: 100.00, category: 'Breakfast', image: '../static/images/menu-items/eggtoast.jpg', available: true },
        { id: 7, name: 'Breakfast Platter', price: 165.00, category: 'Breakfast', image: '../static/images/menu-items/breakplatter.webp', available: true },
        { id: 8, name: 'Egg & Bacon Bowl', price: 140.00, category: 'Breakfast', image: '../static/images/menu-items/baconegg.jpeg', available: true },

        // Eggs Benedict
        { id: 9, name: 'Classic Benedict', price: 175.00, category: 'Benedicts', image: '../static/images/menu-items/Classic-Eggs-Benedict-with-Hollandaise-Sauce.jpg', available: true },
        { id: 10, name: 'Florentine Benedict', price: 165.00, category: 'Benedicts', image: '../static/images/menu-items/Eggs-Florentine.jpg', available: true },
        { id: 11, name: 'Salmon Benedict', price: 195.00, category: 'Benedicts', image: '../static/images/menu-items/Smoked-Salmon-Eggs-Benedict-recipe.jpg', available: true },
        { id: 12, name: 'Avocado Benedict', price: 160.00, category: 'Benedicts', image: '../static/images/menu-items/AVOCADO EGG.webp', available: true },
        { id: 13, name: 'Crab Cake Benedict', price: 205.00, category: 'Benedicts', image: '../static/images/menu-items/crab-cake-benedict-featured.jpg', available: true },
        { id: 14, name: 'Mushroom Benedict', price: 155.00, category: 'Benedicts', image: '../static/images/menu-items/Mushroom-eggs-benedict.jpg', available: true },
        { id: 15, name: 'Veggie Benedict', price: 150.00, category: 'Benedicts', image: '../static/images/menu-items/Vegan-Eggs-Benedict-7.jpg', available: true },
        { id: 16, name: 'Benedict Royale', price: 215.00, category: 'Benedicts', image: '../static/images/menu-items/royal.jpg', available: true },

        // Omelettes
        { id: 17, name: 'Cheese Omelette', price: 125.00, category: 'Omelettes', image: '../static/images/menu-items/Cheese_Omelette.png', available: true },
        { id: 18, name: 'Denver Omelette', price: 145.00, category: 'Omelettes', image: '../static/images/menu-items/Denver-omelet.jpg', available: true },
        { id: 19, name: 'Spanish Omelette', price: 135.00, category: 'Omelettes', image: '../static/images/menu-items/Spanish+omelette.webp', available: true },
        { id: 20, name: 'Veggie Omelette', price: 130.00, category: 'Omelettes', image: '../static/images/menu-items/veggie-omelette-featured.webp', available: true },
        { id: 21, name: 'Mexican Omelette', price: 150.00, category: 'Omelettes', image: '../static/images/menu-items/Mexican_Omelette.jpg', available: true },
        { id: 22, name: 'Greek Omelette', price: 140.00, category: 'Omelettes', image: '../static/images/menu-items/greekome.jpg', available: true },
        { id: 23, name: 'Western Omelette', price: 145.00, category: 'Omelettes', image: '../static/images/menu-items/western-omelette-recipe-3.jpg', available: true },
        { id: 24, name: 'Farmer\'s Omelette', price: 155.00, category: 'Omelettes', image: '../static/images/menu-items/farmers.jpg', available: true },

        // Specialty Dishes
        { id: 25, name: 'Shakshuka', price: 175.00, category: 'Specialty', image: '../static/images/menu-items/Shakshuka.webp', available: true },
        { id: 26, name: 'Frittata', price: 165.00, category: 'Specialty', image: '../static/images/menu-items/vegetable-frittata-.jpeg', available: true },
        { id: 27, name: 'Quiche Lorraine', price: 185.00, category: 'Specialty', image: '../static/images/menu-items/quiche.jpg', available: true },
        { id: 28, name: 'Egg Fried Rice', price: 135.00, category: 'Specialty', image: '../static/images/menu-items/friedrice.jpg', available: true },
        { id: 29, name: 'Carbonara', price: 195.00, category: 'Specialty', image: '../static/images/menu-items/Pasta-Carbonara-square.webp', available: true },
        { id: 30, name: 'Egg Drop Soup', price: 120.00, category: 'Specialty', image: '../static/images/menu-items/egg-drop-soup-5.jpg', available: true },
        { id: 31, name: 'Egg Salad Sandwich', price: 125.00, category: 'Specialty', image: '../static/images/menu-items/Classic-Egg-Salad-featurex.jpg', available: true },
        { id: 32, name: 'Deviled Eggs', price: 115.00, category: 'Specialty', image: '../static/images/menu-items/Deviled-Eggs.jpg', available: true }
    ];

    const existingRaw = localStorage.getItem('menuItems');
    if (!existingRaw) {
        // Seed fresh
        localStorage.setItem('menuItems', JSON.stringify(defaultMenuItems));
        return;
    }

    // Merge missing items without duplicating existing ones
    let existing = [];
    try { existing = JSON.parse(existingRaw) || []; } catch { existing = []; }

    const existingNames = new Set(existing.map(i => (i.name || '').toLowerCase()));
    let maxId = existing.reduce((m, i) => Math.max(m, typeof i.id === 'number' ? i.id : 0), 0);
    let changed = false;

    defaultMenuItems.forEach(def => {
        const lname = (def.name || '').toLowerCase();
        if (!existingNames.has(lname)) {
            // Add completely new item
            maxId += 1;
            const itemToAdd = { ...def, id: maxId };
            existing.push(itemToAdd);
            existingNames.add(lname);
            changed = true;
        } else {
            // If item exists, sync non-destructive updates from defaults (e.g. price)
            const idx = existing.findIndex(i => (i.name || '').toLowerCase() === lname);
            if (idx !== -1) {
                const existingItem = existing[idx];
                // Sync price if different (user requested default price to reflect in dashboard)
                if (typeof def.price === 'number' && existingItem.price !== def.price) {
                    existing[idx] = { ...existingItem, price: def.price };
                    changed = true;
                }
                // Optionally sync image or category if missing in existing
                if (!existing[idx].image && def.image) {
                    existing[idx].image = def.image;
                    changed = true;
                }
                if (!existing[idx].category && def.category) {
                    existing[idx].category = def.category;
                    changed = true;
                }
            }
        }
    });

    if (changed) {
        localStorage.setItem('menuItems', JSON.stringify(existing));
    }
}

// Initialize all data
document.addEventListener('DOMContentLoaded', function() {
    initializeMenuItems();
});
