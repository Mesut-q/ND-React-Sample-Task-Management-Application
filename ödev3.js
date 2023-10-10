// We want to develop an application where we can perform CRUD operations using only fake data.
//package.json

{
    "name": "sahte-veri-crud",
    "version": "1.0.0",
    "description": "Sahte verilerle CRUD işlemleri",
    "dependencies": {
      "express": "^4.17.1"
    },
    "scripts": {
      "start": "node server.js"
    }
  }

  const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Sahte veriler
let fakeData = [
  { id: 1, name: 'Öğe 1', description: 'Bu öğe 1 için açıklama' },
  { id: 2, name: 'Öğe 2', description: 'Bu öğe 2 için açıklama' },
];

app.use(bodyParser.json());

// Tüm verileri listeleme (Read)
app.get('/items', (req, res) => {
  res.json(fakeData);
});

// Belirli bir öğeyi görüntüleme (Read)
app.get('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = fakeData.find((item) => item.id === itemId);

  if (!item) {
    res.status(404).json({ error: 'Öğe bulunamadı' });
    return;
  }

  res.json(item);
});

// Yeni bir öğe oluşturma (Create)
app.post('/items', (req, res) => {
  const newItem = req.body;
  newItem.id = fakeData.length + 1;
  fakeData.push(newItem);
  res.status(201).json(newItem);
});

// Bir öğeyi güncelleme (Update)
app.put('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;
  const index = fakeData.findIndex((item) => item.id === itemId);

  if (index === -1) {
    res.status(404).json({ error: 'Öğe bulunamadı' });
    return;
  }

  fakeData[index] = updatedItem;
  res.json(updatedItem);
});

// Bir öğeyi silme (Delete)
app.delete('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const index = fakeData.findIndex((item) => item.id === itemId);

  if (index === -1) {
    res.status(404).json({ error: 'Öğe bulunamadı' });
    return;
  }

  fakeData.splice(index, 1);
  res.json({ message: 'Öğe silindi' });
});

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor.`);
});


    