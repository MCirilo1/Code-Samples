/* eslint-disable react/boolean-prop-naming */
import React from "react";
import { FormGroup, Label, Input, FormFeedback, Row, Col } from "reactstrap";
import Files from "../files/Files";
import propTypes from "prop-types";
import Select from "react-select";
import DatePicker from "react-datepicker";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import "react-datepicker/dist/react-datepicker.css";

export default function WizardAddEvent(props) {
  return (
    <>
      <h4>Add Event</h4>
      <FormGroup>
        <Label for="eventName">Event Name</Label>
        <Input
          type="text"
          name="eventName"
          id="eventName"
          placeholder="Event Name"
          invalid={props.formErrors.eventName}
          onChange={props.onStringInputchange}
          onBlur={props.validateEvents}
          required
        />
        {props.formErrors.eventName && (
          <FormFeedback>{props.formErrorText.eventName}</FormFeedback>
        )}
      </FormGroup>
      <FormGroup>
        <Label for="eventTypeId">Event Type</Label>
        <Select
          name="eventTypeId"
          id="eventTypeId"
          placeholder="Select Event Type"
          options={props.eventTypeOptions}
          invalid={props.formErrors.eventTypeId}
          onChange={props.onEventTypeChange}
        />
        {props.formErrors.eventTypeId && (
          <small className="error is-invalid">
            {props.formErrorText.eventTypeId}
          </small>
        )}
      </FormGroup>
      <FormGroup>
        <Label for="virtualTypeId">Virtual Type</Label>
        <Select
          name="virtualTypeId"
          id="virtualTypeId"
          placeholder="Select Virtual Type"
          options={props.virtualTypeOptions}
          invalid={props.formErrors.virtualTypeId}
          onChange={props.onVirtualTypeChange}
        />
        {props.formErrors.virtualTypeId && (
          <small className="error is-invalid">
            {props.formErrorText.virtualTypeId}
          </small>
        )}
      </FormGroup>
      <FormGroup>
        <Label for="eventSummary">Event Summary</Label>
        <Input
          type="text"
          name="eventSummary"
          id="eventSummary"
          placeholder="Brief Event Summary"
          invalid={props.formErrors.eventSummary}
          onChange={props.onStringInputchange}
          onBlur={props.validateEvents}
          required
        />
        {props.formErrors.eventSummary && (
          <FormFeedback>{props.formErrorText.eventSummary}</FormFeedback>
        )}
      </FormGroup>
      <FormGroup>
        <Label for="eventDescription">Event Description</Label>
        <Input
          type="textarea"
          name="eventDescription"
          id="eventDescription"
          placeholder="Event Description"
          invalid={props.formErrors.eventDescription}
          onChange={props.onStringInputchange}
          onBlur={props.validateEvents}
          required
        />
        {props.formErrors.eventDescription && (
          <FormFeedback>{props.formErrorText.eventDescription}</FormFeedback>
        )}
      </FormGroup>
      <FormGroup>
        <Label for="eventUrl">Event Url</Label>
        <Input
          type="url"
          name="eventUrl"
          id="eventUrl"
          placeholder="Link"
          invalid={props.formErrors.eventUrl}
          onChange={props.onStringInputchange}
          onBlur={props.validateEvents}
        />
        {props.formErrors.eventUrl && (
          <FormFeedback>{props.formErrorText.eventUrl}</FormFeedback>
        )}
      </FormGroup>
      <FormGroup>
        <Row>
          <Col xs={12} md={6}>
            <Label for="eventStartDate">Event Start</Label>
            <DatePicker
              name="eventStartDate"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              showTimeSelect
              timeFormat="hh:mm aa"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="mm/dd/yyyy hh:mm aa"
              withPortal
              className={props.formErrors.eventStartDate && "error is-invalid"}
              selected={
                (props.formData.eventStartDate &&
                  new Date(props.formData.eventStartDate)) ||
                null
              }
              value={props.formData.eventStartDate}
              onChange={(eventStartDate) =>
                props.onFieldChange("eventStartDate", eventStartDate)
              }
            />
            {props.formErrors.eventStartDate && (
              <small className="error is-invalid">
                {props.formErrorText.eventStartDate}
              </small>
            )}
          </Col>
          <Col xs={12} md={6}>
            <Label for="eventEndDate">Event End</Label>
            <DatePicker
              name="eventEndDate"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              showTimeSelect
              timeFormat="hh:mm aa"
              timeIntervals={15}
              className={props.formErrors.eventEndDate && "error is-invalid"}
              timeCaption="time"
              dateFormat="mm/dd/yyyy hh:mm aa"
              withPortal
              selected={
                (props.formData.eventEndDate &&
                  new Date(props.formData.eventEndDate)) ||
                null
              }
              value={props.formData.eventEndDate}
              onChange={(eventEndDate) =>
                props.onFieldChange("eventEndDate", eventEndDate)
              }
            />
            {props.formErrors.eventEndDate && (
              <small className="error is-invalid">
                {props.formErrorText.eventEndDate}
              </small>
            )}
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Label for="eventImage">Event Image</Label>
        <div className="row justify-content-center">
          <Files awsUrls={props.onEventImageUpload} />
        </div>
      </FormGroup>
      <FormGroup className="justify-content-center d-flex">
        <Label for="eventIsFree">Is This A Free Event?</Label>
        <div className="ml-2">
          <Toggle
            name="eventIsFree"
            id="eventIsFree"
            onChange={props.onToggleInputchange}
            defaultChecked={props.formData.eventIsFree}
          />
        </div>
      </FormGroup>
      {props.formData.eventIsFree ? (
        ""
      ) : (
        <>
          <FormGroup>
            <Label for="eventPrice">Event Cost</Label>
            <div className="ml-3">
              <Input
                type="number"
                name="eventPrice"
                id="eventPrice"
                placeholder="0.00"
                step="0.50"
                invalid={props.formErrors.eventPrice}
                onChange={props.onNumberInputchange}
                onBlur={props.validateEvents}
                min="0"
                data-number-to-fixed="2"
                data-number-stepfactor="100"
              />
              {props.formErrors.eventPrice && (
                <FormFeedback>{props.formErrorText.eventPrice}</FormFeedback>
              )}
            </div>
          </FormGroup>
        </>
      )}
    </>
  );
}

WizardAddEvent.propTypes = {
  formData: propTypes.shape({
    eventName: propTypes.string,
    eventSummary: propTypes.string,
    eventDescription: propTypes.string,
    eventUrl: propTypes.string,
    eventImage: propTypes.string,
    eventStartDate: propTypes.instanceOf(Date),
    eventEndDate: propTypes.instanceOf(Date),
    eventIsFree: propTypes.bool,
    eventTypeId: propTypes.number,
    virtualTypeId: propTypes.number,
    eventPrice: propTypes.number,
  }),
  formErrors: propTypes.shape({
    eventName: propTypes.bool,
    eventSummary: propTypes.bool,
    eventDescription: propTypes.bool,
    eventUrl: propTypes.bool,
    eventImage: propTypes.bool,
    eventStartDate: propTypes.bool,
    eventEndDate: propTypes.bool,
    eventIsFree: propTypes.bool,
    eventTypeId: propTypes.bool,
    virtualTypeId: propTypes.string,
    eventPrice: propTypes.bool,
  }),
  formErrorText: propTypes.shape({
    eventName: propTypes.string,
    eventSummary: propTypes.string,
    eventDescription: propTypes.string,
    eventUrl: propTypes.string,
    eventImage: propTypes.string,
    eventStartDate: propTypes.string,
    eventEndDate: propTypes.string,
    eventIsFree: propTypes.string,
    eventTypeId: propTypes.string,
    virtualTypeId: propTypes.string,
    eventPrice: propTypes.string,
  }),
  eventTypeOptions: propTypes.arrayOf(propTypes.object),
  virtualTypeOptions: propTypes.arrayOf(propTypes.object),
  onImageUpload: propTypes.func,
  onStringInputchange: propTypes.func,
  onEventTypeChange: propTypes.func,
  onVirtualTypeChange: propTypes.func,
  validateEvents: propTypes.func,
  onFieldChange: propTypes.func,
  onEventImageUpload: propTypes.func,
  onToggleInputchange: propTypes.func,
  onNumberInputchange: propTypes.func,
};
