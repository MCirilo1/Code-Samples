import React from "react";
import {
  FormGroup,
  Label,
  Button,
  Container,
  Row,
  Col,
  CardText,
  CardBody,
  CardHeader,
} from "reactstrap";
import logger from "sabio-debug";
import { Formik, Field, Form } from "formik";
import profileSetupValidationSchema from "../../schemas/profileSetupValidationSchema";
import { addProfile } from "../../services/userProfileService";
import Swal from "sweetalert2";
import propTypes from "prop-types";
import Files from "../files/Files";

const _logger = logger.extend("setupUserProfile");

class SetupProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        firstName: "",
        lastName: "",
        mi: "",
        avatarUrl: "",
        userId: "",
      },
    };
  }
  componentDidMount = () => {
    const myState = this.props.currentUser;
    if (myState) {
      _logger("My state", myState);
      this.setForm(myState);
    }
  };

  setForm = (formData) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        formData: {
          ...formData,
        },
      };
    });
  };

  handleSubmit = (values, { resetForm }) => {
    _logger(values, "values from formik");
    values.id = parseInt(values.id);
    addProfile(values)
      .then(this.onAddProfileSuccess)
      .catch(this.onAddProfileError);

    resetForm(this.state.formData);
  };

  onAddProfileSuccess = () => {
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "User Profile Created",
    }).then(() => {
      this.props.history.push("/dashboard");
    });
  };

  onAddProfileError = () => {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Something went wrong!",
      footer: "<a href>Why do I have this issue?</a>",
    });
  };

  onAwsUrlReturn = (urls) => {
    this.setState((...prevState) => {
      return { ...prevState, avatarUrl: urls[0] };
    });
  };
  render() {
    return (
      <Formik
        enableReinitialize={true}
        validationSchema={profileSetupValidationSchema}
        initialValues={this.state.formData}
        onSubmit={this.handleSubmit}
      >
        {(formikProps) => {
          const {
            values,
            touched,
            errors,
            isValid,
            isSubmitting,
            // setFieldValue,
          } = formikProps;
          return (
            <Container>
              <Row>
                <Col xs="12" md="6">
                  <Form className="justify-content-md-center col-md-10 pt-10 card">
                    <FormGroup className={"d-none display-none"}>
                      <Label>User Id</Label>
                      <Field
                        name="userId"
                        type="text"
                        disabled={true}
                        values={this.state.formData.id}
                        autoComplete="off"
                        className={
                          errors.id && touched.id
                            ? "form-control error"
                            : "form-control"
                        }
                      />
                      {errors.id && touched.id && (
                        <span className="input-feedback">{errors.id}</span>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label>First Name</Label>
                      <Field
                        name="firstName"
                        type="text"
                        values={values.firstName}
                        autoComplete="off"
                        className={
                          errors.firstName && touched.firstName
                            ? "form-control error"
                            : "form-control"
                        }
                      />
                      {errors.firstName && touched.firstName && (
                        <span className="input-feedback">
                          {errors.firstName}
                        </span>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label>Middle Name</Label>
                      <Field
                        name="mi"
                        type="text"
                        values={values.mi}
                        autoComplete="off"
                        className={
                          errors.mi && touched.mi
                            ? "form-control error"
                            : "form-control"
                        }
                      />
                      {errors.mi && touched.mi && (
                        <span className="input-feedback">{errors.mi}</span>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label>Last Name</Label>
                      <Field
                        name="lastName"
                        type="text"
                        values={values.lastName}
                        autoComplete="off"
                        className={
                          errors.lastName && touched.lastName
                            ? "form-control error"
                            : "form-control"
                        }
                      />
                      {errors.lastName && touched.lastName && (
                        <span className="input-feedback">
                          {errors.lastName}
                        </span>
                      )}
                    </FormGroup>

                    <Row>
                      <Col>
                        <div>
                          <Label>Avatar</Label>
                        </div>
                        <div>
                          <Files awsUrls={this.onAwsUrlReturn} />
                        </div>
                      </Col>
                    </Row>

                    <div>
                      <Button
                        outline
                        color="primary"
                        type="submit"
                        disabled={!isValid || isSubmitting}
                      >
                        {" Submit"}
                      </Button>
                    </div>
                  </Form>
                </Col>
                <Col xs="12" md="6">
                  <div className=" card text-center">
                    <CardHeader style={{ fontWeight: "bold" }}>
                      User Profile{" "}
                    </CardHeader>
                    <CardBody>
                      <CardText>
                        {values.firstName} {values.mi} {values.lastName} <br />
                        <br />
                        <img src={this.state.formData.avatarUrl} alt="avatar" />
                      </CardText>
                    </CardBody>
                  </div>
                </Col>
              </Row>
            </Container>
          );
        }}
      </Formik>
    );
  }
}
SetupProfile.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      userId: propTypes.string,
    }),
  }),
  history: propTypes.shape({
    push: propTypes.isRequired,
  }),
  currentUser: propTypes.shape({
    avatarUrl: propTypes.string,
    firstName: propTypes.string,
    lastName: propTypes.string,
    mi: propTypes.string,
    id: propTypes.number,
  }),
  myState: propTypes.shape({}),
};
export default SetupProfile;
