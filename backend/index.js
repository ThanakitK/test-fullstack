const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json());

const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://bankthanakit:0861460819zx@cluster0.gwdj0mb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


app.get('/users', async(req, res) => {
    const user = req.body;
    const client = new MongoClient(uri);
    await client.connect();
    const result = await client.db('Test').collection('users').find({}).toArray();
    await client.close();
    res.status(200).send({result});
})
app.get('/users/:nameSurname', async(req, res) => {
  const filter = req.params.nameSurname;
  const client = new MongoClient(uri);
  await client.connect();
  const users = await client.db('Test').collection('users').find({
    $or: [
      { "first_name": filter },
      { "last_name": filter }
    ]
  }).toArray();
  await client.close();
  res.status(200).send({users});
})

app.post('/users', async(req, res) => {
  const user = req.body;
  const client = new MongoClient(uri);
  await client.connect();
  const result = await client.db('Test').collection('users').insertOne(user);
  await client.close();
  res.status(200).send({result});
})

app.put('/users/:id', async(req, res) => {
  const id = req.params.id;
  const user = req.body;
  const client = new MongoClient(uri);
  await client.connect();
  const result = await client.db('Test').collection('users').updateOne({ id: id }, { $set: user });
  await client.close();
  res.status(200).send({result});
})

app.delete('/users/:id', async(req, res) => {
  const id = req.params.id;
  const client = new MongoClient(uri);
  await client.connect();
  const result = await client.db('Test').collection('users').deleteOne({ id: id });
  await client.close();
  res.status(200).send({result});
})

app.listen(port, () => {
  console.log(`Example app listening at ${port}`)
})
