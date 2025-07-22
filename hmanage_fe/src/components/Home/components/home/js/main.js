import React, { useEffect } from "react";
import "../css/main.css";
import { FaCogs, FaRocket, FaLightbulb, FaLayerGroup, FaMicrophone } from "react-icons/fa";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useNavigate } from "react-router-dom";

function HomePage() {
    const { transcript, listening, resetTranscript } = useSpeechRecognition();
    const navigate = useNavigate();
    useEffect(() => {
        if (transcript.includes("trắc nghiệm")) {
            navigate("/questions");
        }
        if (transcript.includes("mạng xã hội")) {
            navigate("/socials");
        }
        if (transcript.includes("trang cá nhân")) {
            navigate("/users");
        }
    }, [transcript]);
    const handleMicClick = () => {
        if (listening) {
            SpeechRecognition.stopListening();
        } else {
            resetTranscript();
            SpeechRecognition.startListening({ continuous: false, language: "vi-VN" });
        }
    };

    return (
        <div className="homepage-container">
            <header className="hero-section">
                <img
                    src="https://res-console.cloudinary.com/dzvxim3zn/thumbnails/v1/image/upload/v1748352735/SE1hbmFnZV9ocWlmam0=/drilldown"
                    alt="HManage Logo"
                    className="logo-image"
                />
                <h1>🌟 HManage - Nền tảng Tất cả trong Một 🌟</h1>
                <p>
                    Nơi hội tụ mọi tính năng bạn cần, từ học tập, quản lý, sáng tạo đến trí tuệ nhân tạo!
                </p>
                <button className="cta-button">Khám phá ngay</button>

                <div className="mic-container">
                    <button className="mic-button" onClick={handleMicClick}>
                        <FaMicrophone className={listening ? "icon glowing" : "icon"} />
                        {listening ? "Đang nghe..." : ""}
                    </button>
                    {transcript && (
                        <p className="transcript-text">🗣️ Bạn vừa nói: <strong>{transcript}</strong></p>
                    )}
                </div>
            </header>

            <section className="features-section">
                <h2>💼 Các Tính Năng Nổi Bật</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <FaLightbulb className="icon" />
                        <h3>Học tập & Trắc nghiệm</h3>
                        <p>Ôn thi, luyện tập, và đánh giá năng lực theo từng chủ đề.</p>
                    </div>
                    <div className="feature-card">
                        <FaMicrophone className="icon" />
                        <h3>Điều khiển bằng giọng nói</h3>
                        <p>Chuyển trang nhanh chóng chỉ bằng cách nói, giúp bạn trải nghiệm thuận tiện và hiện đại hơn.</p>
                    </div>

                </div>
            </section>

            <footer className="footer-section">
                <p>© 2025 H-Manage. All rights reserved.</p>

            </footer>
        </div>
    );
}

export default HomePage;
