import { Box, Typography } from '@mui/material';
import NeonCard from '../atoms/NeonCard';

/**
 * SubjectCard Molecule
 * Displays a subject option in the main menu with an icon and title.
 * Handles hover effects and selection.
 */
const SubjectCard = ({ icon: Icon, title, onClick, color = '#8b5cf6' }) => {
    return (
        <NeonCard
            onClick={onClick}
            glowColor={color}
            sx={{
                width: 280,
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                textAlign: 'center',
                background: 'rgba(31, 41, 55, 0.8)',
            }}
        >
            <Box
                sx={{
                    mb: 2,
                    p: 2,
                    borderRadius: '50%',
                    bgcolor: `${color}20`, // 20% opacity
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background-color 0.3s',
                    '.MuiCard-root:hover &': {
                        bgcolor: `${color}40`,
                    }
                }}
            >
                <Icon sx={{ fontSize: 64, color: color, filter: `drop-shadow(0 0 10px ${color}80)` }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary', textTransform: 'uppercase', letterSpacing: 1 }}>
                {title}
            </Typography>
        </NeonCard>
    );
};

export default SubjectCard;
