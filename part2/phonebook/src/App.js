import { useState } from "react";

const App = () => {
  const personList = [{ name: "Arto Hellas", phone: "040-123456" }];
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
      <form>
        <div>
          filter shown with <input className="search" onChange={handleSearch} />
        </div>
      </form>
      <h2>add a new</h2>
      <form onSubmit={handleUser}>
        <div>
          name: <input value={newName} onChange={handleName} />
        </div>
        <div>
          number: <input value={newPhone} onChange={handlePhone} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {personsDisplay.map((person, index) => (
          <p key={`person${index}`}>
            {person.name} - {person.phone}
          </p>
        ))}
      </div>
    </div>
  );
};

export default App;
