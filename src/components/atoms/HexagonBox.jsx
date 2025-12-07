import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * HexagonBox Component
 * A container with a specific hexagonal clip-path.
 * Used for Question display and Answer options to match the "Game UI" design.
 */
const HexagonBox = styled(Box)(({ theme }) => ({
    position: 'relative',
    clipPath: 'polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)',
    backgroundColor: theme.palette.background.paper,
    padding: '2px', // Acts as border width
    transition: 'transform 0.2s ease-in-out',

    // The inner content wrapper
    '& > .content': {
        clipPath: 'polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)',
        backgroundColor: 'rgba(17, 24, 39, 0.9)', // Darker inner background
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

export default HexagonBox;
