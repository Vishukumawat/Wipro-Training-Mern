// question 6

//  Formik + Yup Validation 

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const FormikLogin = () => {
  const schema = Yup.object({
    email: Yup.string().email("Invalid Email").required("Required"),
    password: Yup.string()
      .min(6, "Min 6 characters")
      .required("Required"),
  });

  return (
    <div style={{ padding: 20 }}>
      <h2>Formik Login</h2>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={schema}
        onSubmit={(values) => console.log(values)}
      >
        <Form>
          <Field name="email" placeholder="Enter Email" />
          <ErrorMessage name="email" />

          <br /><br />

          <Field name="password" placeholder="Enter Password" type="password" />
          <ErrorMessage name="password" />

          <br /><br />

          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default FormikLogin;
