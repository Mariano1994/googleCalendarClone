import { useMemo, useState } from "react";
import {
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
} from "date-fns";
import "../styles.css";
import { formatDate } from "../utils/formatDate";
import { CalendarDay } from "./CalendarDay";

const Calendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const calendarDays = useMemo(() => {
    const firstWeekStart = startOfWeek(startOfMonth(selectedMonth));
    const lastWeekDay = endOfWeek(endOfMonth(selectedMonth));
    return eachDayOfInterval({
      start: firstWeekStart,
      end: lastWeekDay,
    });
  }, [selectedMonth]);

  // Function to Move to current Date
  function handleMovetoCurrentDate() {
    setSelectedMonth(new Date());
  }

  //Functon to move to Previous Month
  function handleMovetoPreviousMonth() {
    setSelectedMonth((m) => subMonths(m, 1));
  }

  // Function to move to next Month
  function handleMoveToNextMonth() {
    setSelectedMonth((m) => addMonths(m, 1));
  }

  return (
    <>
      <div className="calendar">
        <div className="header">
          <button className="btn" onClick={handleMovetoCurrentDate}>
            Today
          </button>
          <div>
            <button
              className="month-change-btn"
              onClick={handleMovetoPreviousMonth}
            >
              &lt;
            </button>
            <button
              className="month-change-btn"
              onClick={handleMoveToNextMonth}
            >
              &gt;
            </button>
          </div>
          <span className="month-title">
            {formatDate(selectedMonth, { month: "long", year: "numeric" })}
          </span>
        </div>

        <div className="days">
          {calendarDays.map((day, index) => (
            <CalendarDay
              key={day.getTime()}
              day={day}
              showWeekName={index < 7}
              selectedMonth={selectedMonth}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Calendar;
