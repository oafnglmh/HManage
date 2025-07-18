import "../css/QuestionStep3.css"
export default function QuestionStep3({ questions, info }) {
    if (!info.name?.trim()) {
        info.name = "Bộ đề";
    }
    if (!info.avatar?.trim()) {
        info.avatar = "https://res.cloudinary.com/dzvxim3zn/image/upload/v1752801933/HQuestion_yllifr.png";
    }
    if (!info.minute?.trim()) {
        info.minute = "15";
    }
    return (
        <div>
            <h3>{info.name}</h3>
            <p>{info.detail}</p>
            <p>{info.minute} phút</p>
            <img src={info.avatar} alt="avatar" width={80} />

            <h4>Câu hỏi đã thêm:</h4>
            {questions.map((q, i) => (
                <div key={i} className="review-question">
                    <p><strong>Câu {i + 1}:</strong> {q.question}</p>
                    <ul>
                        {q.answers.map((a, idx) => (
                            <li
                                key={idx}
                                style={{
                                    color: idx === q.correct ? "green" : "black",
                                    fontWeight: idx === q.correct ? "bold" : "normal"
                                }}
                            >
                                {String.fromCharCode(65 + idx)}. {a}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
