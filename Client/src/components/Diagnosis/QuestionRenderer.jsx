import React from "react";
import MultipleChoice from "./questionTypes/MultipleChoice";
import ImageSelect from "./questionTypes/ImageSelect";
import AudioMatch from "./questionTypes/AudioMatch";
import TextInput from "./questionTypes/TextInput";
import EyeTrackingTest from "../Home/EyeTrackingTest"; // Import EyeTrackingTest
import Canvas from "../Home/Canvas"; // Import Canvas

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
    case "interactive":
      if (question.component === "EyeTrackingTest") {
        return <Canvas />;
      } else if (question.component === "Canvas") {
        return <EyeTrackingTest/>;
      }
      return <div>Unknown interactive component</div>;
    default:
      return <div>Unknown question type</div>;
  }
};

export default QuestionRenderer;
