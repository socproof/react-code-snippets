import React, {useMemo, useState} from "react";

export const CountryButton = ({handleClick, title, answers }: {handleClick: (s: string) => void, title: string, answers: string[]}) => {
  const [isClicked, setClicked] = useState(false)

  const handleIsClicked = () => {
    handleClick(title)
    if (!isClicked)  {
      setClicked(true);
    }
  };

  const backgroundColor = useMemo(() => {
    if (answers.length < 2 && answers[0] === title) return 'blue';
    if (answers.length > 1 && answers.includes(title)) return 'red';
  }, [answers, isClicked]);

  return (
    <button onClick={handleIsClicked} key={title} style={{ backgroundColor }}>
      {title}
    </button>
  );
};
