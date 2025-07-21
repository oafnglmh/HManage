import React, { useEffect, useState } from "react";
import "../css/QuizScreen.css";
import { QuestionService } from "../Services/questionService";
function QuizScreen({ data, onSubmit }) {
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState((data.minutes || 5) * 60);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleAnswer = (questionIndex, answerIndex) => {
        setAnswers({ ...answers, [questionIndex]: answerIndex });
    };

    const handleSubmit = async () => {
        try {
            let score = 0;
            data.inf01.forEach((question, index) => {
                if (answers[index] === question.correct) {
                    score++;
                }
            });

            setScore(score);
            setShowResult(true);
            onSubmit(score, data.inf01.length);

            if (!data.projectId) {
                console.error("Missing projectId. Cannot submit result.");
                return;
            }

            const payload = {
                inf02: score,
                parentId: data.projectId,
                status: "10"
            };
            const res = await QuestionService.start(payload);
            console.log("Submit result response:", res);

        } catch (error) {
            console.error("Error while submitting result:", error);
        }
    };


    const formatTime = () => {
        const min = Math.floor(timeLeft / 60);
        const sec = timeLeft % 60;
        return `${min}:${sec.toString().padStart(2, "0")}`;
    };

    return (
        <div className="quiz-screen">
            <h2>{data.name}</h2>
            <div className="quiz-header">
                <span className="timer">Thời gian còn lại: {formatTime()}</span>
                {showResult && (
                    <span className="score">Điểm: {score}/{data.inf01.length}</span>
                )}
            </div>
            <div className="question-list">
                {Array.isArray(data?.inf01) &&
                    data.inf01.map((q, index) => (
                        <div key={index} className="question-box">
                            <p><strong>Câu {index + 1}:</strong> {q.question}</p>
                            {q.answers.map((ans, i) => (
                                <label key={i} className="answer-option">
                                    <input
                                        type="radio"
                                        name={`question-${index}`}
                                        checked={answers[index] === i}
                                        onChange={() => handleAnswer(index, i)}
                                        disabled={showResult}
                                    />
                                    {ans}
                                </label>
                            ))}
                        </div>
                    ))}
            </div>
            {!showResult && (
                <button className="submit-btn" onClick={handleSubmit}>Nộp bài</button>
            )}
        </div>
    );
}

export default QuizScreen;
