import "./style.css";

const Button = (props) => {
  return (
    <div id="Button" onClick={props.onClick}>
      {props.name}
    </div>
  );
};

export default Button;
