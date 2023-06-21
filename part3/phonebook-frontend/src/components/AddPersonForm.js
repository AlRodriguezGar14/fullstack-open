import axios from "axios";
import phonebookService from "../services/phonebook";

const AddPersonForm = ({
  newName,
  newPhone,
  persons,
  setNewName,
  setNewPhone,
  setPersons,
  setMessage,
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
        phonebookService
          .update(existing.id, newUser)
          .then((returnPerson) => {
            const updated = returnPerson;
            setPersons(
              persons.map((person) =>
                person.id !== existing.id ? person : returnPerson
              )
            );
            setMessage({ action: "updated", text: updated.name });
            setNewPhone("");
            setNewName("");
          })
          .catch((error) => {
            console.log("something went wrong", error);
          });
        return;
      } else {
        return;
      }
    }
    if (newPhone !== "") {
      const newPersonObject = { name: newName, number: newPhone };
      phonebookService.create(newPersonObject).then((returnPerson) => {
        const returned = returnPerson;
        setPersons(persons.concat(returned));
        setNewPhone("");
        setNewName("");
        setMessage({ action: "added", text: returned.name });
        // alert(`${returnPerson.name} added to the list`);
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
    <div>
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
    </div>
  );
};

export default AddPersonForm;
