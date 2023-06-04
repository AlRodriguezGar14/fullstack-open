const Persons = ({ personsDisplay }) => {
  return (
    <div>
      {personsDisplay.map((person, index) => (
        <p key={`person${index}`}>
          {person.name} - {person.phone}
        </p>
      ))}
    </div>
  );
};

export default Persons;
