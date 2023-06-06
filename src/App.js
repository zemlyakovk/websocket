import { Route, Routes } from 'react-router-dom';
import { FirstPage } from './Components/FirstPage/FirstPage.tsx';
import { SecondPage } from './Components/SecondPage/SecondPage.tsx';
import React from 'react';
import './App.css';

export const App = () => <div className="App">
<Routes>
    <Route exact path="/" element={<FirstPage />} />
    <Route exact path="/second" element={<SecondPage />} />
</Routes>
</div>;