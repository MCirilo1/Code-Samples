import React, { Component } from "react";
import { Row, Col, Button } from "reactstrap";
import { getType } from "../../services/lookUpService";
import { toastError } from "../../services/utilityService";
import { virtualEventWizardAdd } from "../../services/virtualEventService";
import VirtualEventStepper from "./VirtualEventStepper";
import WizardAddEvent from "./WizardAddEvent";
import SweetAlert from "react-bootstrap-sweetalert";
import PropTypes from "prop-types";

import virtualEventWizardSchema from "../../schemas/virtualEventWizardSchema";

import VirtualEventPreview from "./virtualeventwizardpreview/VirtualEventPreview";

import "./EventWizard.css";

export default class EventWizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wizardStep: 0,
      eventTypeOptions: [],
      virtualTypeOptions: [],
      eventValidated: false,
      formData: {
        eventName: "",
        eventDescription: "",
        eventSummary: "",
        eventUrl: "",
        eventStartDate: new Date(),
        eventEndDate: new Date(),
        eventIsFree: true,
        eventTypeId: 0,
        eventTypeString: "",
        virtualTypeId: 0,
        virtualTypeString: "",
        eventImage: "",
        eventPrice: 0.0,
      },
      formErrors: {},
      formErrorText: {},
      showSuccess: false,
    };
  }

  onStringInputchange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevState) => {
      return {
        ...prevState,
        formData: {
          ...prevState.formData,
          [name]: value,
        },
      };
    });
  };

  onNumberInputchange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevState) => {
      return {
        ...prevState,
        formData: {
          ...prevState.formData,
          [name]: parseFloat(value),
        },
      };
    });
  };

  onToggleInputchange = (e) => {
    const name = e.target.name;
    const value = e.target.checked;
    this.setState((prevState) => {
      return {
        ...prevState,
        formData: {
          ...prevState.formData,
          [name]: value,
          eventPrice: 0.0,
        },
      };
    });
  };

  onFieldChange = (name, value) => {
    this.setState(
      (prevState) => {
        return {
          ...prevState,
          formData: {
            ...prevState.formData,
            [name]: value,
          },
        };
      },
      () => this.validate()
    );
  };

  onEventImageUpload = (urlArray) => {
    if (urlArray[0]) {
      this.setState((prevState) => {
        return {
          ...prevState,
          formData: {
            ...prevState.formData,
            eventImage: urlArray[0],
          },
        };
      });
    }
  };

  onEventTypeChange = (e) => {
    this.setState(
      (prevState) => {
        return {
          ...prevState,
          formData: {
            ...prevState.formData,
            eventTypeId: parseInt(e.value),
            eventTypeString: e.label,
          },
        };
      },
      () => this.validate()
    );
  };

  onVirtualTypeChange = (e) => {
    this.setState(
      (prevState) => {
        return {
          ...prevState,
          formData: {
            ...prevState.formData,
            virtualTypeId: parseInt(e.value),
            virtualTypeString: e.label,
          },
        };
      },
      () => this.validate()
    );
  };

  validate = () => {
    const wizardStep = this.state.wizardStep;
    switch (wizardStep) {
      case 0: {
        virtualEventWizardSchema
          .validate(this.state.formData, { abortEarly: false })
          .then(this.onValidationSuccess)
          .catch(this.onValidationFail);
        break;
      }
      case 1: {
        break;
      }
      default: {
        virtualEventWizardSchema
          .validate(this.state.formData, { abortEarly: false })
          .then(this.onValidationSuccess)
          .catch(this.onValidationFail);
        break;
      }
    }
  };

  onValidationFail = (errors) => {
    if (errors.inner.length > 0) {
      let formErrors = {};
      let formErrorText = {};
      let whichValidated =
        this.state.wizardStep === 0 ? "eventValidated" : "confirmValidation";
      errors.inner.forEach((error) => {
        const field = error.path;
        const errorText = error.message;
        formErrors[field] = true;
        formErrorText[field] = errorText;
      });
      this.setState((prevState) => {
        return {
          ...prevState,
          formErrors: formErrors,
          formErrorText: formErrorText,
          [whichValidated]: false,
        };
      });
    }
  };

  onValidationSuccess = () => {
    let whichValidated =
      this.state.wizardStep === 0 ? "eventValidated" : "confirmValidation";
    this.setState((prevState) => {
      return {
        ...prevState,
        [whichValidated]: true,
        formErrors: {},
        formErrorText: {},
      };
    });
  };

  componentDidMount = () => {
    this.getSelectOptions();
  };

  getEventTypeForId = (id) => {
    let eventTypeOptions = [...this.state.eventTypeOptions];
    let result = eventTypeOptions.find(({ value }) => value === id);
    return result.label;
  };

  getVirtualTypeForId = (id) => {
    let virtualTypeOptions = [...this.state.virtualTypeOptions];
    let result = virtualTypeOptions.find(({ value }) => value === id);
    return result.label;
  };

  determinePage = (wizardStep) => {
    switch (wizardStep) {
      case 0: {
        return (
          <WizardAddEvent
            {...this.props}
            formData={this.state.formData}
            formErrors={this.state.formErrors}
            formErrorText={this.state.formErrorText}
            eventTypeOptions={this.state.eventTypeOptions}
            virtualTypeOptions={this.state.virtualTypeOptions}
            onImageUpload={this.onImageUpload}
            onStringInputchange={this.onStringInputchange}
            onNumberInputchange={this.onNumberInputchange}
            onEventTypeChange={this.onEventTypeChange}
            onVirtualTypeChange={this.onVirtualTypeChange}
            validateEvents={this.validate}
            onFieldChange={this.onFieldChange}
            onEventImageUpload={this.onEventImageUpload}
            onToggleInputchange={this.onToggleInputchange}
          />
        );
      }
      case 1: {
        return (
          <div className="full-height">
            <h3>Confirm this event?</h3>
          </div>
        );
      }
      default: {
        return (
          <WizardAddEvent
            {...this.props}
            formData={this.state.formData}
            formErrors={this.state.formErrors}
            formErrorText={this.state.formErrorText}
            eventTypeOptions={this.state.eventTypeOptions}
            virtualTypeOptions={this.state.virtualTypeOptions}
            onImageUpload={this.onImageUpload}
            onStringInputchange={this.onStringInputchange}
            onNumberInputchange={this.onNumberInputchange}
            onEventTypeChange={this.onEventTypeChange}
            onVirtualTypeChange={this.onVirtualTypeChange}
            validateEvents={this.validate}
            onFieldChange={this.onFieldChange}
            onEventImageUpload={this.onEventImageUpload}
            onToggleInputchange={this.onToggleInputchange}
          />
        );
      }
    }
  };

  onImageUpload = (url) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        formData: {
          ...prevState.formData,
          eventImage: url,
        },
      };
    });
  };

  onSubmitSuccess = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        showSuccess: true,
      };
    });
  };

  onConfirm = () => {
    this.props.history.push("/virtualevent");
  };

  submitEvent = () => {
    const payload = this.generatePayload();
    virtualEventWizardAdd(payload).then(this.onSubmitSuccess).catch(toastError);
    return payload;
  };

  generatePayload = () => {
    const payload = {
      name: this.state.formData.eventName,
      summary: this.state.formData.eventSummary,
      description: this.state.formData.eventDescription,
      eventTypeId: this.state.formData.eventTypeId,
      virtualTypeId: this.state.formData.virtualTypeId,
      imageUrl: this.state.formData.eventImage,
      externalSiteUrl: this.state.formData.eventUrl,
      isFree: this.state.formData.eventIsFree,
      DateStart: this.state.formData.eventStartDate,
      DateEnd: this.state.formData.eventEndDate,
      Price: this.state.formData.eventPrice,

      EventStatusId: 1,
    };
    return payload;
  };

  onNextClicked = () => {
    if (this.state.wizardStep === 0 && this.state.eventValidated) {
      this.setState({ wizardStep: this.state.wizardStep + 1 });
    } else if (this.state.wizardStep === 1 && this.state.eventValidated) {
      this.submitEvent();
    } else {
      this.validate();
    }
  };

  onBackClicked = () => {
    this.setState({ wizardStep: this.state.wizardStep - 1 });
  };

  onGetEventTypes = (res) => {
    if (res.items) {
      let eventTypes = res.items.map((eventType) => {
        return {
          value: eventType.id,
          label: eventType.name,
        };
      });
      this.setState({ eventTypeOptions: eventTypes });
    }
  };

  onGetVirtualTypes = (res) => {
    if (res.items) {
      let virtualTypes = res.items.map((virtualType) => {
        return {
          value: virtualType.id,
          label: virtualType.name,
        };
      });
      this.setState({ virtualTypeOptions: virtualTypes });
    }
  };

  getSelectOptions = () => {
    getType("EventTypes").then(this.onGetEventTypes).catch(toastError);
    getType("VirtualType").then(this.onGetVirtualTypes).catch(toastError);
  };

  render() {
    return (
      <div className="card h-100 mh-100">
        <Row className="mb-2">
          <Col sm={12}>
            <div className="step-progress">
              <div className="multi-step">
                <VirtualEventStepper wizardStep={this.state.wizardStep} />
              </div>
            </div>
          </Col>
        </Row>
        <Row className="h-100 mh-100">
          <Col xs={12} md={6}>
            <div className="step-progress">
              <div className="multi-step">
                <div className="step mt-5">
                  <Row className="justify-content-center h-100 mh-100">
                    <Col lg={10} xs={11}>
                      {this.determinePage(this.state.wizardStep)}
                    </Col>
                  </Row>
                  <Row className="justify-content-center h-100 mh-100">
                    <div className="mr-auto ml-3">
                      {this.state.wizardStep === 0 ? (
                        ""
                      ) : (
                        <Button
                          type="button"
                          color="primary"
                          id="prev-button"
                          onClick={this.onBackClicked}
                        >
                          <i className="fas fa-arrow-left"></i> Previous
                        </Button>
                      )}
                    </div>

                    <div className="ml-auto mr-3">
                      <Button
                        type="button"
                        color={
                          this.state.wizardStep === 1 ? "success" : "primary"
                        }
                        id="next-button"
                        onClick={this.onNextClicked}
                        className="mr-auto"
                      >
                        {this.state.wizardStep === 1 ? "Submit" : "Next"}{" "}
                        <i className="fas fa-arrow-right"></i>
                      </Button>
                    </div>
                  </Row>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <VirtualEventPreview
              values={this.state.formData}
              getEventTypeForId={this.getEventTypeForId}
              getVirtualTypeForId={this.getVirtualTypeForId}
              eventValidated={this.state.eventValidated}
            />
          </Col>
        </Row>
        {this.state.showSuccess && (
          <SweetAlert
            success
            title="Event Created"
            onConfirm={this.onConfirm}
            timeout={2000}
          >
            Event Created! Redirecting to Virtual Events page.
          </SweetAlert>
        )}
      </div>
    );
  }
}

EventWizard.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};
