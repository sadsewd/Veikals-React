import "./style.css";

const TextField = (props) => {
  return (
    <input
      id="textfieldcomp"
      name={props.name}
      type={props.type}
      onChange={props.onChange}
      placeholder={props.placeholder}
      value={props.value}
    />
  );
};

export default TextField;
