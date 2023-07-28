const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/kprUser', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// name schema 
const nameSchema = new mongoose.Schema({
  name: String,
});

// Create a model based on the schema
const Name = mongoose.model('Name', nameSchema);

// Routes
app.post('/api/names', (req, res) => {
  const newName = new Name({ name: req.body.name });
  newName.save()
    .then(() => res.json({ success: true }))
    .catch(err => res.status(500).json({ success: false, error: err.message }));
});

app.get('/api/names', (req, res) => {
  Name.find()
    .then(names => res.json(names))
    .catch(err => res.status(500).json({ success: false, error: err.message }));
});

app.put('/api/names/:id', (req, res) => {
  Name.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })

    .then(updatedName => res.json({ success: true, name: updatedName }))
    .catch(err => res.status(500).json({ success: false, error: err.message }));
});

app.delete('/api/names/:id', (req, res) => {
  Name.findByIdAndRemove(req.params.id)
   
  .then(() => res.json({ success: true }))
    .catch(err => res.status(500).json({ success: false, error: err.message }));
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
