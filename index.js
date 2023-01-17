const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

/* middleware */
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kzjjck3.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {
        const blogcollection = client.db('allblogs').collection('blogscollection');

        app.post('/blogs', async (req, res) => {
            const blogs = req.body;
            const result = await blogcollection.insertOne(blogs);
            res.send(result)
        })


    }
    finally {

    }

}
run().catch(console.log)






app.get('/', async (req, res) => {
    res.send('Blogging website server is running')
})
app.listen(port, () => console.log(`Doctors Portal running on server ${port}`))
