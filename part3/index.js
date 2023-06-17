const express = require("express");
const app = express();

const PORT = 3001;
app.listen(PORT);

console.log(`app is running at port ${3001}`);

let phonebook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  if (!phonebook[0]) {
    res.status(404).end();
  }
  res.json(phonebook);
});

app.get("/info", (req, res) => {
  let date = new Date();
  const info = `
        <div>
          <h2>Phonebook has info for ${phonebook.length}</h2>
          <br/>
          <p>${date}</p>
        </div>`;

  res.send(info);
});
