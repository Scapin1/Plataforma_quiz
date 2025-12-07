import { Box, Typography, FormControl, Select, MenuItem, Chip } from '@mui/material';
import NeonCard from '../atoms/NeonCard';
import GameButton from '../atoms/GameButton';
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
                <Typography variant="subtitle2" color="text.secondary" mb={1}>
                    FUENTES (Opcional)
                </Typography>
                <FormControl fullWidth>
                    <Select
                        multiple
                        value={selectedSources}
                        onChange={(e) => onSourceChange(e.target.value)}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} size="small" color="primary" />
                                ))}
                            </Box>
                        )}
                        sx={{ bgcolor: 'background.paper', borderRadius: 2 }}
                    >
                        {sources.map((source) => (
                            <MenuItem key={source} value={source}>
                                {source}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {/* Question Count */}
            <Box>
                <Typography variant="subtitle2" color="text.secondary" mb={1}>
                    CANTIDAD DE PREGUNTAS
                </Typography>
                <FormControl fullWidth>
                    <Select
                        value={questionCount}
                        onChange={(e) => onCountChange(e.target.value)}
                        sx={{ bgcolor: 'background.paper', borderRadius: 2 }}
                    >
                        {[5, 10, 15, 20, 30, 50].map((count) => (
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
