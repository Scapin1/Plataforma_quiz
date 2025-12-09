import { useState } from 'react';
import { Box, Fade, IconButton, Tooltip, Typography } from '@mui/material';
import { Flag, ArrowBack } from '@mui/icons-material';
import ProgressBar from './molecules/ProgressBar';
import QuestionDisplay from './molecules/QuestionDisplay';
import AnswerGrid from './organisms/AnswerGrid';
import GameButton from './atoms/GameButton';
import NeonCard from './atoms/NeonCard';

/**
 * Quiz View
 * The main game interface.
 * Composed of atomic components for a modular "Game UI".
 */
function Quiz({ questions, onFinish, onBack }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [score, setScore] = useState(0);

    const currentQuestion = questions[currentIndex];

    const handleOptionSelect = (key) => {
        if (showExplanation) return;
        setSelectedOption(key);
    };

    const handleSubmitAnswer = () => {
        const isCorrect = selectedOption === currentQuestion.correct;
        setAnswers([...answers, { question: currentQuestion, selected: selectedOption, isCorrect }]);
        if (isCorrect) setScore(score + 1);
        setShowExplanation(true);
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setSelectedOption(null);
            setShowExplanation(false);
        } else {
            onFinish([...answers], score);
        }
    };

    const handleReport = () => {
        alert(`Reporte enviado para la pregunta: "${currentQuestion.question}"\nID: ${currentIndex}`);
    };

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>

            {/* Header: Back, Progress & Report */}
            <Box sx={{ width: '100%', maxWidth: 'lg', mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Tooltip title="Volver al menú">
                    <IconButton onClick={onBack} sx={{ color: 'rgba(255,255,255,0.7)', '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.1)' } }}>
                        <ArrowBack />
                    </IconButton>
                </Tooltip>

                <Box sx={{ flexGrow: 1 }}>
                    <ProgressBar current={currentIndex + 1} total={questions.length} />
                </Box>

                <Tooltip title="Reportar pregunta">
                    <IconButton onClick={handleReport} color="error" sx={{ bgcolor: 'rgba(239,68,68,0.1)' }}>
                        <Flag />
                    </IconButton>
                </Tooltip>
            </Box>

            <Fade in={true} key={currentIndex}>
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>

                    {/* Question Display */}
                    <QuestionDisplay
                        question={currentQuestion.question}
                        code={currentQuestion.code}
                        isAiDeduced={currentQuestion.ai_deduced}
                    />

                    {/* Options Grid */}
                    <AnswerGrid
                        options={currentQuestion.options}
                        selectedOption={selectedOption}
                        showExplanation={showExplanation}
                        correctOption={currentQuestion.correct}
                        onSelect={handleOptionSelect}
                    />
                </Box>
            </Fade>

            {/* Explanation & Controls */}
            <Box sx={{ width: '100%', maxWidth: 'lg', mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                {showExplanation && (
                    <Fade in={true}>
                        <NeonCard sx={{ p: 3, mb: 3, width: '100%', borderLeft: '4px solid #3b82f6' }}>
                            <Typography variant="h6" color="primary" gutterBottom fontWeight="bold">
                                Explicación
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {currentQuestion.explanation}
                            </Typography>
                            {currentQuestion.source && (
                                <Typography variant="caption" display="block" sx={{ mt: 1, fontFamily: 'monospace', color: 'text.disabled' }}>
                                    Fuente: {currentQuestion.source}
                                </Typography>
                            )}
                        </NeonCard>
                    </Fade>
                )}

                {!showExplanation ? (
                    <GameButton
                        size="large"
                        disabled={!selectedOption}
                        onClick={handleSubmitAnswer}
                        sx={{ width: { xs: '100%', md: 'auto' }, minWidth: 200 }}
                    >
                        CONFIRMAR
                    </GameButton>
                ) : (
                    <GameButton
                        size="large"
                        color="success"
                        onClick={handleNext}
                        sx={{ width: { xs: '100%', md: 'auto' }, minWidth: 200 }}
                    >
                        {currentIndex < questions.length - 1 ? 'SIGUIENTE' : 'FINALIZAR'}
                    </GameButton>
                )}
            </Box>
        </Box>
    );
}

export default Quiz;
