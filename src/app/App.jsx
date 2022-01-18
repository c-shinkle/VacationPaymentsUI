import React, { useState } from "react";
import "./App.css";
import PeopleInput from "../people-input/PeopleInput";
import ResultsTable from "../results-table/ResultsTable";
import postData from "../api/post-data";

const App = () => {
  const onNameInput = (index, value) => {
    setNames((prevNames) => {
      const newNames = [...prevNames];
      newNames[index] = value;
      return newNames;
    });
  };

  const onAmountInput = (index, value) => {
    setAmounts((prevAmounts) => {
      const newAmounts = [...prevAmounts];
      newAmounts[index] = value;
      return newAmounts;
    });
  };

  const defaultRows = ["", "", ""].map((str, index) => (
    <PeopleInput
      key={index}
      index={index}
      name={str}
      amount={str}
      onNameInput={onNameInput}
      onAmountInput={onAmountInput}
    />
  ));

  const [rows, setRows] = useState(defaultRows);
  const [names, setNames] = useState(["", "", ""]);
  const [amounts, setAmounts] = useState(["", "", ""]);
  const [people, setPeople] = useState([]);

  const onAddClick = (e) => {
    e.preventDefault();
    setRows((prevRows) => [
      ...prevRows,
      <PeopleInput
        key={rows.length}
        index={rows.length}
        name={""}
        amount={""}
        onNameInput={onNameInput}
        onAmountInput={onAmountInput}
      />,
    ]);
    setNames((prevNames) => [...prevNames, ""]);
    setAmounts((prevAmounts) => [...prevAmounts, ""]);
  };

  const onRemoveClick = (e) => {
    e.preventDefault();
    setRows((prevRows) => prevRows.slice(0, -1));
    setNames((prevNames) => prevNames.slice(0, -1));
    setAmounts((prevAmounts) => prevAmounts.slice(0, -1));
  };

  const onSubmitClick = async (e) => {
    e.preventDefault();
    const retrievePeople = async (names, amounts) => {
      const pairs = new Array(names.length);
      //what if names and amounts aren't same length?
      for (let i = 0; i < names.length; i++) {
        pairs[i] = {
          name: names[i],
          amount: amounts[i],
        };
      }

      let response;
      try {
        response = postData("http://localhost:8080/payments", pairs);
      } catch (e) {
        console.error(e);
        return [];
      }

      if (!response) {
        console.error("response came back empty");
        return [];
      }

      return response;
    };

    const people = await retrievePeople(names, amounts);
    setPeople(() => people);
  };

  return (
    <div className="App grid">
      <header className="header">
        <h1>Vacation Payments</h1>
      </header>
      <div>
        <form className="content">
          <div>{rows}</div>
          <div>
            <button className="button" onClick={onAddClick}>
              Add Row
            </button>
            <button className="button" onClick={onRemoveClick}>
              Remove Row
            </button>
            <button className="button" onClick={onSubmitClick}>
              Submit
            </button>
          </div>
        </form>
        <div className="content">
          <ResultsTable people={people} />
        </div>
      </div>
    </div>
  );
};

export default App;
