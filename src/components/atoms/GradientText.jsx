import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * GradientText Component
 * Displays text with a gradient background, clipped to the text itself.
 * Used for main headings and emphasized text.
 */
const GradientText = styled(Typography)(({ theme, gradient }) => ({
    background: gradient || `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
    fontWeight: 800,
    display: 'inline-block',
}));

export default GradientText;
