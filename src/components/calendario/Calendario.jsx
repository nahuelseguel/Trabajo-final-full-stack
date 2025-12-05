import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CAlendario.css'

const Calendario = ({ onDateSelect }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id: profesionalId } = location.state;
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

 const handleSelect = (date) => {
    onDateSelect(date);
    navigate("/horarios", { state: { profesionalId } });
  };


  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`e-${i}`} className="calendar-empty-day"></div>);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      const isPast = date < today;

      days.push(
        <div
          key={d}
          onClick={() => !isPast && handleSelect(date)}
          className={`calendar-day ${isPast ? "calendar-day-past" : "calendar-day-available"}`}
        >
          {d}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}>
          &lt;
        </button>

        <h3>
          {currentDate.toLocaleDateString("es-ES", { month: "long", year: "numeric" })}
        </h3>

        <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}>
          &gt;
        </button>
      </div>

      <div className="calendar-days">{renderDays()}</div>
    </div>
  );
};

export default Calendario;