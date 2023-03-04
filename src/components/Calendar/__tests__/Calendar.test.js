import { render } from "@testing-library/react";
import moment from "moment";
import Calendar from "../Calendar";

describe("Calendar component", () => {
  test("renders without crashing", () => {
    render(<Calendar date="01/01/2022" />);
  });

  test("displays the correct month and year in the header", () => {
    const date = "01/01/2022";
    const formattedDate = moment(date, "DD/MM/YYYY").format("MMMM YYYY");
    const { getByText } = render(<Calendar date={date} />);
    expect(getByText(formattedDate)).toBeInTheDocument();
  });

  test("displays the weekdays correctly", () => {
    const weekdaysShort = moment.weekdaysShort();
    const { getByText } = render(<Calendar date="01/01/2022" />);
    weekdaysShort.forEach((weekday) => {
      expect(getByText(weekday)).toBeInTheDocument();
    });
  });

  test("displays the days of the month correctly", () => {
    const date = "01/01/2022";
    const daysInMonth = moment(date, "DD/MM/YYYY").daysInMonth();
    const { getAllByTestId } = render(<Calendar date={date} />);
    const dateCells = getAllByTestId("date-cell");
    expect(dateCells).toHaveLength(daysInMonth);
    for (let i = 0; i < daysInMonth; i++) {
      expect(dateCells[i]).toHaveTextContent(`${i + 1}`);
    }
  });

  test("highlights the current date", () => {
    const date = "01/01/2022";
    const { getAllByTestId } = render(<Calendar date={date} />);
    const currentDateCell = getAllByTestId("date-cell")[0];
    expect(currentDateCell).toHaveClass("bg-gray-500", "text-white");
  });
});
