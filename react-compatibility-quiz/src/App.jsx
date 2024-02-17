import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const questions = [
  {
    question:
      'What kind of activity are you most likely to engage in on a weekend?',
    answers: [
      'reading a book, watching a movie, or binging Netflix',
      'heading out to a play, concert or museum',
      'hiking, biking, or generally being outdoors',
      'Meet me at the club!',
    ],
  },
  {
    question: 'What kind of food are you most into?',
    answers: [
      'burger and fries',
      'veggie/vegan',
      'anything ethnic and/or spicy',
      'the edible kind',
    ],
  },
  {
    question: 'Where do you get your news?',
    answers: [
      'the New York Times',
      'various online sources',
      'Fox',
      'I try to avoid the news',
    ],
  },
  {
    question: 'What role does religion play in your life?',
    answers: [
      'major—much of my behavior and outlook are shaped by it',
      'basically limited to holidays',
      'I’m spiritual, but not religious',
      'none at all— I’m an atheist/agnostic',
    ],
  },
  {
    question: 'How many friends do you have outside of your race?',
    answers: [
      'lots – we’re a friggin’ Benetton ad',
      'some but mostly I hang with people my own race',
      'none but it’s not deliberate',
      'none and I prefer it that way',
    ],
  },
  {
    question: 'Do you smoke?',
    answers: [
      'Like a chimney',
      'Not cigarettes, buuuuut…',
      'Nope, but I don’t mind if my date does',
      'Nope, and I’d prefer if my date didn’t ruin breathing for me',
    ],
  },
  {
    question: 'How would you describe your tolerance for mess?',
    answers: [
      'zero',
      'I’m generally neat, but will leave them dishes in the sink if I’m busy',
      'I’ve been known to sleep on piles of unfolded laundry, and very little horizontal surface is visible in my place',
      'I never really think about it because someone else keeps my space clean',
    ],
  },
  {
    question: 'Stance on kids?',
    answers: [
      'Love ‘em! Want ‘em!(/Got ‘em!)',
      'I like hanging with them... as long as I can give them back to their parents',
      'Meh. Tolerable',
      'Fuuuuuck that noise',
    ],
  },
];

const matches = [
  {
    name: 'Ali',
    location: 'Istanbul',
    age: 25,
    gender: 'Male',
    seeking: 'Female',
    score: 0,
    answers: [
      'heading out to a play, concert or museum',
      'anything ethnic and/or spicy',
      'the New York Times',
      'I’m spiritual, but not religious',
      'lots – we’re a friggin’ Benetton ad',
      'Not cigarettes, buuuuut…',
      'I’m generally neat, but will leave them dishes in the sink if I’m busy',
      'Love ‘em! Want ‘em!(/Got ‘em!)',
    ],
  },
  {
    name: 'Ayşe',
    location: 'Ankara',
    age: 23,
    gender: 'Female',
    seeking: 'Male',
    score: 0,
    answers: [
      'reading a book, watching a movie, or binging Netflix',
      'veggie/vegan',
      'various online sources',
      'basically limited to holidays',
      'some but mostly I hang with people my own race',
      'Nope, and I’d prefer if my date didn’t ruin breathing for me',
      'zero',
      'I like hanging with them... as long as I can give them back to their parents',
    ],
  },
  {
    name: 'Burak',
    location: 'Izmir',
    age: 27,
    gender: 'Male',
    seeking: 'Female',
    score: 0,
    answers: [
      'hiking, biking, or generally being outdoors',
      'burger and fries',
      'Fox',
      'major—much of my behavior and outlook are shaped by it',
      'none but it’s not deliberate',
      'Like a chimney',
      'I’ve been known to sleep on piles of unfolded laundry, and very little horizontal surface is visible in my place',
      'Meh. Tolerable',
    ],
  },
  {
    name: 'Ceren',
    location: 'Bursa',
    age: 24,
    gender: 'Female',
    seeking: 'Male',
    score: 0,
    answers: [
      'Meet me at the club!',
      'the edible kind',
      'I try to avoid the news',
      'none at all— I’m an atheist/agnostic',
      'none and I prefer it that way',
      'Nope, but I don’t mind if my date does',
      'I never really think about it because someone else keeps my space clean',
      'Fuuuuuck that noise',
    ],
  },
];

function Form({ onSubmit }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [seeking, setSeeking] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ name, location, age, gender, seeking });
  };

  return (
    <div className='form'>
      <h1>Compatibility Quiz</h1>
      <p>Please fill in the information below.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Name:</label>
        <input
          id='name'
          type='text'
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <label htmlFor='location'>Location:</label>
        <input
          id='location'
          type='text'
          value={location}
          onChange={e => setLocation(e.target.value)}
          required
        />
        <label htmlFor='age'>Age:</label>
        <input
          id='age'
          type='number'
          value={age}
          onChange={e => setAge(e.target.value)}
          required
        />
        <label htmlFor='gender'>Gender:</label>
        <select
          id='gender'
          value={gender}
          onChange={e => setGender(e.target.value)}
          required
        >
          <option value=''>Choose</option>
          <option value='Erkek'>Male</option>
          <option value='Kadın'>Female</option>
        </select>
        <label htmlFor='seeking'>The gender you are looking for:</label>
        <select
          id='seeking'
          value={seeking}
          onChange={e => setSeeking(e.target.value)}
          required
        >
          <option value=''>Choose</option>
          <option value='Erkek'>Male</option>
          <option value='Kadın'>Female</option>
        </select>
        <button type='submit'>Start</button>
      </form>
    </div>
  );
}

function Question({ question, answer, onChange, onNext }) {
  return (
    <div className='question'>
      <h2>{question.question}</h2>
      <div className='answers'>
        {question.answers.map((a, i) => (
          <label key={i}>
            <input
              type='radio'
              name='answer'
              value={a}
              checked={answer === a}
              onChange={onChange}
            />
            {a}
          </label>
        ))}
      </div>
      <button onClick={onNext}>Next</button>
    </div>
  );
}

function Result({ user, matches, onReset }) {
  const calculateScore = (user, match) => {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      if (user.answers[i] === match.answers[i]) {
        score++;
      }
    }
    return score;
  };

  for (let match of matches) {
    match.score = calculateScore(user, match);
  }

  matches.sort((a, b) => b.score - a.score);

  const bestMatch = matches[0];

  return (
    <div className='result'>
      <h1>Result</h1>
      <p>Hello {user.name}, thank you for completing our compatibility quiz.</p>
      <p>
        Your compatibility score: {bestMatch.score}/{questions.length}
      </p>
      <p>Your highest compatibility match:</p>
      <ul>
        <li>
          {bestMatch.name}, {bestMatch.location}, {bestMatch.age},{' '}
          {bestMatch.gender} ({bestMatch.score}/{questions.length} compatible)
        </li>
      </ul>
      <button onClick={onReset}>New Quiz</button>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');

  const handleFormSubmit = data => {
    setUser({ ...data, answers: [] });
  };

  const handleAnswerChange = e => {
    setAnswer(e.target.value);
  };

  const handleNextQuestion = () => {
    setUser({ ...user, answers: [...user.answers, answer] });
    setIndex(index + 1);
    setAnswer('');
  };

  const handleResetQuiz = () => {
    setUser(null);
    setIndex(0);
    setAnswer('');
  };

  return (
    <div className='app'>
      {!user && <Form onSubmit={handleFormSubmit} />}
      {user && index < questions.length && (
        <Question
          question={questions[index]}
          answer={answer}
          onChange={handleAnswerChange}
          onNext={handleNextQuestion}
        />
      )}
      {user && index === questions.length && (
        <Result user={user} matches={matches} onReset={handleResetQuiz} />
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
