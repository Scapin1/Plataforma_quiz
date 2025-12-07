import { Card } from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * NeonCard Component
 * A specialized Card component with glassmorphism effect and optional neon glow.
 * Used for containers, question boxes, and result summaries.
 */
const NeonCard = styled(Card)(({ theme, glowColor }) => ({
    background: 'rgba(31, 41, 55, 0.6)', // Semi-transparent dark background
    backdropFilter: 'blur(12px)',         // Glass effect
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    boxShadow: glowColor
        ? `0 0 20px ${glowColor}40, 0 0 10px ${glowColor}20` // Neon glow if color provided
        : theme.shadows[4],
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',

    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: glowColor
            ? `0 0 30px ${glowColor}60, 0 0 15px ${glowColor}30`
            : theme.shadows[10],
    },
}));

export default NeonCard;
