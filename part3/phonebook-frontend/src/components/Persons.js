import phonebookService from "../services/phonebook.js";

const Persons = ({ personsDisplay, setPersons }) => {
  const deletePerson = (id) => {
    const url = `http://localhost:3001/api/persons/${id}`;
    const personToRemove = personsDisplay.find((person) => person.id === id);

    if (window.confirm(`Do you want to delete ${personToRemove.name}`)) {
      phonebookService.remove(id).then(() => {
        phonebookService.getAll().then((response) => {
          const updatedPersons = response;
          setPersons(updatedPersons);
        });
      });
      return;
    }
  };

  return (
    <div>
      {personsDisplay.map((person) => (
        <div key={`person${person.id}`}>
          <p>
            {person.name} - {person.number}
          </p>
          <button onClick={() => deletePerson(person.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
