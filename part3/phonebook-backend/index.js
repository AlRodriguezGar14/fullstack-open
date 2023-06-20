const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3001;
app.listen(PORT);

app.use(express.json());
app.use(express.static("build"));
app.use(cors());

morgan.token("content", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :content"
  )
);

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

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = phonebook.find((p) => p.id === id);
  console.log(phonebook);
  console.log(person);

  if (!person) {
    res.status(404).end();
    return;
  }
  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  phonebook = phonebook.filter((p) => p.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const person = req.body;

  if (!person.name || !person.number) {
    return res.status(400).json({
      error: "be sure that you added both the name and the number",
    });
  }

  const searchDuplication = phonebook.find((n) => n.name === person.name);
  if (searchDuplication) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  const id = Math.max(...phonebook.map((p) => p.id)) + 1;
  person.id = id;

  phonebook = phonebook.concat(person);

  res.json(person);
});
