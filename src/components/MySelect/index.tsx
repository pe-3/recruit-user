import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { $inputGroup } from '../../styles';

type Item = {
    value: any,
    label: string | React.ReactNode,
    disabled?: boolean
}
export default function BasicSelect(props:
    {
        items: Item[],
        label: string,
        onChange: (event: SelectChangeEvent) => void,
        value?: any,
        disbaled?: boolean
    }
) {

    return (
        <Box style={$inputGroup} sx={{ margin: '0 auto' }}>
            <FormControl fullWidth>
                <InputLabel >{props.label}</InputLabel>
                <Select
                    disabled={props.disbaled}
                    labelId="demo-simple-select-label"
                    value={props.value}
                    label={props.label}
                    onChange={props.onChange}
                >
                    {props.items.map((item: Item, i: any) =>
                        <MenuItem key={i} value={item.value} disabled={item.disabled}>{item.label}</MenuItem>
                    )}
                </Select>
            </FormControl>
        </Box>
    );
}
