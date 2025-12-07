import { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import questionsData from './data/preguntas.json';
import MainMenu from './components/MainMenu';
import Quiz from './components/Quiz';
import Results from './components/Results';
import CenteredLayout from './components/layout/CenteredLayout';
import GradientText from './components/atoms/GradientText';

function App() {
  const [view, setView] = useState('menu'); // 'menu', 'quiz', 'results'
  const [allQuestions, setAllQuestions] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Load questions from JSON
    setAllQuestions(questionsData);
  }, []);

  const startQuiz = (config) => {
    const { subject, source, count } = config;

    let filtered = allQuestions;

    if (subject) {
      filtered = filtered.filter(q => q.subject === subject);
    }

    if (source && source.length > 0) {
      filtered = filtered.filter(q => source.includes(q.source));
    }

    // Shuffle questions
    filtered = [...filtered].sort(() => 0.5 - Math.random());

    // Slice to count
    const selected = filtered.slice(0, count);

    setQuizQuestions(selected);
    setUserAnswers([]);
    setScore(0);
    setView('quiz');
  };

  const handleQuizFinish = (answers, finalScore) => {
    setUserAnswers(answers);
    setScore(finalScore);
    setView('results');
  };

  const restart = () => {
    setView('menu');
    setQuizQuestions([]);
    setUserAnswers([]);
    setScore(0);
  };

  const isQuiz = view === 'quiz';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CenteredLayout align={isQuiz ? 'right' : 'center'}>
        <header style={{ marginBottom: '2rem', textAlign: 'center', width: '100%' }}>
          <GradientText variant="h2" component="h1">
            PLATAFORMA DE ESTUDIO
          </GradientText>
        </header>

        {view === 'menu' && (
          <MainMenu
            questions={allQuestions}
            onStart={startQuiz}
          />
        )}

        {view === 'quiz' && (
          <Quiz
            questions={quizQuestions}
            onFinish={handleQuizFinish}
            onBack={restart}
          />
        )}

        {view === 'results' && (
          <Results
            score={score}
            total={quizQuestions.length}
            answers={userAnswers}
            questions={quizQuestions}
            onRestart={restart}
          />
        )}
      </CenteredLayout>
    </ThemeProvider>
  );
}

export default App;
