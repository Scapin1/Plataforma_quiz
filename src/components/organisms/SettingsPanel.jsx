import { Box, Typography, FormControl, Select, MenuItem } from '@mui/material';
import NeonCard from '../atoms/NeonCard';
import GameButton from '../atoms/GameButton';
import SourceSelector from '../molecules/SourceSelector';
import { PlayArrow } from '@mui/icons-material';

/**
 * SettingsPanel Organism
 * The configuration form for starting a new quiz.
 * Allows selecting subject, sources, and question count.
 */
const SettingsPanel = ({
    subjects,
    sources,
    selectedSubject,
    selectedSources,
    questionCount,
    maxQuestions,
    onSubjectChange,
    onSourceChange,
    onCountChange,
    onStart,
    onBack
}) => {
    return (
        <NeonCard sx={{ width: '100%', maxWidth: 500, p: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h5" fontWeight="bold" color="primary">
                    CONFIGURACIÓN
                </Typography>
                <GameButton size="small" color="secondary" onClick={onBack}>
                    VOLVER
                </GameButton>
            </Box>

            {/* Subject Selection (Read-only display) */}
            <Box>
                <Typography variant="subtitle2" color="text.secondary" mb={1}>
                    ASIGNATURA
                </Typography>
                <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, border: '1px solid rgba(255,255,255,0.1)' }}>
                    <Typography variant="body1" fontWeight="bold">
                        {selectedSubject || 'Modo General'}
                    </Typography>
                </Box>
            </Box>

            {/* Source Selection */}
            <Box>
                <SourceSelector
                    sources={sources}
                    selectedSources={selectedSources}
                    onSourceChange={onSourceChange}
                />
            </Box>

            {/* Question Count */}
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        CANTIDAD DE PREGUNTAS
                    </Typography>
                    <Typography variant="caption" color="primary">
                        (Máx: {maxQuestions})
                    </Typography>
                </Box>
                <FormControl fullWidth>
                    <Select
                        value={questionCount}
                        onChange={(e) => onCountChange(e.target.value)}
                        sx={{ bgcolor: 'background.paper', borderRadius: 2 }}
                    >
                        {[5, 10, 15, 20, 30, 50]
                            .filter(count => count <= maxQuestions)
                            .concat([maxQuestions])
                            .sort((a, b) => a - b)
                            .filter((item, index, array) => array.indexOf(item) === index) // Unique
                            .map((count) => (
                                <MenuItem key={count} value={count}>
                                    {count} Preguntas
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
            </Box>

            <GameButton
                size="large"
                fullWidth
                onClick={onStart}
                startIcon={<PlayArrow />}
                sx={{ mt: 2 }}
            >
                INICIAR MISIÓN
            </GameButton>
        </NeonCard>
    );
};

export default SettingsPanel;
