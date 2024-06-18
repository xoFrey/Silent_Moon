const ButtonPink = ({ name, funktion }) => {
  return (
    <div>
      <button onClick={funktion}>{name}</button>
    </div>
  );
};

export default ButtonPink;
