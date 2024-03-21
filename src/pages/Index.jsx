import React, { useState } from "react";
import { Box, Text, Radio, RadioGroup, Stack, Button, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";

const questions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    id: 2,
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Jupiter", "Saturn", "Neptune"],
    answer: "Jupiter",
  },
  {
    id: 3,
    question: "What is the currency of Japan?",
    options: ["Yuan", "Dollar", "Euro", "Yen"],
    answer: "Yen",
  },
];

const Index = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerChange = (value) => {
    setSelectedAnswer(value);
  };

  const handleSubmit = () => {
    const currentQuestionObj = questions[currentQuestion];
    if (selectedAnswer === currentQuestionObj.answer) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer("");
    setShowResult(false);
  };

  const currentQuestionObj = questions[currentQuestion];

  return (
    <Box maxWidth="500px" mx="auto" mt={8}>
      {currentQuestion < questions.length ? (
        <Box borderWidth={1} borderRadius="lg" p={6}>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            {currentQuestionObj.question}
          </Text>
          <RadioGroup value={selectedAnswer} onChange={handleAnswerChange}>
            <Stack>
              {currentQuestionObj.options.map((option) => (
                <Radio key={option} value={option}>
                  {option}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
          <Button mt={4} colorScheme="blue" onClick={handleSubmit} disabled={!selectedAnswer}>
            Submit
          </Button>
          {showResult && (
            <Alert mt={4} status={selectedAnswer === currentQuestionObj.answer ? "success" : "error"}>
              <AlertIcon />
              <AlertTitle>{selectedAnswer === currentQuestionObj.answer ? "Correct!" : "Wrong!"}</AlertTitle>
              <AlertDescription>{selectedAnswer === currentQuestionObj.answer ? "You selected the right answer." : `The correct answer is: ${currentQuestionObj.answer}`}</AlertDescription>
            </Alert>
          )}
          {showResult && (
            <Button mt={4} onClick={handleNextQuestion}>
              Next Question
            </Button>
          )}
        </Box>
      ) : (
        <Box textAlign="center">
          <Text fontSize="2xl" fontWeight="bold">
            Quiz Completed!
          </Text>
          <Text fontSize="xl" mt={4}>
            Your score: {score} out of {questions.length}
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default Index;
