import { Box, Container } from '@mui/material';

/**
 * CenteredLayout Component
 * Implements the "Antigravity" centering strategy using MUI Box and Flexbox.
 * Ensures content is always centered vertically and horizontally (or right-aligned if configured).
 */
const CenteredLayout = ({ children, align = 'center' }) => {
    return (
        <Box
            sx={{
                width: '100%',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: align === 'right' ? 'flex-end' : 'center', // Support for right alignment
                justifyContent: 'center',
                bgcolor: 'background.default',
                overflowX: 'hidden',
                paddingRight: align === 'right' ? 4 : 0, // Spacing for right alignment
            }}
        >
            <Container
                maxWidth="lg"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: align === 'right' ? 'flex-end' : 'center',
                    flexGrow: 1,
                    justifyContent: 'center',
                }}
            >
                {children}
            </Container>
        </Box>
    );
};

export default CenteredLayout;
