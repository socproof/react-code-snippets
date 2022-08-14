import React, { useEffect, useState, useMemo } from "react";
import {CountryButton} from "../CountryButton/CountryButton";
import mockData from '../../api/countries';

export const CountryCapital = ({ data = mockData }) => {
  const [playData, setPlayData] = useState<[string, string][]>([]);
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    setPlayData(Object.entries(data));
  }, [data]);

  useEffect(() => {
    checkAnswers();
  }, [answers]);

  const randomDataList = useMemo(
    () => playData.flat().sort(() => Math.random() - 0.5),
    [playData]
  );

  const checkAnswers = () => {
    const correctIndex = playData
      .map((pair) => pair.every((item) => answers.includes(item)))
      .findIndex((p) => p);

    if (correctIndex >= 0) {
      const restData = playData.filter(
        (_, index) => index !== correctIndex
      );
      setPlayData(restData);
    }
  };

  const handleClick = (answer: string) => {
    setAnswers(answers.length < 2 ? [...answers, answer] : [answer]);
  };

  return (
    <>
      {!playData.length && <h1>Congratulations</h1>}
      {randomDataList.map((button) =>
        <CountryButton
          key={button}
          title={button}
          answers={answers}
          handleClick={handleClick}
        />
      )}
    </>
  );
};

