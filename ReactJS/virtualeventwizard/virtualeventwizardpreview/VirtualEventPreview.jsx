/* eslint-disable react/boolean-prop-naming */
import React from "react";
import { Card, CardHeader, CardFooter, CardBody, CardImg } from "reactstrap";
import propTypes from "prop-types";

export default function VirtualEventPreview(props) {
  return (
    <Card className="m-3 border text-center">
      <CardHeader className="border">
        <h3>{props.values.eventName}</h3>
      </CardHeader>
      {props.values.eventImage ? (
        <CardImg
          top
          width="100%"
          height="300px"
          className="event-preview-image"
          src={props.values.eventImage}
          alt={props.values.eventName}
        />
      ) : (
        ""
      )}
      <CardBody className="">
        <h4>
          {props.values.eventTypeId
            ? props.getEventTypeForId(props.values.eventTypeId)
            : ""}
        </h4>
        {props.eventValidated && (
          <div>
            {props.values.eventStartDate
              ? props.values.eventStartDate.toLocaleString()
              : ""}
            <b> TO </b>
            {props.values.eventEndDate
              ? props.values.eventEndDate.toLocaleString()
              : ""}
          </div>
        )}

        <p className="text-success">{props.values.eventSummary}</p>
        <small>{props.values.eventDescription}</small>
        <p>
          {props.values.eventUrl ? (
            <>
              Visit for more details:{" "}
              <a href={props.values.eventUrl.toString()}>Click Here</a>
            </>
          ) : (
            ""
          )}
        </p>
      </CardBody>
      <CardFooter className="border">
        {props.values.eventIsFree
          ? "FREE EVENT"
          : `$${props.values.eventPrice ? props.values.eventPrice : 0}`}
      </CardFooter>
    </Card>
  );
}

VirtualEventPreview.propTypes = {
  values: propTypes.shape({
    eventName: propTypes.string,
    eventSummary: propTypes.string,
    eventDescription: propTypes.string,
    eventUrl: propTypes.string,
    eventStartDate: propTypes.instanceOf(Date),
    eventEndDate: propTypes.instanceOf(Date),
    eventIsFree: propTypes.bool,
    eventTypeId: propTypes.number,
    virtualTypeId: propTypes.number,
    eventImage: propTypes.string,
    eventPrice: propTypes.number,
  }),
  getEventTypeForId: propTypes.func,
  eventValidated: propTypes.bool,
};
