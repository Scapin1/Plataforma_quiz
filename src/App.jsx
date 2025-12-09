import { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';

import MainMenu from './components/MainMenu';
import Quiz from './components/Quiz';
import Results from './components/Results';
import CenteredLayout from './components/layout/CenteredLayout';
import GradientText from './components/atoms/GradientText';

function App() {
  const [view, setView] = useState('menu'); // 'menu', 'quiz', 'results'
  const [subjectsData, setSubjectsData] = useState([]);
  const [currentSubject, setCurrentSubject] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Dynamically load all subject JSON files
    const loadSubjects = async () => {
      const modules = import.meta.glob('./data/subjects/*.json');
      const loadedSubjects = [];

      for (const path in modules) {
        const mod = await modules[path]();
        // mod.default because JSON import usually gives the default export or the module itself depends on configuration
        // In Vite with JSON, it typically works directly. Let's check the result.
        // Actually, import.meta.glob with JSON might be tricky if not careful.
        // Standard import gives the object.
        loadedSubjects.push(mod.default || mod);
      }
      setSubjectsData(loadedSubjects);
    };

    loadSubjects();
  }, []);

  const startQuiz = (config) => {
    const { subject, source, count } = config;

    // Find the subject data object
    let subjectData;
    let filtered;

    if (!subject) {
      // General Mode: Aggregate all questions
      subjectData = { name: 'Modo General' };
      filtered = subjectsData.flatMap(s => s.questions);
    } else {
      // Specific Subject
      subjectData = subjectsData.find(s => s.name === subject);
      if (!subjectData) {
        console.error("Subject not found:", subject);
        return;
      }
      filtered = subjectData.questions;
    }

    if (source && source.length > 0) {
      filtered = filtered.filter(q => source.includes(q.source));
    }

    // Shuffle questions
    filtered = [...filtered].sort(() => 0.5 - Math.random());

    // Slice to count
    const selected = filtered.slice(0, count);

    setCurrentSubject(subjectData);
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
    setCurrentSubject(null);
  };

  const isQuiz = view === 'quiz';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CenteredLayout align={isQuiz ? 'right' : 'center'}>
        <header style={{ marginBottom: '2rem', textAlign: 'center', width: '100%' }}>
          <GradientText variant="h2" component="h1">
            SYNAPSE
          </GradientText>
        </header>

        {view === 'menu' && (
          <MainMenu
            subjectsData={subjectsData}
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
