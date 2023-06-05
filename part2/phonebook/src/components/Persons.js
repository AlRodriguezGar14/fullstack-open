const printIds = (id) => {
  // event.preventDefault();
  console.log(id);
};

const Persons = ({ personsDisplay }) => {
  return (
    <div>
      {personsDisplay.map((person) => (
        <div key={`person${person.id}`}>
          <p>
            {person.name} - {person.number}
          </p>
          <button onClick={() => printIds(person.id)}>print id</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
