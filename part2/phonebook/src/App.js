import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import AddPersonForm from "./components/AddPersonForm";
import Persons from "./components/Persons";

const App = () => {
  const personList = [
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ];
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleUser = (event) => {
    event.preventDefault();
    if (
      persons.some(
        (person) =>
          person.name.toLowerCase().trim() === newName.toLowerCase().trim()
      )
    ) {
      alert(`${newName} is already added`);
      return;
    }
    if (newPhone !== "") {
      const newPersonObject = { name: newName, number: newPhone };
      setPersons(persons.concat(newPersonObject));
      alert(`${newName} added to the list`);
      setNewName("");
      setNewPhone("");
    }
  };

  const handleName = (event) => {
    const nameUpdate = event.target.value;
    setNewName(nameUpdate);
  };
  const handlePhone = (event) => {
    const namePhone = event.target.value;
    setNewPhone(namePhone);
  };

  const handleSearch = (event) => {
    const searchInput = event.target.value;
    setSearch(searchInput);
  };

  const personsDisplay = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setSearch={setSearch} />
      <h2>add a new</h2>
      <AddPersonForm
        newName={newName}
        newPhone={newPhone}
        persons={persons}
        setNewName={setNewName}
        setNewPhone={setNewPhone}
        setPersons={setPersons}
      />
      <h2>Numbers</h2>
      <div>
        <Persons personsDisplay={personsDisplay} />
      </div>
    </div>
  );
};

export default App;
