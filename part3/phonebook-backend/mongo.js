const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const newUser = process.argv[3];
const userNumber = process.argv[4];

const url = `mongodb+srv://alrodri:${password}@cluster0.d7gtony.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String || Number,
});

const Person = mongoose.model("Person", personSchema);

if (!newUser) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
} else {
  const person = new Person({
    name: newUser,
    number: userNumber,
  });

  person.save().then((result) => {
    console.log(`added ${newUser} number ${userNumber} to the phonebook`);
    mongoose.connection.close();
  });
}
