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
import { updateById } from "../../services/userProfileService";
import Swal from "sweetalert2";
import propTypes from "prop-types";
import ImageUploadFormik from "../utilities/ImageUploadFormik";

const _logger = logger.extend("editUserProfile");

class EditProfile extends React.Component {
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

  handleSubmit = (values) => {
    _logger(values, "values from formik");
    values.id = parseInt(values.id);
    updateById(values)
      .then(this.onEditProfileSuccess)
      .then(this.props.updateCurrentUser)
      .catch(this.onEditProfileError);
  };

  onEditProfileSuccess = () => {
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Profile Edited",
    });
    this.props.history.push("/seeker/:id/dashboard");
  };

  onEditProfileError = () => {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Something went wrong!",
      footer: "<a href>Why do I have this issue?</a>",
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
                          <Field
                            name="avatarUrl"
                            component={ImageUploadFormik}
                          />
                          {errors.lastName && touched.lastName && (
                            <span className="input-feedback">
                              {errors.lastName}
                            </span>
                          )}
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
                        <img
                          src={
                            values.avatarUrl === ""
                              ? this.state.formData.avatarUrl
                              : values.avatarUrl
                          }
                          alt="avatar"
                        />
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
EditProfile.propTypes = {
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
  updateCurrentUser: propTypes.func,
};
export default EditProfile;
