import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MONGODB_URI = 'mongodb://kuldeepmaurya4296_db_user:qvjmsJeC24r6Tm2F@ac-6we4ab2-shard-00-00.efpnylx.mongodb.net:27017,ac-6we4ab2-shard-00-01.efpnylx.mongodb.net:27017,ac-6we4ab2-shard-00-02.efpnylx.mongodb.net:27017/maurya-tech?replicaSet=atlas-9zwg6l-shard-0&authSource=admin&tls=true&appName=Cluster0';

async function seed() {
  console.log('Connecting to MongoDB cluster (maurya-tech)...');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB successfully!');

  // Define minimal schemas for seeding test
  const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: { type: String, select: true },
    role: String,
  }, { timestamps: true });

  const User = mongoose.models.User || mongoose.model('User', UserSchema);

  const existingAdmin = await User.findOne({ email: 'admin@maurya-tech.com' });
  if (!existingAdmin) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Admin@12345', salt);
    await User.create({
      name: 'Super Admin',
      email: 'admin@maurya-tech.com',
      password: hashedPassword,
      role: 'superadmin',
    });
    console.log('Created default admin: admin@maurya-tech.com / Admin@12345');
  } else {
    console.log('Admin user already exists:', existingAdmin.email);
  }

  const collections = await mongoose.connection.db.listCollections().toArray();
  console.log('Current Collections in maurya-tech DB:', collections.map(c => c.name));

  await mongoose.disconnect();
  console.log('Disconnected cleanly. Seeding test complete!');
}

seed().catch(err => {
  console.error('Seed test error:', err);
  process.exit(1);
});
