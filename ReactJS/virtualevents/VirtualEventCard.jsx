import React from "react";
import propTypes from "prop-types";
import { Button } from "reactstrap";
import _logger from "sabio-debug";
import Moment from "moment";

function VirtualEventCard(props) {
  const handleSelected = () => {
    _logger(props.virtualEvent);
    props.onActivateEventRequest(props.virtualEvent.id);
  };
  return (
    <div className="col-4 col-md-4 col-lg-4">
      <div className="card">
        <div className="ve-card-body">
          <img
            className="ve-card-img-top w-100 h-100"
            src={props.virtualEvent.imageUrl ? props.virtualEvent.imageUrl : ""}
            alt="ve-Card cap"
          />
          <h5>{props.virtualEvent.name}</h5>
          <h5>{props.virtualEvent.summary}</h5>
          <div>
            <a href="/">{props.virtualEvent.externalSiteUrl}</a>
          </div>
          <br />
          <span className="ve-card-start mb-2 text-muted">
            Start: {Moment(props.virtualEvent.dateStart).format("MM/DD/YYY")}{" "}
            {Moment(props.virtualEvent.dateStart).format("HH:mm")}
          </span>
          <br />
          <span className="ve-card-end mb-2 text-muted">
            End: {Moment(props.virtualEvent.dateEnd).format("MM/DD/YYY")}{" "}
            {Moment(props.virtualEvent.dateEnd).format("HH:mm")}
          </span>
        </div>
        <div className="btn">
          <Button
            className="float-right"
            color={
              props.virtualEvent.eventStatusId === 1 ? "success" : "secondary"
            }
            type="button"
            onClick={handleSelected}
          >
            {props.virtualEvent.eventStatusId === 1 ? "Open" : "Cancelled"}
          </Button>
        </div>
      </div>
    </div>
  );
}

VirtualEventCard.propTypes = {
  virtualEvent: propTypes.shape({
    id: propTypes.number,
    name: propTypes.string,
    summary: propTypes.string,
    externalSiteUrl: propTypes.string,
    description: propTypes.string,
    dateStart: propTypes.string,
    dateEnd: propTypes.string,
    imageUrl: propTypes.string,
    eventStatusId: propTypes.number,
  }),
  onActivateEventRequest: propTypes.func,
};

export default VirtualEventCard;
