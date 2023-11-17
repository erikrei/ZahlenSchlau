import React, { Fragment } from "react";

import { v4 as uuidv4 } from "uuid";

import { AiFillBug } from "react-icons/ai";

type TVisualExerciseChild = {
  element: JSX.Element;
};

type TVisualExercise = {
  element: JSX.Element;
  children: TVisualExerciseChild[];
};

export default function AbfrageAntwortenVisual({
  answerNumber,
}: {
  answerNumber: number;
}) {
  const arr: TVisualExercise[] = [];

  // loopLength = 13
  const loopLength = Math.ceil(answerNumber / 5);

  function getChildArrFromLength(arrLength: number): TVisualExerciseChild[] {
    const childArr: TVisualExerciseChild[] = [];

    if (arrLength === 0) arrLength = 5;

    for (let i = 0; i < arrLength; i++) {
      const childKey: string = uuidv4();
      const childElement: JSX.Element = <AiFillBug key={childKey} />;
      childArr.push({
        element: childElement,
      });
    }

    return childArr;
  }

  for (let i = 0; i < loopLength; i++) {
    if (i === loopLength - 1) {
      arr.push({
        element: <div className="visual-icon-container" key={uuidv4()}></div>,
        children: getChildArrFromLength(answerNumber % 5),
      });
    } else {
      arr.push({
        element: <div className="visual-icon-container" key={uuidv4()}></div>,
        children: getChildArrFromLength(5),
      });
    }
  }

  return (
    <div className="visual-container">
      {arr.map((item) => {
        const key = uuidv4();
        return <div className="visual-icon-container" key={key}>
          {item.children.map((icon) => {
            return icon.element
          })}
        </div>
      })}
    </div>
  );
}
