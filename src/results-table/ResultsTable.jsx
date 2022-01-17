import "./ResultsTable.css";

const ResultsTable = (props) => {
  const func = (people) => {
    return people.length ? (
      people.map((person, i) => (
        <tr key={i}>
          <td>{person.name}</td>
          <td>{person.amount}</td>
        </tr>
      ))
    ) : (
      <tr><td colSpan="2">No results</td></tr>
    )
  };

  const people = props.people;
  return (
    <table>
      <thead>
        <tr>
          <th colSpan="2">Results</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Amount</th>
        </tr>
        {func(people)}
      </tbody>
    </table>
  );
};

export default ResultsTable;
