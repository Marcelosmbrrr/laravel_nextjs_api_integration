import * as React from 'react';
import { parseCookies } from 'nookies';
import { env } from '@/next.config';
import { axios } from '../../services/api';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export function LoadedDataSelection(props) {

    const [options, setOptions] = React.useState([]);
    const [selected, setSelected] = React.useState(props.selected);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {

        const cookies = parseCookies();

        if (!cookies["XSRF-TOKEN"]) {
            throw new Error("Session Token expired!");
        }

        if (!cookies["next.auth"]) {
            throw new Error("Authentication Token expired!");
        }

        const headers = {
            'X-CSRF-Token': cookies["XSRF-TOKEN"],
            'Authorization': `Bearer ${cookies["next.auth"]}`
        };

        axios.get(props.fetch_from, headers)
            .then((response) => {
                setOptions(response.data.roles);
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setLoading(false);
            });

    }, []);

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
            <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
            <Select
                name={props.name}
                value={selected}
                label={props.label}
                onChange={handleChange}
            >
                <MenuItem value={"0"}>Choose</MenuItem>
                {!loading && options.length > 0 &&
                    options.map((item, index) => 
                        <MenuItem value={item[props.key_value]} key={item[props.key_value]}>{item[props.key_name]}</MenuItem>
                    )
                }
            </Select>
        </FormControl>
    )


}