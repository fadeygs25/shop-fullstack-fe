
const InputsGroup = ({ label, type, name, onChangeHandler, value }) => {
  return (
    <>
      <input
        type={type}
        label={label}
        name={name}
        size="lg"
        onChange={onChangeHandler}
        value={value}
      />
    </>
  );
};

export default InputsGroup;
