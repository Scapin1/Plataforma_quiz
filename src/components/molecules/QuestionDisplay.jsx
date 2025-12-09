import { Typography, Box, Chip } from '@mui/material';
import { AutoAwesome } from '@mui/icons-material';
import HexagonBox from '../atoms/HexagonBox';

/**
 * QuestionDisplay Molecule
 * Displays the current question text inside a large hexagonal container.
 * Shows an AI warning if the question was deduced by AI.
 */
const QuestionDisplay = ({ question, code, isAiDeduced }) => {
    return (
        <HexagonBox
            sx={{
                width: '100%',
                minHeight: '160px',
                mb: 4,
                background: 'linear-gradient(135deg, #4c1d95 0%, #1e1b4b 100%)',
                boxShadow: '0 0 30px rgba(124, 58, 237, 0.3)',
                padding: '3px'
            }}
        >
            <Box className="content" sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 4,
                height: '100%',
                textAlign: 'center'
            }}>
                {isAiDeduced && (
                    <Chip
                        icon={<AutoAwesome sx={{ fontSize: 16 }} />}
                        label="Generada por IA"
                        size="small"
                        color="warning"
                        variant="outlined"
                        sx={{ mb: 2, borderColor: 'rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.7)' }}
                    />
                )}
                <Typography variant="h5" component="h2" fontWeight="bold" color="white">
                    {question}
                </Typography>

                {code && (
                    <Box
                        sx={{
                            mt: 3,
                            p: 2,
                            width: '100%',
                            maxWidth: '600px',
                            backgroundColor: '#1e1e1e',
                            borderRadius: 2,
                            border: '1px solid rgba(255,255,255,0.1)',
                            textAlign: 'left',
                            overflowX: 'auto'
                        }}
                    >
                        <Typography
                            component="pre"
                            sx={{
                                fontFamily: '"Fira Code", "Roboto Mono", monospace',
                                fontSize: '0.9rem',
                                color: '#e0e0e0',
                                margin: 0,
                                whiteSpace: 'pre-wrap'
                            }}
                        >
                            {code}
                        </Typography>
                    </Box>
                )}
            </Box>
        </HexagonBox>
    );
};

export default QuestionDisplay;
