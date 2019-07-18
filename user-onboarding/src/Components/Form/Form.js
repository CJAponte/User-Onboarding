import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";
import "./form.css";

window.axios = axios;

function NewUser({ errors, touched, isSubmitting }) {
  console.log(isSubmitting);
  return (
    <Form className="login-form">
      <h2>Create User</h2>
      <div className="form-group">
        <label htmlFor="username">Full Name</label>
        <Field
          autoComplete="off"
          type="text"
          id="fullName"
          name="fullName"
          className={errors.fullName ? "invalid" : ""}
        />
        <p className="error-text">
          {touched.fullName && errors.fullName}
        </p>
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <Field
          autoComplete="off"
          type="password"
          id="password"
          name="password"
        />
        <p className="error-text">
          {touched.password && errors.password}
        </p>
      </div>

      <div className="form-group">
        <label htmlFor="email">E-mail</label>
        <Field
          autoComplete="off"
          type="email"
          id="email"
          name="email"
        />
        <p className="error-text">
          {touched.email && errors.email}
        </p>
      </div>

      <div className="form-group">
        <label htmlFor="TOS">I Agree to Terms of Service</label>
        <Field
          autoComplete="off"
          type="checkbox"
          id="TOS"
          name="TOS"
          value="true"
        />
        <p className="error-text">
          {touched.TOS && errors.TOS}
        </p>
      </div>
    

      {isSubmitting && <p>Loading...</p>}
      <button
        className="submit-button"
        disabled={isSubmitting}
      >
        Submit &rarr;
      </button>
        
    </Form>
  );
}

export default withFormik({
  mapPropsToValues: () => {
    return {
      fullName: "",
      password: ""
    };
  },
  handleSubmit: (values, formikBag) => {
    formikBag.resetForm();
    console.log("FORM SUCCESSFULLY SUBMITTED");
    const url = "https://reqres.in/api/users";
    formikBag.setSubmitting(true);
    axios.post(url, values).then(response => {
      console.log(response.data);
      window.alert(
        "Form submitted " + response.data.fullName
      );
      formikBag.setSubmitting(false);
    });
  },
  validationSchema: Yup.object().shape({
    fullName: Yup.string()
      .min(
        5,
        "Full Name should be at least 5 characters long"
      )

      .required("Full Name is required"),
    password: Yup.string()
      .min(8)
      .max(15)
      .required("Password is required")
      ,
    email: Yup.string()
      .min(11)
      .required("E-mail is required")
  })
})(NewUser);
