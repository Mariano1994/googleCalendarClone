import { useMemo, useState } from "react";
import {
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isBefore,
  endOfDay,
  isToday,
  addMonths,
  subMonths,
} from "date-fns";
import "../styles.css";
import { formatDate } from "../utils/formatDate";
import { cc } from "../utils/cc";

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

  function handleMovetoCurrentDate() {
    setSelectedMonth(new Date());
  }
  function handleMovetoPreviousMonth() {
    setSelectedMonth((m) => subMonths(m, 1));
  }
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

type CalendarDayProps = {
  day: Date;
  showWeekName: boolean;
  selectedMonth: Date;
};
const CalendarDay = ({
  day,
  selectedMonth,
  showWeekName,
}: CalendarDayProps) => {
  return (
    <>
      <div
        className={cc(
          "day",
          !isSameMonth(day, selectedMonth) && "non-month-day",
          isBefore(endOfDay(day), new Date()) && "old-month-day"
        )}
      >
        <div className="day-header">
          {showWeekName && (
            <div className="week-name">
              {formatDate(day, { weekday: "short" })}
            </div>
          )}
          <div className={cc("day-number", isToday(day) && "today")}>
            {formatDate(day, { day: "numeric" })}
          </div>
          <button className="add-event-btn">+</button>
        </div>
        {/* <div className="events">
          <button className="all-day-event blue event">
            <div className="event-name">Short</div>
          </button>
          <button className="all-day-event green event">
            <div className="event-name">
              Long Event Name That Just Keeps Going
            </div>
          </button>
          <button className="event">
            <div className="color-dot blue"></div>
            <div className="event-time">7am</div>
            <div className="event-name">Event Name</div>
          </button>
        </div> */}
      </div>
    </>
  );
};
