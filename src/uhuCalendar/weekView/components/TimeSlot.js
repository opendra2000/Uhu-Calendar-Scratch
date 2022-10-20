import React from "react";
import { Col } from "antd";
import { col, slot, lightHighlighter } from "../styles";
import { isTodaysDate } from "../../utils";

// time slot in the calendar
function TimeSlot(props) {
  return (
    <Col
      key={props.dateStamp}
      style={
        isTodaysDate(props.dateStamp)
          ? { ...col, ...slot, ...lightHighlighter }
          : { ...col, ...slot }
      }
      span={3}
      // onclick of each cell in calendar, addevent modal will be triggered
      onClick={() => props.openAddEventModal(props.dateStamp, props.time)}
    />
  );
}

export default TimeSlot;
