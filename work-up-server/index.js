const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();

// middleware
const allowedOriginsEnv = process.env.ALLOWED_ORIGINS || '';
const allowedOrigins = allowedOriginsEnv
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// MongoDB setup
const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let jobCollection;
let applicantCollection;
let isConnected = false;

async function connectDB() {
  try {
    if (isConnected) {
      return;
    }
    await client.connect();
    const dbName = process.env.MONGODB_DB_NAME || 'work-up';
    const db = client.db(dbName);
    jobCollection = db.collection('jobs');
    applicantCollection = db.collection('applicats');
    isConnected = true;
    console.log('✅ MongoDB connected to database:', dbName);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    isConnected = false;
    throw error;
  }
}

// Initialize connection
connectDB().catch(console.error);

// JWT middleware
const verifyToken = (req, res, next) => {
  const token = req?.cookies?.jwt_token;
  if (!token) {
    return res.status(401).send({ message: 'unauthorized access' });
  }
  jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'unauthorized access' });
    }
    req.decoded = decoded;
    next();
  });
};

// routes
app.get('/', (req, res) => {
  res.send('Server is ready');
});

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    if (!isConnected || !jobCollection) {
      await connectDB();
    }
    // Test connection by pinging the database
    await client.db().admin().ping();
    res.send({ 
      status: 'healthy', 
      connected: isConnected,
      database: process.env.MONGODB_DB_NAME || 'work-up'
    });
  } catch (error) {
    res.status(503).send({ 
      status: 'unhealthy', 
      connected: false,
      error: error.message 
    });
  }
});

app.post('/jwt', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send({ error: 'Email is required' });
    }
    const user = { email };
    const token = jwt.sign(user, process.env.JWT_TOKEN_SECRET, { expiresIn: '1h' });
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('jwt_token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
    });
    res.send({ success: true });
  } catch (error) {
    console.error('Error creating JWT:', error);
    res.status(500).send({ error: 'Failed to create token', message: error.message });
  }
});

// job APIs
app.get('/jobs', async (req, res) => {
  try {
    if (!isConnected || !jobCollection) {
      await connectDB();
    }
    const result = await jobCollection.find().toArray();
    res.send(result);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).send({ error: 'Failed to fetch jobs', message: error.message });
  }
});

app.get('/jobs/:id', async (req, res) => {
  try {
    if (!isConnected || !jobCollection) {
      await connectDB();
    }
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ error: 'Invalid job ID format' });
    }
    const result = await jobCollection.findOne({ _id: new ObjectId(id) });
    if (!result) {
      return res.status(404).send({ error: 'Job not found' });
    }
    res.send(result);
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).send({ error: 'Failed to fetch job', message: error.message });
  }
});

app.post('/jobs', async (req, res) => {
  try {
    if (!isConnected || !jobCollection) {
      await connectDB();
    }
    const addJob = req.body;
    const result = await jobCollection.insertOne(addJob);
    res.send(result);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).send({ error: 'Failed to create job', message: error.message });
  }
});

// applicant APIs
app.get('/applicant', verifyToken, async (req, res) => {
  try {
    if (!isConnected || !applicantCollection) {
      await connectDB();
    }
    const email = req.query.email;
    if (email !== req.decoded.email) {
      return res.status(403).send({ message: 'forbidden access' });
    }
    const result = await applicantCollection.find({ applicant: email }).toArray();
    res.send(result);
  } catch (error) {
    console.error('Error fetching applicants:', error);
    res.status(500).send({ error: 'Failed to fetch applicants', message: error.message });
  }
});

app.post('/applicant', async (req, res) => {
  try {
    if (!isConnected || !applicantCollection) {
      await connectDB();
    }
    const applicant = req.body;
    const result = await applicantCollection.insertOne(applicant);
    res.send(result);
  } catch (error) {
    console.error('Error creating applicant:', error);
    res.status(500).send({ error: 'Failed to create applicant', message: error.message });
  }
});

// Export app for Vercel
module.exports = app;

// Local development server (not used on Vercel)
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
}
