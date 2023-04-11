import React from 'react';
import './Register.css';
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  phone: yup.number().positive().integer().required("Required"),
  address: yup.string().required("Required"),
  password: yup.string().required("Required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  password: "",
};

export default function Register() {
  const navigate = useNavigate();

  const register = async (values, onSubmitProps) => {
    await fetch("http://localhost:3001/auth/register",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    onSubmitProps.resetForm();
  }

  const handleFormSubmit = async (values, onSubmitProps) => {
    console.log('submitting form');
    await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesRegister}
      validationSchema={registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <div className='register-form'>
            <div className='google-register-btn'>Register with Google account</div>
            <div className='or'>
              <div className='line'></div>
              <div className='quote'>Or fill out the information below</div>
              <div className='line'></div>
            </div>
            <div className='field-group'>
              <div className='field' style={{marginRight: "10px"}}>
                <div className='label'>
                  First name
                </div>
                <input
                  type='text'
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  className={errors.firstName && touched.firstName ? "input-error" : ""}
                />
                {errors.firstName && touched.firstName && <p className='error'>{errors.firstName}</p>}
              </div>
              <div className='field'>
                <div className='label'>
                  Last name
                </div>
                <input 
                  type='text'
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  className={errors.lastName && touched.lastName ? "input-error" : ""}
                />
                {errors.lastName && touched.lastName && <p className='error'>{errors.lastName}</p>}
              </div>
            </div>
            <div className='field-group'>
              <div className='field' style={{marginRight: "10px"}}>
                <div className='label'>
                  Email
                </div>
                <input 
                  type='text'
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  className={errors.email && touched.email ? "input-error" : ""}
                />
                {errors.email && touched.email && <p className='error'>{errors.email}</p>}
              </div>
              <div className='field'>
                <div className='label'>
                  Phone
                </div>
                <input 
                  type='text'
                  label="Phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phone}
                  name="phone"
                  className={errors.phone && touched.phone ? "input-error" : ""}
                />
                {errors.phone && touched.phone && <p className='error'>{errors.phone}</p>}
              </div>
            </div>
            <div className='field'>
              <div className='label'>
                Address
              </div>
              <input 
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                className={errors.address && touched.address ? "input-error" : ""}
              />
              {errors.address && touched.address && <p className='error'>{errors.address}</p>}
            </div>
            <div className='field'>
              <div className='label'>
                Password
              </div>
              <input 
                label="Password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                className={errors.password && touched.password ? "input-error" : ""}
              />
              {errors.password && touched.password && <p className='error'>{errors.password}</p>}
            </div>
            <button 
              type="submit"
              className='register-btn'
            >
              REGISTER
            </button>
          </div>
        </form>
      )}
    </Formik>
  )
}

