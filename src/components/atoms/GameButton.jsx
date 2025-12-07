import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * GameButton Component
 * A primary action button with a robust, game-like appearance.
 * Supports variants for 'primary', 'secondary', 'success', 'error'.
 */
const GameButton = styled(Button)(({ theme, color = 'primary', size = 'medium' }) => {
    const isLarge = size === 'large';

    return {
        fontWeight: 800,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        padding: isLarge ? '16px 32px' : '10px 24px',
        fontSize: isLarge ? '1.125rem' : '0.875rem',
        borderRadius: 12,
        position: 'relative',
        overflow: 'hidden',

        // Shine effect on hover
        '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            transition: 'left 0.5s',
        },

        '&:hover::after': {
            left: '100%',
        },
    };
});

export default GameButton;
