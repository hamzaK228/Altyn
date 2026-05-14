// MongoDB seed script — runs on first container start
// Creates initial gold price history and an admin user

db = db.getSiblingDB('altyn');

// Create collections
db.createCollection('users');
db.createCollection('goldprices');
db.createCollection('portfolios');
db.createCollection('transactions');

// Indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.portfolios.createIndex({ userId: 1 }, { unique: true });
db.transactions.createIndex({ userId: 1, timestamp: -1 });
db.goldprices.createIndex({ timestamp: -1 });

// Seed 30 days of gold price history
const basePrice = 9216;
const now = Date.now();
const prices = [];

for (let i = 29; i >= 0; i--) {
  const variation = (Math.random() - 0.5) * 200;
  prices.push({
    price: Math.round((basePrice + variation) * 100) / 100,
    currency: 'KGS',
    timestamp: new Date(now - i * 24 * 60 * 60 * 1000),
  });
}

db.goldprices.insertMany(prices);

// Create admin user (password: admin12345, bcrypt hash)
db.users.insertOne({
  email: 'admin@altyn.kg',
  password: '$2a$10$8KzQ1H7EGp6Lh3K5B3yQxuP0J9gR6mN4wT2vX8aS5dF7hJ3kL1mO',
  name: 'Администратор',
  role: 'admin',
  createdAt: new Date(),
});

print('✅ Altyn database seeded successfully');
print(`   - ${prices.length} gold price records`);
print('   - 1 admin user (admin@altyn.kg)');
print('   - 4 indexes created');
