import { useState } from "react";
import Filter from "./components/Filter";
import AddPersonForm from "./components/AddPersonForm";
import Persons from "./components/Persons";

const App = () => {
  const personList = [
    { name: "Arto Hellas", phone: "040-123456" },
    { name: "Ada Lovelace", phone: "39-44-5323523" },
    { name: "Dan Abramov", phone: "12-43-234345" },
    { name: "Mary Poppendieck", phone: "39-23-6423122" },
  ];
  const [persons, setPersons] = useState(personList);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [search, setSearch] = useState("");

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
      const newPersonObject = { name: newName, phone: newPhone };
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
