import React from "react";
import { Page, Grid } from "tabler-react";
import SiteWrapper from "./SiteWrapper.react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { withFormik } from "formik";

const EmployeeForm = ({
  values,
  handleChange,
  handleSubmit,
  errors,
  touched,
  isSubmitting,
}) => {
  return (
    <SiteWrapper>
      <Page.Card title="Employee Registration"></Page.Card>
      <Grid.Col md={6} lg={6} className="align-self-center">
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            {touched.id && errors.id && <p className="text-danger">{errors.id}</p>}
            <Label for="id">Employee ID</Label>
            <Input
              type="text"
              name="id"
              value={values.id}
              onChange={handleChange}
              id="id"
              placeholder="Employee ID"
            />
          </FormGroup>
          <FormGroup>
            {touched.name && errors.name && <p className="text-danger">{errors.name}</p>}
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              id="name"
              placeholder="Employee Name"
            />
          </FormGroup>
          <FormGroup>
            {touched.address && errors.address && <p className="text-danger">{errors.address}</p>}
            <Label for="address">Address</Label>
            <Input
              type="text"
              name="address"
              value={values.address}
              onChange={handleChange}
              id="address"
              placeholder="Employee Address"
            />
          </FormGroup>
          <FormGroup>
            {touched.email && errors.email && <p className="text-danger">{errors.email}</p>}
            <Label for="email">Email ID</Label>
            <Input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              id="email"
              placeholder="Email ID"
            />
          </FormGroup>
          <FormGroup>
            {touched.phone_number && errors.phone_number && <p className="text-danger">{errors.phone_number}</p>}
            <Label for="phone_number">Phone Number</Label>
            <Input
              type="text"
              name="phone_number"
              value={values.phone_number}
              onChange={handleChange}
              id="phone_number"
              placeholder="Phone Number"
            />
          </FormGroup>
          <FormGroup>
            {touched.annual_package && errors.annual_package && <p className="text-danger">{errors.annual_package}</p>}
            <Label for="annual_package">Annual Package</Label>
            <Input
              type="number"
              name="annual_package"
              value={values.annual_package}
              onChange={handleChange}
              id="annual_package"
              placeholder="Annual Package"
            />
          </FormGroup>
          <FormGroup>
            {touched.job_role && errors.job_role && <p className="text-danger">{errors.job_role}</p>}
            <Label for="job_role">Job Role</Label>
            <Input
              type="select"
              name="job_role"
              id="job_role"
              value={values.job_role}
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              <option value="Developer">Developer</option>
              <option value="DevOps">DevOps</option>
            </Input>
          </FormGroup>
          <FormGroup>
            {touched.status && errors.status && <p className="text-danger">{errors.status}</p>}
            <Label for="status">Status</Label>
            <Input
              type="select"
              name="status"
              id="status"
              value={values.status}
              onChange={handleChange}
            >
              <option value="">Select Status</option>
              <option value="Ex-Employee">Ex-Employee</option>
              <option value="Current Employee">Current Employee</option>
            </Input>
          </FormGroup>
          <FormGroup>
            {touched.location && errors.location && <p className="text-danger">{errors.location}</p>}
            <Label for="location">Location</Label>
            <Input
              type="select"
              name="location"
              id="location"
              value={values.location}
              onChange={handleChange}
            >
              <option value="">Select Location</option>
              <option value="Delhi">Delhi</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Newyork">Newyork</option>
            </Input>
          </FormGroup>
          <FormGroup>
            {touched.joining_date && errors.joining_date && (
              <p className="text-danger">{errors.joining_date}</p>
            )}
            <Label for="joining_date">Joining Date</Label>
            <Input
              type="date"
              name="joining_date"
              id="joining_date"
              value={values.joining_date}
              onChange={handleChange}
            />
          </FormGroup>
          <Button color="primary" disabled={isSubmitting}>
            Submit
          </Button>
        </Form>
      </Grid.Col>
    </SiteWrapper>
  );
};

const FormikApp = withFormik({
  mapPropsToValues() {
    return {
      id: "",
      name: "",
      address: "",
      email: "",
      phone_number: "",
      annual_package: "",
      job_role: "",
      status: "",
      location: "",
      joining_date: "",
    };
  },
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    Promise.all([
      fetch("/employee/create", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      }),
      fetch("/notification/send", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    ])
      .then((responses) => {
        if (responses.some((res) => !res.ok)) {
          throw new Error("One or more requests failed");
        }
        resetForm();
      })
      .catch(() => {
        setErrors({ api: "Error submitting form. Please try again." });
      })
      .finally(() => setSubmitting(false));
  },
})(EmployeeForm);

export default FormikApp;
