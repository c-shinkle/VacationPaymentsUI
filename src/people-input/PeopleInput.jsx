import "./PeopleInput.css";

const PeopleInput = (props) => {
  const { index, nameValue, amountValue, onNameInput, onAmountInput } = props;
  return (
    <div className="input-row">
      <label className="input-name">
        Name:
        <input
          type={"text"}
          label={"name"}
          value={nameValue}
          onBlur={(e) => {
            e.preventDefault();
            onNameInput(index, e.target.value);
          }}
        />
      </label>
      <label className="input-amount">
        Amount:
        <input
          type={"text"}
          label={"amount"}
          value={amountValue}
          onBlur={(e) => {
            e.preventDefault();
            onAmountInput(index, e.target.value);
          }}
        />
      </label>
    </div>
  );
};

export default PeopleInput;
