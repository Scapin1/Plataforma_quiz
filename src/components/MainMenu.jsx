import { useState, useMemo } from 'react';
import { Box, Fade } from '@mui/material';
import { NetworkCheck, Layers, Book } from '@mui/icons-material'; // MUI Icons
import SubjectCard from './molecules/SubjectCard';
import SettingsPanel from './organisms/SettingsPanel';

/**
 * MainMenu View
 * Displays subject selection cards and the settings panel.
 * Uses atomic components for a clean, modular structure.
 */
function MainMenu({ questions, onStart }) {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedSources, setSelectedSources] = useState([]);
  const [questionCount, setQuestionCount] = useState(10);
  const [viewState, setViewState] = useState('main'); // 'main' or 'settings'

  // Extract unique subjects and sources
  const subjects = useMemo(() => [...new Set(questions.map(q => q.subject).filter(Boolean))], [questions]);
  const sources = useMemo(() => [...new Set(questions.map(q => q.source).filter(Boolean))], [questions]);

  // Calculate available questions based on selection
  const availableCount = useMemo(() => {
    return questions.filter(q =>
      (!selectedSubject || q.subject === selectedSubject) &&
      (selectedSources.length === 0 || selectedSources.includes(q.source))
    ).length;
  }, [questions, selectedSubject, selectedSources]);

  const handleStart = () => {
    onStart({
      subject: selectedSubject,
      source: selectedSources,
      count: Math.min(questionCount, availableCount)
    });
  };

  const getIconForSubject = (subject) => {
    if (subject === 'Redes Computacionales') return NetworkCheck;
    return Book;
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

      {viewState === 'main' ? (
        <Fade in={true}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 4, width: '100%', maxWidth: 'lg' }}>
            {/* Subject Cards */}
            {subjects.map((subject) => (
              <SubjectCard
                key={subject}
                title={subject}
                icon={getIconForSubject(subject)}
                color={subject === 'Redes Computacionales' ? '#3b82f6' : '#8b5cf6'}
                onClick={() => {
                  setSelectedSubject(subject);
                  setViewState('settings');
                }}
              />
            ))}

            {/* General Mode Card */}
            <SubjectCard
              title="Modo General"
              icon={Layers}
              color="#db2777" // Pink
              onClick={() => {
                setSelectedSubject('');
                setViewState('settings');
              }}
            />
          </Box>
        </Fade>
      ) : (
        <Fade in={true}>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <SettingsPanel
              subjects={subjects}
              sources={sources}
              selectedSubject={selectedSubject}
              selectedSources={selectedSources}
              questionCount={questionCount}
              onSubjectChange={setSelectedSubject}
              onSourceChange={setSelectedSources}
              onCountChange={setQuestionCount}
              onStart={handleStart}
              onBack={() => setViewState('main')}
            />
          </Box>
        </Fade>
      )}
    </Box>
  );
}

export default MainMenu;
