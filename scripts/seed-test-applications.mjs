import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://kuldeepmaurya4296_db_user:qvjmsJeC24r6Tm2F@ac-6we4ab2-shard-00-00.efpnylx.mongodb.net:27017,ac-6we4ab2-shard-00-01.efpnylx.mongodb.net:27017,ac-6we4ab2-shard-00-02.efpnylx.mongodb.net:27017/maurya-tech?replicaSet=atlas-9zwg6l-shard-0&authSource=admin&tls=true&appName=Cluster0';

async function seedApplications() {
  console.log('Connecting to MongoDB Atlas (maurya-tech)...');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected!');

  const Application = mongoose.models.Application || mongoose.model('Application', new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    linkedin: String,
    resume: String,
    coverLetter: String,
    jobTitle: String,
    jobId: String,
    status: { type: String, default: 'Pending' },
    notes: String,
  }, { timestamps: true }));

  const testApps = [
    {
      name: 'Rahul Verma',
      email: 'rahul.verma.dev@gmail.com',
      phone: '+91 98765 12340',
      linkedin: 'https://linkedin.com/in/rahul-verma-mobile',
      resume: 'https://drive.google.com/file/d/1A2B3C4D5E6F7G8H9I0J-flutter-resume/view',
      coverLetter: 'Hi Hiring Team, I have built 3 cross-platform Flutter apps with Node.js/Express & MongoDB backends and State Management using Bloc. I would love to contribute to Maurya Tech client projects as a Full Stack Mobile Developer Intern.',
      jobTitle: 'Full Stack Mobile Application Developer Intern',
      jobId: 'full-stack-mobile-intern',
      status: 'Reviewing',
      notes: 'Strong GitHub portfolio in Flutter & Node.js. Good candidate for round 1 technical interview.',
    },
    {
      name: 'Priya Sharma',
      email: 'priya.security@techshield.in',
      phone: '+91 98123 45678',
      linkedin: 'https://linkedin.com/in/priyasharma-cybersec',
      resume: 'https://drive.google.com/file/d/2B3C4D5E6F7G8H9I0J1K-cybersec-resume/view',
      coverLetter: 'Dear Maurya Technologies Leadership, I have 3.5 years of experience in Application Penetration Testing (VAPT), OWASP Top 10 remediation, and AWS Cloud Security posture management. I am excited to lead security audits and DevSecOps integrations for your SaaS ecosystems.',
      jobTitle: 'Cyber Security Engineer',
      jobId: 'cyber-security-engineer',
      status: 'Shortlisted',
      notes: 'CEH certified. 3.5 years experience in VAPT and AWS cloud compliance.',
    },
  ];

  for (const app of testApps) {
    await Application.findOneAndUpdate({ email: app.email }, app, { upsert: true, returnDocument: 'after' });
  }

  console.log('Seeded 2 test applications successfully (1 Intern, 1 Full-Time)!');
  await mongoose.disconnect();
}

seedApplications().catch(err => {
  console.error('Error seeding test applications:', err);
  process.exit(1);
});
