const express = require("express");
// const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const url = process.env.MONGODB_URI;

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

// this has to be the last loaded middleware.

app.use(express.json());
app.use(express.static("build"));
app.use(cors());
app.use(errorHandler);

// morgan.token("content", (req, res) => JSON.stringify(req.body));
// app.use(
//   morgan(
//     ":method :url :status :res[content-length] - :response-time ms :content"
//   )
// );
//

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String || Number,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model("Person", personSchema);

// let phonebook = [
//   {
//     id: 1,
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: 2,
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: 3,
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: 4,
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

app.get("/api/persons", (req, res) => {
  Person.find({}).then((people) => res.json(people));

  // if (!phonebook[0]) {
  //   res.status(404).end();
  // }
  // res.json(phonebook);
});

app.get("/info", (req, res) => {
  let date = new Date();
  const info = `
        <div>
          <h2>Phonebook has info for phonebook.length</h2>
          <br/>
          <p>${date}</p>
        </div>`;

  res.send(info);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  // const person = phonebook.find((p) => p.id === id);
  Person.findById(id).then((person) => {
    if (!person) {
      res.status(404).end();
      return;
    }

    res.json(person);
  });
  // console.log(phonebook);
  // console.log(person);
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
  // phonebook = phonebook.filter((p) => p.id !== id);
  // res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const person = req.body;

  if (person.name === undefined) {
    return res.status(404).json({ error: "name missing" });
  }
  if (person.number === undefined) {
    return res.status(404).json({ error: "number missing" });
  }

  // TODO: MAKE THIS WORK WITH THE DATABASE
  // const searchDuplication = phonebook.find((n) => n.name === person.name);
  // if (searchDuplication) {
  //   return res.status(400).json({
  //     error: "name must be unique",
  //   });
  // }

  // const id = Math.max(...phonebook.map((p) => p.id)) + 1;
  // person.id = id;
  //
  // phonebook = phonebook.concat(person);
  const newPerson = new Person({
    name: person.name,
    number: person.number,
  });
  newPerson.save().then((savedPerson) => {
    res.json(savedPerson);
  });
});

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((err) => console.log(err));
});
