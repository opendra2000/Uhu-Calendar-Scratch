import React, { Component } from "react";
import moment from "moment";
import AddEventModal from "./AddEventModal";
import { generateWeekViewCoordinates } from "../../utils";
import { eventHighlighter } from "../styles";

// highlight for the new event created, further explained below
class EventHighlighter extends Component {
  state = {
    showEditEventModal: false,
    eventNewStart: null,
    eventNewEnd: null
  };

  //deletes the event from eventlist
  deleteEvent = () => {
    this.props.onEventDelete(this.props.event.id);
    this.setState({
      showEditEventModal: false
    });
  };

  //updates the event where title is the new updated title
  updateEvent = (title) => {
    this.props.onEventUpdate(this.props.event.id, {
      title,
      start: this.state.eventNewStart,
      end: this.state.eventNewEnd
    });
    this.setState({
      showEditEventModal: false
    });
  };

  //open the edit event modal and initialized the start and end time
  openEditEventModal = () => {
    console.log(this.props.event.title);
    this.setState({
      showEditEventModal: true,
      eventNewStart: this.props.event.start,
      eventNewEnd: this.props.event.end
    });
  };

  //set the udpated start and end times the state of the event being edited
  onCurrentEventTimeChange = (dates) => {
    console.log("called");
    this.setState({
      eventNewStart: +dates[0],
      eventNewEnd: +dates[1]
    });
  };

  //to close the addevent modal
  closeModal = () => {
    this.setState({
      showEditEventModal: false
    });
  };

  render() {
    const { showEditEventModal, eventNewStart, eventNewEnd } = this.state;
    return (
      <React.Fragment>
        <AddEventModal
          editMode={true}
          eventTitle={this.props.event.title}
          visible={showEditEventModal}
          onCancel={this.deleteEvent}
          onClose={this.closeModal}
          onOk={this.updateEvent}
          eventStart={eventNewStart}
          eventEnd={eventNewEnd}
          onTimeChange={this.onCurrentEventTimeChange}
        />
        <div
          onClick={this.openEditEventModal}
          style={{
            ...generateWeekViewCoordinates(
              this.props.event,
              this.props.startDate
            ),
            ...eventHighlighter
          }}
        >
          {this.props.event.title} <br />
          <span style={{ fontSize: 10 }}>
            {moment(this.props.event.start).format("hh:mm a")} -{" "}
            {moment(this.props.event.end).format("hh:mm a")}
          </span>
        </div>
      </React.Fragment>
    );
  }
}

export default EventHighlighter;
