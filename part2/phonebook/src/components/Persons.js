const Persons = ({ personsDisplay }) => {
  return (
    <div>
      {personsDisplay.map((person, index) => (
        <p key={`person${index}`}>
          {person.name} - {person.number}
        </p>
      ))}
    </div>
  );
};

export default Persons;
