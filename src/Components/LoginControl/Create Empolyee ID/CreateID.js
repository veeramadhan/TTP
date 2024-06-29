import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreateIDValidations from "./CreateIDValidations";
import axios from "axios";

const CreateID = () => {

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    admin: false,
    editAccess: false,
    quotation: false,
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleEvent = (e) => {
    e.preventDefault();
    let admin = values.admin ? 1 : 0
    let quatation = values.quotation ? 1 : 0
    let quatationedit = values.quatationedit ? 1 : 0
    const dataset = {
      username: values.username,
      email: values.email,
      password: values.password,
      admin: admin,
      editAccess: quatation,
      quotation: quatationedit,
    }
    console.log(dataset);
    axios.post("http://localhost:8081/createid", dataset).then((res) => {
      console.log(res);
      navigate("/");
    }).catch((err) => {
      console.error(err);
    });
  };

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-dark vh-100">
      <div className="bg-white p-3 rounded w-25">
        <form onSubmit={handleEvent}>
          <div className="mb-3">
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              name="username"
              placeholder="Enter UserName"
              className="form-control rounded-0"
              onChange={handleInput}
            />
            {errors.username && (
              <span className="text-danger">{errors.username}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter Email"
              className="form-control rounded-0"
              onChange={handleInput}
            />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="form-control rounded-0"
              onChange={handleInput}
            />
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </div>

          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              name="admin"
              checked={values.admin}
              onChange={handleInput}
              id="flexCheckAdmin"
            />
            <label className="form-check-label" htmlFor="flexCheckAdmin">
              Admin Access
            </label>
          </div>
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              name="editAccess"
              checked={values.editAccess}
              onChange={handleInput}
              id="flexCheckEditAccess"
            />
            <label className="form-check-label" htmlFor="flexCheckEditAccess">
              Edit Access
            </label>
          </div>
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              name="quotation"
              checked={values.quotation}
              onChange={handleInput}
              id="flexCheckQuatatio"
            />
            <label className="form-check-label" htmlFor="flexCheckQuatatio">
              Quotation
            </label>
          </div>

          <button className="btn btn-success w-100" type="submit">
            Create New ID
          </button>
          <p className="mt-3">If you have an account, click here</p>
          <Link to="/">
            <button className="w-100 bg-light">Login Page</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CreateID;



// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import CreateIDValidations from "./CreateIDValidations";
// import axios from "axios";
// const CreateID = () => {
//   const [values, setValues] = useState({
//     username: "",
//     email: "",
//     password: "",
//     admin: false,
//     editAccess: false,
//     quatatio: false,
//   });

//   const navigate = useNavigate();

//   const [errors, setErrors] = useState({});

//   const handleEvent = (e) => {
//     e.preventDefault();
//     setErrors(CreateIDValidations(values));
//     if (Object.keys(errors).length === 0) {
//       axios
//         .post("http://localhost:8081/createid", values)
//         .then((res) => {
//           navigate("/");
//         })
//         .catch((err) => {
//           console.error(err);
//         });
//     }
//   };

//   const handleInput = (e) => {
//     setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
//       <div className="bg-white p-3 rounded w-25">
//         <form onSubmit={handleEvent}>
//           <div className="mb-3">
//             <label htmlFor="username">User Name</label>
//             <input
//               type="text"
//               name="username"
//               placeholder="Enter UserName"
//               className="form-control rounded-0"
//               onChange={handleInput}
//             />
//             {errors.username && (
//               <span className="text-danger">{errors.username}</span>
//             )}
//           </div>
//           <div className="mb-3">
//             <label htmlFor="email">Email</label>
//             <input
//               type="text"
//               name="email"
//               placeholder="Enter Email"
//               className="form-control rounded-0"
//               onChange={handleInput}
//             />
//             {errors.email && (
//               <span className="text-danger">{errors.email}</span>
//             )}
//           </div>
//           <div className="mb-3">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               name="password"
//               placeholder="Enter Password"
//               className="form-control rounded-0"
//               onChange={handleInput}
//             />
//             {errors.password && (
//               <span className="text-danger">{errors.password}</span>
//             )}
//           </div>

//           <div class="form-check">
//       <input class="form-check-input" type="checkbox" value="" id="flexCheckAdmin"/>
//       <label class="form-check-label" for="flexCheckAdmin">
//         Admin Access
//       </label>
//     </div>
//     <div class="form-check">
//       <input class="form-check-input" type="checkbox" value="" id="flexCheckAccessQuotation"/>
//       <label class="form-check-label" for="flexCheckAccessQuotation">
//         Access Quotation
//       </label>
//     </div>
//     <div class="form-check">
//       <input class="form-check-input" type="checkbox" value="" id="flexCheckMarginQuotation"/>
//       <label class="form-check-label" for="flexCheckMarginQuotation">
//         Margin Quotation
//       </label>
//     </div>
      
//           <button className="btn btn-success w-100" type="submit">
//             Create New ID
//           </button>
//           <p className="mt-3">If you have an account, click here</p>
//           <Link to="/">
//             <button className="w-100 bg-light">Login Page</button>
//           </Link>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateID;
