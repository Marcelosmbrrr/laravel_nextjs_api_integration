import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export function ProvidedDataSelection(props) {

    const [options, setOptions] = React.useState(props.options);
    const [selected, setSelected] = React.useState(props.selected);

    function handleChange(event) {
        setSelected(event.target.value);
        props.setForm((prev) => {
            return {
                ...prev,
                [props.name]: event.target.value
            }
        });
    }

    return (
        <FormControl fullWidth>
            <InputLabel>{props.label}</InputLabel>
            <Select
                name={props.name}
                value={selected}
                label={props.label}
                onChange={handleChange}
            >
                <MenuItem value={"0"}>Choose</MenuItem>
                {options.length > 0 &&
                    options.map((item, index) =>
                        <MenuItem value={item[props.key_value]} key={item[props.key_value]}>{item[props.key_name]}</MenuItem>
                    )
                }
            </Select>
        </FormControl>
    )


}