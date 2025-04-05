import React from "react";
import MultipleChoice from "./questionTypes/MultipleChoice";
import ImageSelect from "./questionTypes/ImageSelect";
import AudioMatch from "./questionTypes/AudioMatch";
import TextInput from "./questionTypes/TextInput";

const QuestionRenderer = ({ question, onAnswer }) => {
  switch (question.type) {
    case "multipleChoice":
      return <MultipleChoice question={question} onAnswer={onAnswer} />;
    case "imageSelect":
      return <ImageSelect question={question} onAnswer={onAnswer} />;
    case "audioMatch":
      return <AudioMatch question={question} onAnswer={onAnswer} />;
    case "textInput":
      return <TextInput question={question} onAnswer={onAnswer} />;
    default:
      return <div>Unknown question type</div>;
  }
};

export default QuestionRenderer;
