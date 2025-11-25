// Form to add product using Formik + Yup validation
// Updates product list using Context API
//userstory 3
//Formik + Yup Validation + POST API + Context API

import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ProductContext } from "../context/ProductContext";

const AddProductForm = () => {
  const { addProduct } = useContext(ProductContext);

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      category: "",
      description: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      price: Yup.number().required("Required"),
      category: Yup.string().required("Required"),
      description: Yup.string().required("Required")
    }),
    onSubmit: (values, { resetForm }) => {
      addProduct(values);
      resetForm();
      alert("Product added!");
    }
  });

  return (
    <div className="container mt-4">
      <h2>Add Product</h2>

      <form onSubmit={formik.handleSubmit} className="mt-3">

        <input
          type="text"
          name="name"
          className="form-control mb-2"
          placeholder="Product Name"
          {...formik.getFieldProps("name")}
        />
        <small className="text-danger">{formik.errors.name}</small>

        <input
          type="number"
          name="price"
          className="form-control mb-2"
          placeholder="Price"
          {...formik.getFieldProps("price")}
        />
        <small className="text-danger">{formik.errors.price}</small>

        <input
          type="text"
          name="category"
          className="form-control mb-2"
          placeholder="Category"
          {...formik.getFieldProps("category")}
        />
        <small className="text-danger">{formik.errors.category}</small>

        <textarea
          name="description"
          className="form-control mb-2"
          placeholder="Description"
          rows="3"
          {...formik.getFieldProps("description")}
        />
        <small className="text-danger">{formik.errors.description}</small>

        <button type="submit" className="btn btn-success mt-2">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
