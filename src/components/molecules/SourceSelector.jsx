import { useState, useMemo } from 'react';
import {
    Box,
    Typography,
    FormControl,
    FormControlLabel,
    Checkbox,
    List,
    ListItem,
    ListItemText,
    TextField,
    Button,
    Chip,
    InputAdornment
} from '@mui/material';
import { Search, CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';

/**
 * SourceSelector Molecule
 * A searchable, scrollable list for selecting question sources.
 */
const SourceSelector = ({ sources, selectedSources, onSourceChange }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Filter sources based on search term
    const filteredSources = useMemo(() => {
        if (!searchTerm) return sources;
        return sources.filter(s =>
            s.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [sources, searchTerm]);

    const handleToggle = (source) => {
        const currentIndex = selectedSources.indexOf(source);
        const newChecked = [...selectedSources];

        if (currentIndex === -1) {
            newChecked.push(source);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        onSourceChange(newChecked);
    };

    const handleSelectAll = () => {
        if (selectedSources.length === sources.length) {
            onSourceChange([]);
        } else {
            onSourceChange([...sources]);
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">
                    FUENTES ({selectedSources.length}/{sources.length})
                </Typography>
                <Button
                    size="small"
                    onClick={handleSelectAll}
                    sx={{ textTransform: 'none', fontSize: '0.75rem' }}
                >
                    {selectedSources.length === sources.length ? 'Deseleccionar todo' : 'Seleccionar todo'}
                </Button>
            </Box>

            <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                {/* Search Bar */}
                <Box sx={{ p: 1, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <TextField
                        fullWidth
                        variant="standard"
                        placeholder="Buscar fuente..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            disableUnderline: true,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search sx={{ color: 'text.disabled', fontSize: 20 }} />
                                </InputAdornment>
                            ),
                            sx: { fontSize: '0.9rem' }
                        }}
                    />
                </Box>

                {/* Scrollable List */}
                <List sx={{ width: '100%', maxHeight: 200, overflow: 'auto', p: 0, '&::-webkit-scrollbar': { width: '6px' }, '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(255,255,255,0.1)', borderRadius: '3px' } }}>
                    {filteredSources.length > 0 ? (
                        filteredSources.map((source) => {
                            const labelId = `checkbox-list-label-${source}`;
                            const isSelected = selectedSources.indexOf(source) !== -1;

                            return (
                                <ListItem
                                    key={source}
                                    dense
                                    button
                                    onClick={() => handleToggle(source)}
                                    sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }}
                                >
                                    <Checkbox
                                        edge="start"
                                        checked={isSelected}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                        size="small"
                                        icon={<RadioButtonUnchecked fontSize="small" sx={{ opacity: 0.5 }} />}
                                        checkedIcon={<CheckCircle fontSize="small" />}
                                    />
                                    <ListItemText
                                        id={labelId}
                                        primary={source}
                                        primaryTypographyProps={{
                                            variant: 'body2',
                                            color: isSelected ? 'text.primary' : 'text.secondary',
                                            style: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }
                                        }}
                                    />
                                </ListItem>
                            );
                        })
                    ) : (
                        <Box sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="caption" color="text.disabled">
                                No se encontraron fuentes
                            </Typography>
                        </Box>
                    )}
                </List>
            </Box>

            {/* Selected Chips Preview (Optional, limit to 5) */}
            {selectedSources.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                    {selectedSources.slice(0, 5).map((source) => (
                        <Chip key={source} label={source} size="small" variant="outlined" sx={{ borderColor: 'rgba(255,255,255,0.1)', fontSize: '0.7rem', height: 20 }} />
                    ))}
                    {selectedSources.length > 5 && (
                        <Chip label={`+${selectedSources.length - 5}`} size="small" variant="outlined" sx={{ borderColor: 'rgba(255,255,255,0.1)', fontSize: '0.7rem', height: 20 }} />
                    )}
                </Box>
            )}
        </Box>
    );
};

export default SourceSelector;
