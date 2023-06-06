import axios from "axios";
import phonebookService from "../services/phonebook";

const AddPersonForm = ({
  newName,
  newPhone,
  persons,
  setNewName,
  setNewPhone,
  setPersons,
}) => {
  const handleUser = (event) => {
    event.preventDefault();

    const newSearchable = newName.toLowerCase().trim();

    const existing =
      persons.find(
        (person) => person.name.toLowerCase().trim() === newSearchable
      ) || "No Match";
    // console.log(existing);

    if (existing !== "No Match" && newPhone != "") {
      if (
        window.confirm(
          `${newName} is already added; do you want to update the phone number?`
        )
      ) {
        const newUser = { ...existing, number: newPhone };
        console.log("toUpdate...", newUser);
        phonebookService.update(existing.id, newUser).then((returnPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== existing.id ? person : returnPerson
            )
          );
        });
        return;
      } else {
        return;
      }
    }
    if (newPhone !== "") {
      const newPersonObject = { name: newName, number: newPhone };
      // setPersons(persons.concat(newPersonObject));
      phonebookService.create(newPersonObject).then((returnPerson) => {
        setPersons(persons.concat(returnPerson));
        setNewPhone("");
        setNewName("");
        alert(`${returnPerson.name} added to the list`);
      });
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

  return (
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
  );
};

export default AddPersonForm;
