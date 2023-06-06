import React, { useState, useRef, useEffect } from 'react';
import { TextField, Button, FormHelperText, Select, MenuItem, InputLabel, Checkbox } from '@mui/material';
import { LOCAL_URL } from '../../constants';
// @ts-ignore
import { validationPercent } from './utils.ts';
import { useNavigate } from 'react-router-dom';

export const SecondPage = () => {
    const [percent, setPercent] = useState('');
    const [comboBox, setComboBox] = useState('');
    const [checkBox, setCheckBox] = useState(false);
    const [percentError, setPercentError] = useState(false);
    const socket = useRef<WebSocket>();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        setPercentError(false);

        if (validationPercent(Number(percent))) {
            setPercentError(true);
        }

        if (!validationPercent(Number(percent))) {
            const dataRow = {
                percent: Number(percent),
                comboBox,
                checkBox,
            };
            setTimeout(() => socket.current?.send(JSON.stringify(dataRow)), 0); // использовал timeout тк иначе после редиректа на первую страницу ответ от сервера приходит быстрее, чем монтирование компонента. Был бы рад обсудить, как нужно было сделать правильно
            navigate('/');
        }
    };

    useEffect(() => {
        socket.current = new WebSocket(LOCAL_URL);

        socket.current.onopen = function () {
            console.log('WebSocket is connected.');
        };

        socket.current.onclose = function (event) {
            if (event.wasClean) {
                console.log(`Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
            } else {
                console.log('Соединение прервано');
            }
        };
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add row</h2>
            <TextField
                label='Percent'
                required
                variant='outlined'
                type='number'
                sx={{ mb: percentError ? 0 : 3 }}
                fullWidth
                value={percent}
                error={percentError}
                onChange={(e) => setPercent(e.target.value)}
            />
            {percentError && (
                <FormHelperText sx={{ mb: 3 }} id='my-helper-text' error={percentError}>
                    Значение должно быть в пределах от 0 до 100
                </FormHelperText>
            )}
            <InputLabel id='select-comboBox'>ComboBox</InputLabel>
            <Select
                labelId='select-comboBox'
                id='select-comboBox'
                value={comboBox}
                autoWidth
                sx={{ mb: 3 }}
                onChange={(e) => setComboBox(e.target.value)}>
                <MenuItem value={'first'}>First</MenuItem>
                <MenuItem value={'second'}>Second</MenuItem>
                <MenuItem value={'third'}>Third</MenuItem>
            </Select>
            <InputLabel id='select-checkBox'>CheckBox</InputLabel>
            <Checkbox
                id='select-checkBox'
                checked={checkBox}
                sx={{ mb: 3, display: 'block' }}
                onChange={(e) => setCheckBox(e.target.checked)}
            />
            <Button variant='outlined' type='submit'>
                Add row
            </Button>
        </form>
    );
};
