import moment from "moment";

// event handlings for calendar
const CalendarEventHandler = (function () {
  //add event after adding meta data in the event
  function addEvent(allEvents, newEvent) {
    const time = moment(newEvent.start).hours();
    const eventWithMeatInfo = {
      ...newEvent,
      startWeek: moment(newEvent.start).week(),
      endWeek: moment(newEvent.end).week()
    };
    if (allEvents[time]) {
      allEvents[time].push(eventWithMeatInfo);
    } else {
      allEvents[time] = [eventWithMeatInfo];
    }
    return { ...allEvents };
  }

  /**
   * Generate unique id for an event
   * @param {timeStamp} start - Start timestamp of the event
   * @param {timeStamp} end - End timeStamp of the event
   * @params {string} title - Title of the event
   * @returns {string} id - Unique id
   */

  function generateUniqueId({ start, title, end }) {
    return start + title + end;
  }

  // Deletes event from the list
  function deleteEvent(eventId, allEvents) {
    Object.keys(allEvents).forEach((time) => {
      allEvents[time] = allEvents[time].filter((event) => event.id !== eventId);
    });
    return { ...allEvents };
  }

  // Updates event from the list
  function updateEvent(eventId, updatedEvent, allEvents) {
    Object.keys(allEvents).forEach((time) => {
      allEvents[time] = allEvents[time].map((event) =>
        event.id === eventId ? { ...event, ...updatedEvent } : event
      );
    });
    return { ...allEvents };
  }

  return {
    add: addEvent,
    delete: deleteEvent,
    update: updateEvent,
    generateId: generateUniqueId
  };
})();

export default CalendarEventHandler;
