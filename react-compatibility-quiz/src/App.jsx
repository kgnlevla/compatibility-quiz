// React ve diğer gerekli kütüphaneleri içe aktar
import React, { useState } from "react";
import ReactDOM from "react-dom";

// Quiz sorularını ve cevaplarını bir dizi olarak tanımla
const questions = [
  {
    question: "En sevdiğin renk hangisi?",
    answers: ["Kırmızı", "Mavi", "Yeşil", "Sarı"]
  },
  {
    question: "En sevdiğin hayvan hangisi?",
    answers: ["Kedi", "Köpek", "Kuş", "Balık"]
  },
  {
    question: "En sevdiğin müzik türü hangisi?",
    answers: ["Pop", "Rock", "Jazz", "Klasik"]
  },
  {
    question: "En sevdiğin spor hangisi?",
    answers: ["Futbol", "Basketbol", "Tenis", "Yüzme"]
  }
];

// Potansiyel eşleşmeleri bir dizi olarak tanımla
const matches = [
  {
    name: "Ali",
    age: 25,
    gender: "Erkek",
    score: 0,
    answers: ["Mavi", "Köpek", "Rock", "Futbol"]
  },
  {
    name: "Ayşe",
    age: 23,
    gender: "Kadın",
    score: 0,
    answers: ["Yeşil", "Kedi", "Jazz", "Tenis"]
  },
  {
    name: "Burak",
    age: 27,
    gender: "Erkek",
    score: 0,
    answers: ["Kırmızı", "Balık", "Klasik", "Yüzme"]
  },
  {
    name: "Ceren",
    age: 24,
    gender: "Kadın",
    score: 0,
    answers: ["Sarı", "Kuş", "Pop", "Basketbol"]
  }
];

// Form bileşenini tanımla
function Form({ onSubmit }) {
  // Formda girilen bilgileri state olarak tut
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  // Formun gönderilmesi durumunda onSubmit fonksiyonunu çağır
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, age, gender });
  };

  // Formun görünümünü döndür
  return (
    <div className="form">
      <h1>Compatibility Quiz</h1>
      <p>Lütfen aşağıdaki bilgileri doldurunuz.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Adınız:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="age">Yaşınız:</label>
        <input
          id="age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <label htmlFor="gender">Cinsiyetiniz:</label>
        <select
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="">Seçiniz</option>
          <option value="Erkek">Erkek</option>
          <option value="Kadın">Kadın</option>
        </select>
        <button type="submit">Başla</button>
      </form>
    </div>
  );
}

// Question bileşenini tanımla
function Question({ question, answer, onChange, onNext }) {
  // Sorunun görünümünü döndür
  return (
    <div className="question">
      <h1>{question.question}</h1>
      <p>Lütfen aşağıdaki seçeneklerden birini seçiniz.</p>
      <div className="answers">
        {question.answers.map((a) => (
          <label key={a}>
            <input
              type="radio"
              name="answer"
              value={a}
              checked={answer === a}
              onChange={(e) => onChange(e.target.value)}
            />
            {a}
          </label>
        ))}
      </div>
      <button onClick={onNext} disabled={!answer}>
        Devam
      </button>
    </div>
  );
}

// Result bileşenini tanımla
function Result({ user, matches, onReset }) {
  // Kullanıcının uyumluluk puanını hesapla
  const calculateScore = (user, match) => {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      if (user.answers[i] === match.answers[i]) {
        score++;
      }
    }
    return score;
  };

  // Potansiyel eşleşmelerin puanlarını güncelle
  for (let match of matches) {
    match.score = calculateScore(user, match);
  }

  // Potansiyel eşleşmeleri puanlarına göre sırala
  matches.sort((a, b) => b.score - a.score);

  // En yüksek puanlı eşleşmeyi bul
  const bestMatch = matches[0];

  // Sonucun görünümünü döndür
  return (
    <div className="result">
      <h1>Sonuçlar</h1>
      <p>Merhaba {user.name}, uyumluluk quizini tamamladın. Puanın: {bestMatch.score}/{questions.length}</p>
      <p>Senin için en uyumlu kişi: {bestMatch.name}, {bestMatch.age}, {bestMatch.gender}</p>
      <p>Diğer potansiyel eşleşmelerin:</p>
      <ul>
        {matches.slice(1).map((match) => (
          <li key={match.name}>
            {match.name}, {match.age}, {match.gender}, Puan: {match.score}
          </li>
        ))}
      </ul>
      <button onClick={onReset}>Yeni Quiz</button>
    </div>
  );
}

// App bileşenini tanımla
function App() {
  // Uygulamanın durumunu state olarak tut
  const [user, setUser] = useState(null);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");

  // Formun gönderilmesi durumunda kullanıcı bilgilerini kaydet
  const handleFormSubmit = (data) => {
    setUser({ ...data, answers: [] });
  };

  // Sorunun cevaplanması durumunda cevabı kaydet
  const handleQuestionChange = (value) => {
    setAnswer(value);
  };

  // Sorunun tamamlanması durumunda cevabı ve soru indeksini güncelle
  const handleQuestionNext = () => {
    setUser({ ...user, answers: [...user.answers, answer] });
    setIndex(index + 1);
    setAnswer("");
  };

  // Quizin sıfırlanması durumunda durumu başlangıç değerlerine döndür
  const handleQuizReset = () => {
    setUser(null);
    setIndex(0);
    setAnswer("");
  };

// Uygulamanın görünümünü döndür
  return (
    <div className="app">
      {!user && <Form onSubmit={handleFormSubmit} />}
      {user && index < questions.length && (
        <Question
          question={questions[index]}
          answer={answer}
          onChange={handleQuestionChange}
          onNext={handleQuestionNext}
        />
      )}
      {user && index === questions.length && (
        <Result user={user} matches={matches} onReset={handleQuizReset} />
      )}
    </div>
  );
}

// App bileşenini sayfaya yerleştir
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
