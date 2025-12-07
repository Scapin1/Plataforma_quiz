import { useState } from 'react';
import { Box, Typography, CircularProgress, IconButton } from '@mui/material';
import { CheckCircle, Cancel, Replay, ArrowBack, Visibility } from '@mui/icons-material';
import NeonCard from './atoms/NeonCard';
import GameButton from './atoms/GameButton';
import GradientText from './atoms/GradientText';

/**
 * Results View
 * Displays the final score and allows reviewing questions.
 */
function Results({ score, total, answers, onRestart }) {
    const [showReview, setShowReview] = useState(false);
    const percentage = Math.round((score / total) * 100);
    const isSuccess = percentage >= 70;

    if (showReview) {
        return (
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <Box sx={{ width: '100%', maxWidth: 'md', display: 'flex', alignItems: 'center', mb: 2 }}>
                    <IconButton onClick={() => setShowReview(false)} sx={{ color: 'white', mr: 2, bgcolor: 'rgba(255,255,255,0.1)' }}>
                        <ArrowBack />
                    </IconButton>
                    <GradientText variant="h4">
                        REVISIÓN DE MISIÓN
                    </GradientText>
                </Box>

                {answers.map((ans, idx) => (
                    <NeonCard
                        key={idx}
                        sx={{
                            p: 3,
                            width: '100%',
                            maxWidth: 'md',
                            borderLeft: ans.isCorrect ? '6px solid #10b981' : '6px solid #ef4444',
                            background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.9))'
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                            {ans.isCorrect ? <CheckCircle color="success" sx={{ mt: 0.5 }} /> : <Cancel color="error" sx={{ mt: 0.5 }} />}
                            <Typography variant="h6" color="white" fontWeight="bold">
                                {idx + 1}. {ans.question.question}
                            </Typography>
                        </Box>

                        <Box sx={{ pl: 4, display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {ans.question.options.map((opt) => {
                                const isSelected = ans.selected === opt.key;
                                const isCorrect = ans.question.correct === opt.key;
                                let color = 'text.secondary';
                                let fontWeight = 'normal';

                                if (isCorrect) {
                                    color = '#10b981'; // Green
                                    fontWeight = 'bold';
                                } else if (isSelected && !isCorrect) {
                                    color = '#ef4444'; // Red
                                }

                                return (
                                    <Typography key={opt.key} variant="body1" sx={{ color, fontWeight, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        {isSelected && (isCorrect ? <CheckCircle fontSize="small" /> : <Cancel fontSize="small" />)}
                                        {opt.key}) {opt.value}
                                    </Typography>
                                );
                            })}
                        </Box>

                        <Box sx={{ mt: 3, p: 2, bgcolor: 'rgba(0,0,0,0.3)', borderRadius: 2 }}>
                            <Typography variant="subtitle2" color="primary" gutterBottom>
                                EXPLICACIÓN:
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {ans.question.explanation}
                            </Typography>
                        </Box>
                    </NeonCard>
                ))}

                <GameButton onClick={onRestart} sx={{ mt: 4, minWidth: 200 }}>
                    VOLVER AL MENÚ
                </GameButton>
            </Box>
        );
    }

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>

            {/* Score Card */}
            <NeonCard
                glowColor={isSuccess ? '#10b981' : '#ef4444'}
                sx={{ p: 6, width: '100%', maxWidth: 'sm', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
            >
                <Box sx={{ position: 'relative', display: 'inline-flex', mb: 3 }}>
                    <CircularProgress
                        variant="determinate"
                        value={100}
                        size={160}
                        thickness={4}
                        sx={{ color: 'rgba(255,255,255,0.1)', position: 'absolute' }}
                    />
                    <CircularProgress
                        variant="determinate"
                        value={percentage}
                        size={160}
                        thickness={4}
                        sx={{ color: isSuccess ? '#10b981' : '#ef4444' }}
                    />
                    <Box
                        sx={{
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <Typography variant="h3" component="div" fontWeight="900" color="white">
                            {percentage}%
                        </Typography>
                        <Typography variant="caption" component="div" color="text.secondary">
                            {score} / {total}
                        </Typography>
                    </Box>
                </Box>

                <GradientText variant="h4" gutterBottom gradient={isSuccess ? 'linear-gradient(to right, #10b981, #34d399)' : 'linear-gradient(to right, #ef4444, #f43f5e)'}>
                    {isSuccess ? '¡MISIÓN CUMPLIDA!' : 'MISIÓN FALLIDA'}
                </GradientText>

                <Typography variant="body1" color="text.secondary" mb={4}>
                    {isSuccess
                        ? 'Has demostrado un excelente dominio del tema.'
                        : 'Necesitas reforzar algunos conceptos. ¡Inténtalo de nuevo!'}
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                    <GameButton
                        startIcon={<Visibility />}
                        onClick={() => setShowReview(true)}
                        size="large"
                        color="info"
                        fullWidth
                        variant="outlined"
                    >
                        REVISAR RESPUESTAS
                    </GameButton>

                    <GameButton
                        startIcon={<Replay />}
                        onClick={onRestart}
                        size="large"
                        fullWidth
                    >
                        INTENTAR DE NUEVO
                    </GameButton>
                </Box>
            </NeonCard>
        </Box>
    );
}

export default Results;
