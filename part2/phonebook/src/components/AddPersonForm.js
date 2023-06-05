import axios from "axios";

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
      // setPersons(persons.concat(newPersonObject));

      axios
        .post("http://localhost:3001/persons", newPersonObject)
        .then((response) => {
          setPersons(persons.concat(response.data));
          alert(`${newName} added to the list`);
          console.log(response);
          setNewPhone("");
          setNewName("");
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
