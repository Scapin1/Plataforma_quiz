import { Typography, ButtonBase } from '@mui/material';
import { styled } from '@mui/material/styles';
import HexagonBox from '../atoms/HexagonBox';

const StyledButtonBase = styled(ButtonBase)(({ theme }) => ({
    width: '100%',
    height: '80px', // Fixed height for consistency
    position: 'relative',
    transition: 'transform 0.1s',
    '&:active': {
        transform: 'scale(0.98)',
    },
}));

/**
 * AnswerOption Molecule
 * A clickable hexagonal button for quiz answers.
 * Handles states: default, selected, correct, incorrect.
 */
const AnswerOption = ({ label, text, state, onClick, disabled }) => {
    // Determine gradient based on state
    let gradient = 'linear-gradient(to right, #2563eb, #4f46e5)'; // Default Blue
    let glow = 'rgba(59, 130, 246, 0.4)';

    if (state === 'selected') {
        gradient = 'linear-gradient(to right, #06b6d4, #3b82f6)'; // Cyan
        glow = 'rgba(6, 182, 212, 0.9)'; // Stronger glow for selected
    } else if (state === 'correct') {
        gradient = 'linear-gradient(to right, #10b981, #34d399)'; // Green
        glow = 'rgba(16, 185, 129, 0.6)';
    } else if (state === 'incorrect') {
        gradient = 'linear-gradient(to right, #ef4444, #f43f5e)'; // Red
        glow = 'rgba(239, 68, 68, 0.6)';
    } else if (disabled) {
        gradient = 'linear-gradient(to right, #374151, #4b5563)'; // Gray
        glow = 'transparent';
    }

    return (
        <StyledButtonBase onClick={onClick} disabled={disabled}>
            <HexagonBox
                sx={{
                    width: '100%',
                    height: '100%',
                    background: gradient,
                    padding: state === 'selected' ? '4px' : '2px', // Thicker border for selected
                    boxShadow: `0 0 20px ${glow}`,
                    opacity: disabled && state === 'default' ? 0.5 : 1,
                    filter: disabled && state === 'default' ? 'grayscale(100%)' : 'none',
                    transform: state === 'selected' ? 'scale(1.02)' : 'scale(1)',
                }}
            >
                <div className="content" style={{ display: 'flex', alignItems: 'center', padding: '0 2rem' }}>
                    <Typography variant="h5" sx={{ fontWeight: 900, color: state === 'selected' ? '#fff' : 'rgba(255,255,255,0.3)', mr: 2, minWidth: '30px' }}>
                        {state === 'selected' ? '●' : label}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700, color: '#fff', textAlign: 'left', width: '100%' }}>
                        {text}
                    </Typography>
                </div>
            </HexagonBox>
        </StyledButtonBase>
    );
};

export default AnswerOption;
