// App.js
import "./App.css";
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Calendar from './components/Calendar';
import ColorChange from './components/ColorChange';


const App = () => {
  const [colors, setColors] = useState({}); // id에 대한 색상을 관리하는 상태

  useEffect(() => {

  }, []);

  const handleColorChange = (id, newColor) => {
    setColors({
      ...colors,
      [id]: newColor,
    });
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<Calendar colors={colors} />}
          />
          <Route
            path="/colorchange/:id"
            element={<ColorChange onColorChange={handleColorChange} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
