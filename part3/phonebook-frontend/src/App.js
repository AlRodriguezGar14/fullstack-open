import { useState, useEffect } from "react";
import axios from "axios";
import phonebookService from "./services/phonebook";
import Filter from "./components/Filter";
import AddPersonForm from "./components/AddPersonForm";
import Persons from "./components/Persons";
import Message from "./components/Message";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState({ action: null, content: null });

  useEffect(() => {
    phonebookService
      .getAll()
      .then((users) => setPersons(users))
      .catch((error) => console.log(`something went wrong: ${error}`));
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
      <Message message={message} setMessage={setMessage} />
      <AddPersonForm
        newName={newName}
        newPhone={newPhone}
        persons={persons}
        setNewName={setNewName}
        setNewPhone={setNewPhone}
        setPersons={setPersons}
        message={message}
        setMessage={setMessage}
      />
      <h2>Numbers</h2>
      <div>
        <Persons personsDisplay={personsDisplay} setPersons={setPersons} />
      </div>
    </div>
  );
};

export default App;
