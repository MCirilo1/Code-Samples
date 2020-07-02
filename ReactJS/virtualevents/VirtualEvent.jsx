import React from "react";
import * as virtualEventService from "../../services/virtualEventService";
import Swal from "sweetalert";
import { Row, Col } from "reactstrap";
import propTypes from "prop-types";
import VirtualEventCard from "./VirtualEventCard";
import Pagination from "rc-pagination/lib/Pagination";
import localeInfo from "rc-pagination/lib/locale/en_US";
import "rc-pagination/assets/index.css";

class VirtualEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      listOfEvents: [],
      pagination: {
        totalCount: 0,
        currentPage: 1,
        pageIndex: 0,
        pageSize: 6,
      },
    };
  }

  componentDidMount = () => {
    const pageIndex = this.state.pagination.pageIndex;
    const pageSize = this.state.pagination.pageSize;
    this.getAllEvents(pageIndex, pageSize);
  };

  getAllEvents = (pageIndex, pageSize) => {
    virtualEventService
      .getAll(pageIndex, pageSize)
      .then(this.renderEvents)
      .catch(this.onGetEventsError);
  };

  renderEvents = (eventsPaged) => {
    const events = eventsPaged.item.pagedItems;
    const listOfEvents = events.map(this.mapEvents);

    const pagination = {
      totalCount: eventsPaged.totalCount,
      pageIndex: eventsPaged.pageIndex,
      currentPage: eventsPaged.pageIndex + 1,
      pageSize: this.state.pagination.pageSize,
    };

    this.setState((prevState) => {
      return {
        ...prevState,
        listOfEvents,
        events,
        pagination,
      };
    });
  };

  setEvents = (listOfEvents) => {
    this.setState((prevState) => ({ ...prevState, listOfEvents }));
  };

  mapEvents = (virtualEvent) => {
    return (
      <VirtualEventCard
        {...this.props}
        key={virtualEvent.id}
        virtualEvent={virtualEvent}
        onActivateEventRequest={this.onActivateEventRequest}
      ></VirtualEventCard>
    );
  };

  onActivateEventRequest = (id) => {
    this.setState((prevState) => {
      let virtualEvents = [...prevState.events];
      let index = virtualEvents.findIndex(
        (virtualEvent) => virtualEvent.id === id
      );
      if (virtualEvents[index].eventStatusId === 1) {
        virtualEvents[index].eventStatusId = 2;
        virtualEvents[index].status = "Canceled";
        virtualEventService.activateVirtualEvent(id, 2);
      } else {
        virtualEvents[index].eventStatusId = 1;
        virtualEvents[index].status = "Active";
        virtualEventService.activateVirtualEvent(id, 1);
      }
      return {
        ...prevState,
        virtualEvents,
        listOfEvents: virtualEvents.map(this.mapEvents),
      };
    });
  };

  onGetCurrentUserSuccess = (response) => {
    const currentUser = response.item;

    this.setState((prevState) => ({ ...prevState, currentUser }));
  };

  onGetCurrentUserError = () => {
    Swal({
      icon: "error",
      title: "Ooops...",
      text: "Something went wrong!",
      footer: "<a href>What went wrong?</a>",
    });
  };

  onGetEventsError = () => {
    Swal({
      icon: "error",
      title: "Ooops...",
      text: "Something went wrong!",
      footer: "<a href>What went wrong?</a>",
    });
  };

  onPaginationChange = (page) => {
    let pageIndex = page - 1;
    let pageSize = this.state.pagination.pageSize;

    this.setState(
      (prevState) => {
        return {
          ...prevState,
          pagination: {
            ...prevState.pagination,
            currentPage: page,
            pageIndex: page - 1,
          },
        };
      },
      () => {
        pageIndex = this.state.pagination.pageIndex;
        pageSize = this.state.pagination.pageSize;
        this.getAllEvents(pageIndex, pageSize);
      }
    );
  };

  render() {
    return (
      <>
        <Row>
          <Col className="justify-content-center">
            <h2>Virtual Events</h2>
          </Col>
        </Row>

        <Row>{this.state.listOfEvents}</Row>

        <Row className="justify-content-center">
          <Pagination
            total={this.state.pagination.totalCount}
            current={this.state.pagination.currentPage}
            pageSize={this.state.pagination.pageSize}
            pageIndex={this.state.pagination.pageIndex}
            onChange={this.onPaginationChange}
            locale={localeInfo}
          ></Pagination>
        </Row>
      </>
    );
  }
}

VirtualEvent.propTypes = {
  virtualEvent: propTypes.shape({
    id: propTypes.number,
    name: propTypes.string,
    summary: propTypes.string.isRequired,
    externalSiteUrl: propTypes.string,
    description: propTypes.string.isRequired,
    dateStart: propTypes.isRequired,
    dateEnd: propTypes.isRequired,
    imageUrl: propTypes.isRequired,
    statusId: propTypes.number,
  }),
};

export default VirtualEvent;
