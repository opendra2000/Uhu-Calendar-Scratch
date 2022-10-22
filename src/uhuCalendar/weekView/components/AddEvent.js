import React from "react";
import { Input, DatePicker } from "antd";
import moment from "moment";
import { inputStyles } from "../styles";

const { RangePicker } = DatePicker;

//for adding new events
function AddEvent(props) {
  return (
    <React.Fragment>
      <h2>New UHU Event</h2>
      <Input
        type="text"
        placeholder="Add Title"
        value={props.title}
        style={inputStyles}
        size="large"
        autoFocus={true}
        onChange={props.onTitleChange}
      />
      <RangePicker
        style={{ width: "100%" }}
        value={[moment(props.start), moment(props.end)]}
        onChange={props.onTimeChange}
        showTime={{
          format: "HH:mm",
          hourStep: 1,
          minuteStep: 5,
          defaultValue: [moment(props.start), moment(props.end)]
        }}
        format="MMM Do, YYYY hh:mm a"
      />
    </React.Fragment>
  );
}

export default AddEvent;
