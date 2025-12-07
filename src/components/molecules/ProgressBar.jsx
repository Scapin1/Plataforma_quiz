import { Box, LinearProgress, Typography } from '@mui/material';

/**
 * ProgressBar Molecule
 * Displays the current progress in the quiz with a label (e.g., "05/10").
 */
const ProgressBar = ({ current, total }) => {
    const progress = ((current) / total) * 100;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 2 }}>
            <Typography variant="h6" color="primary" sx={{ fontFamily: 'monospace', fontWeight: 'bold', mr: 2 }}>
                {String(current).padStart(2, '0')}<span style={{ color: '#4b5563' }}>/</span>{total}
            </Typography>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" value={progress} />
            </Box>
        </Box>
    );
};

export default ProgressBar;
