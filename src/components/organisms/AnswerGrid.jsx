import { Box } from '@mui/material';
import AnswerOption from '../molecules/AnswerOption';

/**
 * AnswerGrid Organism
 * Displays a grid of AnswerOption components.
 * Implements the responsive 2x2 layout (1 column on mobile, 2 on desktop).
 */
const AnswerGrid = ({ options, selectedOption, showExplanation, correctOption, onSelect }) => {
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, // 1 col mobile, 2 col desktop
                gap: 3,
                width: '100%',
                maxWidth: 'lg',
                px: 2,
            }}
        >
            {options.map((opt) => {
                let state = 'default';
                if (showExplanation) {
                    if (opt.key === correctOption) state = 'correct';
                    else if (opt.key === selectedOption) state = 'incorrect';
                } else if (selectedOption === opt.key) {
                    state = 'selected';
                }

                return (
                    <AnswerOption
                        key={opt.key}
                        label={opt.key.toUpperCase() + ':'}
                        text={opt.value}
                        state={state}
                        onClick={() => onSelect(opt.key)}
                        disabled={showExplanation}
                    />
                );
            })}
        </Box>
    );
};

export default AnswerGrid;
