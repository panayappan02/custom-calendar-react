import React, { useState } from "react";
import moment from "moment";

const Calendar = ({ date }) => {
  const [currentDate, setCurrentDate] = useState(moment(date, "DD/MM/YYYY"));

  const firstDayOfMonth = moment(currentDate).startOf("month").format("d");
  const daysInMonth = moment(currentDate).daysInMonth();

  const weekdaysShort = moment.weekdaysShort();

  const monthYearHeader = () => {
    const month = currentDate.format("MMMM");
    const year = currentDate.format("YYYY");
    return (
      <tr className="bg-gray-300 text-gray-700">
        <th colSpan="7" className="py-2 text-lg font-medium">
          {month} {year}
        </th>
      </tr>
    );
  };

  const weekdayHeader = () => {
    return weekdaysShort.map((weekday) => {
      return (
        <th key={weekday} className="py-2 text-sm font-medium text-gray-500">
          {weekday}
        </th>
      );
    });
  };

  const blankCells = () => {
    const blanks = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      blanks.push(<td key={i * 100}></td>);
    }
    return blanks;
  };

  const daysOfMonth = () => {
    const days = [];
    for (let d = 1; d <= daysInMonth; d++) {
      const className =
        d === parseInt(moment(date, "DD/MM/YYYY").format("D"))
          ? "bg-gray-500 text-white"
          : "";
      days.push(
        <td
          key={d}
          className={`py-2 text-sm ${className}`}
          data-testid="date-cell"
        >
          {d}
        </td>
      );
    }
    return days;
  };

  const rowsOfMonth = () => {
    const rows = [];
    let cells = [...blankCells(), ...daysOfMonth()];

    while (cells.length) {
      rows.push(<tr key={rows.length}>{cells.splice(0, 7)}</tr>);
    }

    return rows;
  };

  return (
    <div>
      <table className="w-full text-center border-collapse">
        <thead>
          {monthYearHeader()}
          <tr>{weekdayHeader()}</tr>
        </thead>
        <tbody className="shadow-lg">{rowsOfMonth()}</tbody>
      </table>
    </div>
  );
};

export default Calendar;
