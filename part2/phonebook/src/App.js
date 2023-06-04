import { useState } from "react";

const App = () => {
  const personList = [{ name: "Arto Hellas" }];
  const [persons, setPersons] = useState(personList);
  const [newName, setNewName] = useState("");

  const handleName = (event) => {
    event.preventDefault();
    if (
      persons.some(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      alert(`${newName} is already added`);
      return;
    }
    const newPersonObject = { name: newName };
    setPersons(persons.concat(newPersonObject));
    alert(`${newName} added to the list`);
    setNewName("");
  };

  const handleChange = (event) => {
    const nameUpdate = event.target.value;
    setNewName(nameUpdate);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleName}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person, index) => (
          <p key={`person${index}`}>{person.name}</p>
        ))}
      </div>
    </div>
  );
};

export default App;
