const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

// middleware 
app.use(cors({
  origin:['http://localhost:5173'],
  credentials:true,
}));
app.use(express.json());
app.use(cookieParser());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster1.szp5gbl.mongodb.net/?appName=cluster1`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const jobColection = client.db("work-up").collection("jobs");
    const applicantCollection = client.db("work-up").collection("applicats");

    // jwt token apis ---------------------------------------
    app.post('/jwt', async (req, res) => {
      const { email } = req.body;
      const user = { email };
      const token = jwt.sign( user, process.env.JWT_TOKEN_SECRET, { expiresIn: '1h' });
      res.cookie('jwt_token',token,{
        httpOnly:true,
        secure:false,
      })
      res.send({ success: true  });
    })

    // get josbs
    app.get('/jobs', async (req, res) => {
      const cursor = jobColection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    //get job by id
    app.get('/jobs/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await jobColection.findOne(query);
      res.send(result);
    })
    // post a job 
    app.post('/jobs', async (req, res) => {
      const addJob = req.body;
      const result = await jobColection.insertOne(addJob);
      res.send(result);
    })

    // applicants related api 
    app.get('/applicant', async (req, res) => {
      const email = req.query.email;
      const query = {
        applicant: email,
      };
      const result = await applicantCollection.find(query).toArray();
      res.send(result);
    })
    app.post('/applicant', async (req, res) => {
      const applicant = req.body;
      const result = await applicantCollection.insertOne(applicant);
      res.send(result);
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
