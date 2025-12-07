import { useState, useMemo } from 'react';
import { Box, Fade } from '@mui/material';
import { NetworkCheck, Layers, Book, Computer, Science } from '@mui/icons-material'; // MUI Icons
import SubjectCard from './molecules/SubjectCard';
import SettingsPanel from './organisms/SettingsPanel';

/**
 * MainMenu View
 * Displays subject selection cards and the settings panel.
 * Uses atomic components for a clean, modular structure.
 */
function MainMenu({ subjectsData, onStart }) {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedSources, setSelectedSources] = useState([]);
  const [questionCount, setQuestionCount] = useState(10);
  const [viewState, setViewState] = useState('main'); // 'main' or 'settings'

  // Extract subject names for display
  // subjectsData is an array of { name, logo, questions, ... }

  // Get sources based on selected subject
  const sources = useMemo(() => {
    if (selectedSubject) {
      const subject = subjectsData.find(s => s.name === selectedSubject);
      return subject ? [...new Set(subject.questions.map(q => q.source).filter(Boolean))] : [];
    }
    // General mode? The user didn't specify if general mode (all questions) should still exist.
    // The previous implementation had a "Modo General". 
    // To support it, we'd need to aggregate all questions.
    // Let's assume for now we keep it if possible, or maybe just subjects as requested.
    // The user request was "separate subjects", implies distinct usage.
    // But let's keep it robust. If no subject selected, maybe we shouldn't allow start or aggregate all?
    // The previous code had "Modo General". Let's support it by aggregating.

    const allQuestions = subjectsData.flatMap(s => s.questions);
    return [...new Set(allQuestions.map(q => q.source).filter(Boolean))];
  }, [subjectsData, selectedSubject]);

  // Calculate available questions
  const availableCount = useMemo(() => {
    if (selectedSubject) {
      const subject = subjectsData.find(s => s.name === selectedSubject);
      if (!subject) return 0;
      return subject.questions.filter(q =>
        selectedSources.length === 0 || selectedSources.includes(q.source)
      ).length;
    }

    // General Mode (all subjects)
    const allQuestions = subjectsData.flatMap(s => s.questions);
    return allQuestions.filter(q =>
      selectedSources.length === 0 || selectedSources.includes(q.source)
    ).length;

  }, [subjectsData, selectedSubject, selectedSources]);

  const handleStart = () => {
    onStart({
      subject: selectedSubject,
      source: selectedSources,
      count: Math.min(questionCount, availableCount)
    });
  };



  const ICON_MAP = {
    NetworkCheck,
    Layers,
    Book,
    Computer,
    Science
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

      {viewState === 'main' ? (
        <Fade in={true}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 4, width: '100%', maxWidth: 'lg' }}>
            {/* Subject Cards */}
            {subjectsData.map((subject) => (
              <SubjectCard
                key={subject.id || subject.name}
                title={subject.name}
                icon={ICON_MAP[subject.icon] || Book}
                color={subject.name === 'Redes Computacionales' ? '#3b82f6' : '#8b5cf6'}
                onClick={() => {
                  setSelectedSubject(subject.name);
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
              subjects={subjectsData.map(s => s.name)}
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
