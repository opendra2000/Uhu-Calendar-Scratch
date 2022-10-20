import { Modal, Button } from "antd";
import React, { Component } from "react";
import AddEvent from "./AddEvent";

//pop up modal for adding new events
class AddEventModal extends Component {
  state = {
    title: ""
  };

  /**
   * To show the title auto fill and
   * re-initialize the title on adding new event
   */
  static getDerivedStateFromProps(nextProps) {
    if (nextProps.eventTitle) {
      return {
        title: nextProps.eventTitle
      };
    } else {
      return {
        title: ""
      };
    }
  }

  //sets the title in the state
  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value
    });
  };

  //updates the event
  handleOk = () => {
    this.props.onOk(this.state.title);
  };

  render() {
    const { title } = this.state;
    return (
      <Modal
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={this.props.onClose}
        //the footer will have the button options according to the need
        //for the new event: we will have Cance and Add Event, while for the already existing one
        //we will have Delete and Update Event
        footer={[
          <Button key="back" onClick={this.props.onCancel}>
            {this.props.editMode ? "Delete" : "Cancel"}
          </Button>,
          <Button key="submit" type="primary" onClick={this.handleOk}>
            {this.props.editMode ? "Update Event" : "Add Event"}
          </Button>
        ]}
      >
        <AddEvent
          title={title}
          onTitleChange={this.handleTitleChange}
          start={this.props.eventStart}
          end={this.props.eventEnd}
          onTimeChange={this.props.onTimeChange}
        />
      </Modal>
    );
  }
}

export default AddEventModal;
