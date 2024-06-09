import React, { useState } from 'react';
import './Calculator.css';
import { FaPlus, FaCalculator, FaSun, FaMoon } from 'react-icons/fa';

const gradePoints = {
  'A': 4.00,
  'A-': 3.67,
  'B+': 3.33,
  'B': 3.00,
  'B-': 2.67,
  'C+': 2.33,
  'C': 2.00,
  'C-': 1.67,
  'D+': 1.33,
  'D': 1.00,
  'F': 0.00,
  'FX': 0.00,
};

function Calculator() {
  const [classes, setClasses] = useState([{ name: '', grade: '', credit: '' }]);
  const [gpa, setGpa] = useState(null);
  const [error, setError] = useState('');
  const [darkTheme, setDarkTheme] = useState(false);

  const handleInputChange = (index, event) => {
    const values = [...classes];
    values[index][event.target.name] = event.target.value;
    setClasses(values);
  };

  const handleAddClass = () => {
    setClasses([...classes, { name: '', grade: '', credit: '' }]);
  };

  const handleCalculateGpa = () => {
    let totalCredits = 0;
    let totalPoints = 0;
    let valid = true;

    classes.forEach((cls) => {
      const grade = gradePoints[cls.grade];
      const credit = parseFloat(cls.credit);
      if (!cls.name || !cls.grade || isNaN(credit)) {
        valid = false;
      }
      if (grade !== undefined && !isNaN(credit)) {
        totalCredits += credit;
        totalPoints += grade * credit;
      }
    });

    if (!valid) {
      setError('Please fill in all required fields.');
      setGpa(null);
      return;
    }

    setError('');
    const gpa = totalPoints / totalCredits;
    setGpa(gpa.toFixed(2));
  };

  const getGpaColor = (gpa) => {
    if (gpa >= 3.5) return '#4CAF50'; // Green
    if (gpa >= 3.0) return '#8BC34A'; // Light Green
    if (gpa >= 2.5) return '#FFEB3B'; // Yellow
    if (gpa >= 2.0) return '#FF9800'; // Orange
    return '#F44336'; // Red
  };

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <div className={`App ${darkTheme ? 'dark' : ''}`}>
      <header className="App-header">
        <h1>GPA Calculator</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          {darkTheme ? <FaSun /> : <FaMoon />}
        </button>
      </header>
      {classes.map((cls, index) => (
        <div key={index} className="class-inputs">
          <input
            type="text"
            name="name"
            placeholder="Class Name"
            value={cls.name}
            onChange={(event) => handleInputChange(index, event)}
          />
          <select
            name="grade"
            value={cls.grade}
            onChange={(event) => handleInputChange(index, event)}
          >
            <option value="">Select Grade</option>
            {Object.keys(gradePoints).map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="credit"
            placeholder="Credit"
            value={cls.credit}
            onChange={(event) => handleInputChange(index, event)}
          />
        </div>
      ))}
      <div className="button-container">
        <button className="add-button" onClick={handleAddClass}>
          <FaPlus /> Add Class
        </button>
        <button className="calculate-button" onClick={handleCalculateGpa}>
          <FaCalculator /> Calculate GPA
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      {gpa !== null && (
        <div className="gpa-display" style={{ backgroundColor: getGpaColor(gpa) }}>
          <h2>{gpa}</h2>
        </div>
      )}
    </div>
  );
}

export default Calculator;
