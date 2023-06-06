import React, { useState, useRef, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { DataTableType } from './types';
import { LOCAL_URL } from '../../constants';
import { useNavigate } from 'react-router-dom';

export const FirstPage = () => {
    const [dataTable, setDataTable] = useState<DataTableType[]>([]);
    const socket = useRef<WebSocket>();
    const navigate = useNavigate();

    useEffect(() => {
        socket.current = new WebSocket(LOCAL_URL);

        socket.current.onopen = function () {
            console.log('WebSocket is connected.');
        };

        socket.current.onmessage = function (event) {
            const message: DataTableType = JSON.parse(event.data);
            setDataTable((prev) => [...prev, message]);
        };

        socket.current.onclose = function (event) {
            if (event.wasClean) {
                alert(`Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
            } else {
                alert('Соединение прервано');
            }
        };
    }, []);
    return (
        <>
            <Button variant='contained' sx={{ mt: 6, mb: 6 }} onClick={() => navigate('/second')}>
                Add row
            </Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            <TableCell align='right'>Perсent</TableCell>
                            <TableCell align='right'>ComboBox</TableCell>
                            <TableCell align='right'>CheckBox</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataTable.map((row, ind) => (
                            <TableRow key={ind} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align='right'>{row.percent}</TableCell>
                                <TableCell align='right'>{row.comboBox}</TableCell>
                                <TableCell align='right'>{row.checkBox ? 'true' : 'false'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};
