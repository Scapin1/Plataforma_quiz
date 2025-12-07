import { createTheme } from '@mui/material/styles';

/**
 * Custom MUI Theme for "Game UI" Aesthetic
 * Features: Dark mode, Neon colors, Gradients, Rounded shapes
 */
const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#3b82f6', // Blue 500
            light: '#60a5fa',
            dark: '#2563eb',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#8b5cf6', // Violet 500
            light: '#a78bfa',
            dark: '#7c3aed',
            contrastText: '#ffffff',
        },
        background: {
            default: '#111827', // Gray 900
            paper: '#1f2937',   // Gray 800
        },
        text: {
            primary: '#f3f4f6', // Gray 100
            secondary: '#9ca3af', // Gray 400
        },
        success: {
            main: '#10b981', // Emerald 500
        },
        error: {
            main: '#ef4444', // Red 500
        },
        info: {
            main: '#06b6d4', // Cyan 500
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 800,
            letterSpacing: '-0.025em',
        },
        h2: {
            fontWeight: 700,
            letterSpacing: '-0.025em',
        },
        button: {
            fontWeight: 600,
            textTransform: 'none', // Disable uppercase for cleaner look
        },
    },
    shape: {
        borderRadius: 16, // More rounded corners for modern feel
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    padding: '10px 24px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    },
                },
                containedPrimary: {
                    background: 'linear-gradient(to right, #2563eb, #4f46e5)', // Blue to Indigo
                    '&:hover': {
                        background: 'linear-gradient(to right, #1d4ed8, #4338ca)',
                    },
                },
                containedSecondary: {
                    background: 'linear-gradient(to right, #7c3aed, #db2777)', // Violet to Pink
                    '&:hover': {
                        background: 'linear-gradient(to right, #6d28d9, #be185d)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    background: 'rgba(31, 41, 55, 0.7)', // Translucent Gray 800
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(75, 85, 99, 0.4)', // Gray 600
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                },
            },
        },
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    height: 10,
                    backgroundColor: 'rgba(55, 65, 81, 0.5)', // Gray 700
                },
                bar: {
                    borderRadius: 8,
                    background: 'linear-gradient(90deg, #06b6d4, #3b82f6)', // Cyan to Blue
                },
            },
        },
    },
});

export default theme;
