interface Iprops {
  text: string;
  handleClick: (text: string) => void;
}

export const Test = ({ text,handleClick }: Iprops) => {
  return (
    <div>
      <button onClick={() => handleClick(text)}>{text}</button>
    </div>
  );
};
