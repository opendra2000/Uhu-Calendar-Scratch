//I have included all the utility functions and variables are included here
import moment from "moment";

/**
 * Generate all days in a week
 * @param {moment} currentDate - Any date in the week
 * @returns {array} days - All days in the week with date, dateStamp and weekDayName
 */
export const getAllDaysInTheWeek = (currentDate = moment()) => {
  const weekStart = currentDate.clone().startOf("week");

  const days = Array.from(Array(7))
    .map((day, index) => index)
    .map((day) =>
      moment(weekStart).add(day, "days").set("minutes", 0).set("seconds", 0)
    )
    .map((momentObj) => ({
      date: momentObj.date(),
      dateStamp: +momentObj,
      weekDayName: momentObj.format("ddd")
    }));

  return days;
};

// All the uhu hours in the day that goes from 1 to 23
export const times = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23
];

/**
 * Generated coordinated for the highlight
 * @param {Object} event - Event object
 * {
 *  start: Time stamp for the start of the event :timeStamp,
 *  title: Title fo the new event :String,
 *  end: Time stamp for the end of the event :timeStamp,
 * }
 * @param {timeStamp} startDate - Timestamp of any date in the current week
 * @returns {Object} coordinates - Coordinates object with
 * {
 *  top - CSS top of the element,
 *  left - CSS left of the element,
 *  width - CSS width of the element,
 *  height - CSS height of the element
 * }
 */

export const generateWeekViewCoordinates = (event, startDate) => {
  const start = moment(event.start);
  const end = moment(event.end);
  const start_day = moment(event.start).format("dd");
  const end_day = moment(event.end).format("dd");
  const duration = moment.duration(end.diff(start));
  const weekStart = moment(startDate);
  // Calculating Top
  let top = (start.minutes() / 60) * 100;

  //calculating the height of each event highlight in calendar
  const timeFactor = duration.hours() + duration.minutes() / 60;
  let height;
  if (start_day === end_day) {
    height = timeFactor * 100;
  } else {
  }

  let left, width;
  //left css of the event calculation
  if (weekStart.week() === start.week()) {
    const weekDay = start.weekday();
    left = (weekDay + 1) * 12.5;
  }

  //calculating width of each new event created when the week is same for start and end day
  if (weekStart.week() === start.week() && weekStart.week() === end.week()) {
    const daysDiff = duration.days(); // the width of event on basis of days
    width = (daysDiff + 1) * 12.5 - 2;
  }

  if (weekStart.week() > start.week() && weekStart.week() === end.week()) {
    const daysDiff = moment
      .duration(
        end.diff(
          weekStart
            .startOf("week")
            .set("hours", start.hours())
            .set("minutes", start.minutes())
        )
      )
      .days();
    width = (daysDiff + 1) * 12.5 - 2;
  }

  if (weekStart.week() > start.week()) {
    left = 12.5;
  }

  if (weekStart.week() < end.week()) {
    width = 100 - left;
  }

  return {
    top: top + "%",
    left: left + "%",
    height: height + "%",
    width: width + "%"
  };
};

// Checks if the dateStamp represents todays date

export const isTodaysDate = (dateStamp) => {
  const today = moment();
  dateStamp = moment(dateStamp);
  return (
    moment.duration(dateStamp.diff(today)).days() === 0 &&
    today.day() === dateStamp.day()
  );
};
