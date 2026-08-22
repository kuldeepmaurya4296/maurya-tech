import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { jobs as initialJobs } from '../data/jobs.js';
import { projects as initialProjects } from '../data/projects.js';
import { services as initialServices } from '../data/services.js';
import { posts as initialPosts } from '../data/posts.js';

const MONGODB_URI = 'mongodb://kuldeepmaurya4296_db_user:qvjmsJeC24r6Tm2F@ac-6we4ab2-shard-00-00.efpnylx.mongodb.net:27017,ac-6we4ab2-shard-00-01.efpnylx.mongodb.net:27017,ac-6we4ab2-shard-00-02.efpnylx.mongodb.net:27017/maurya-tech?replicaSet=atlas-9zwg6l-shard-0&authSource=admin&tls=true&appName=Cluster0';

async function seedFull() {
  console.log('Connecting to MongoDB Atlas (maurya-tech)...');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB!');

  const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: { type: String, select: true },
    role: String,
  }, { timestamps: true }));

  const Job = mongoose.models.Job || mongoose.model('Job', new mongoose.Schema({
    customId: String,
    slug: String,
    title: String,
    department: String,
    location: String,
    type: String,
    experience: String,
    salary: String,
    skills: [String],
    tags: [String],
    description: String,
    responsibilities: [String],
    requirements: [String],
    benefits: [String],
    isActive: Boolean,
  }, { timestamps: true }));

  const Project = mongoose.models.Project || mongoose.model('Project', new mongoose.Schema({
    customId: String,
    slug: { type: String, unique: true },
    title: String,
    category: String,
    role: String,
    shortDescription: String,
    fullDescription: String,
    problem: String,
    solution: String,
    keyFeatures: Array,
    techStack: Object,
    results: [String],
    thumbnail: String,
    liveLink: String,
    githubLink: String,
    desktopImages: [String],
    mobileImages: [String],
    isFeatured: Boolean,
    isPublished: Boolean,
  }, { timestamps: true }));

  const Service = mongoose.models.Service || mongoose.model('Service', new mongoose.Schema({
    customId: String,
    icon: String,
    title: String,
    shortDescription: String,
    fullDescription: String,
    features: [String],
    technologies: [String],
    isPublished: Boolean,
  }, { timestamps: true }));

  const Post = mongoose.models.Post || mongoose.model('Post', new mongoose.Schema({
    customId: String,
    slug: { type: String, unique: true },
    title: String,
    excerpt: String,
    content: String,
    coverImage: String,
    author: String,
    date: String,
    readTime: String,
    category: String,
    tags: [String],
    featured: Boolean,
    isPublished: Boolean,
    viewsCount: { type: Number, default: 0 },
  }, { timestamps: true }));

  // Clean and re-seed Jobs
  if (initialJobs?.jobs) {
    await Job.deleteMany({});
    for (const j of initialJobs.jobs) {
      await Job.create({ ...j, customId: j.id, slug: j.slug || j.id, isActive: true });
    }
    console.log(`Seeded ${initialJobs.jobs.length} jobs cleanly.`);
  }

  // Seed Projects
  if (initialProjects?.projects) {
    for (const p of initialProjects.projects) {
      await Project.findOneAndUpdate({ slug: p.slug }, { ...p, customId: p.id, isFeatured: true, isPublished: true }, { upsert: true, returnDocument: 'after' });
    }
    console.log(`Seeded ${initialProjects.projects.length} projects.`);
  }

  // Seed Services
  if (initialServices?.services) {
    for (const s of initialServices.services) {
      await Service.findOneAndUpdate({ customId: s.id }, { ...s, customId: s.id, isPublished: true }, { upsert: true, returnDocument: 'after' });
    }
    console.log(`Seeded ${initialServices.services.length} services.`);
  }

  // Clear & Re-seed Posts cleanly
  if (initialPosts?.posts) {
    await Post.deleteMany({});
    for (const post of initialPosts.posts) {
      await Post.create({ ...post, customId: post.id, isPublished: true });
    }
    console.log(`Seeded ${initialPosts.posts.length} blog posts cleanly.`);
  }

  const collections = await mongoose.connection.db.listCollections().toArray();
  console.log('All Collections now populated in maurya-tech:', collections.map(c => c.name));

  await mongoose.disconnect();
  console.log('Full Seed Complete!');
}

seedFull().catch(err => {
  console.error('Seeding error:', err);
  process.exit(1);
});
