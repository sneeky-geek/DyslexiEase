import React from "react";
import MultipleChoice from "./questionTypes/MultipleChoice";
import ImageSelect from "./questionTypes/ImageSelect";
import AudioMatch from "./questionTypes/AudioMatch";
import TextInput from "./questionTypes/TextInput";

import Canvas from "../Home/Canvas";

const QuestionRenderer = ({ question, onAnswer }) => {
  const renderWithNextButton = (element) => (
    <div>
      {element}
      <button
        onClick={() => onAnswer(null)}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Next
      </button>
    </div>
  );

  if (!question?.type) return <div>No question provided</div>;

  switch (question.type) {
    case "multipleChoice":
      return <MultipleChoice question={question} onAnswer={onAnswer} />;
    case "imageSelect":
      return <ImageSelect question={question} onAnswer={onAnswer} />;
    case "audioMatch":
      return <AudioMatch question={question} onAnswer={onAnswer} />;
    case "textInput":
      return <TextInput question={question} onAnswer={onAnswer} />;
    
    case "canvas":
    case "interactive":
      // ✅ FIX: Render Canvas only once with a button
      return renderWithNextButton(<Canvas />);
    default:
      return <div>Unsupported question type: {question.type}</div>;
  }
};

export default QuestionRenderer;
