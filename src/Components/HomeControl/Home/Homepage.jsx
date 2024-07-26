import React, { useContext, useEffect, useState } from "react";
import sample from "../../../Assets/sampleUserImage.jpg";
import { Appcontext } from "../../../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const sampleResponse = {
    id: 17,
    packagetype: "",
    StartDate: "0000-00-00",
    EndDate: "0000-00-00",
    inbetweendays: 0,
    starting_point: "",
    ending_point: "",
    pickup_point: "",
    drop_point: "",
    childcount: "",
    adultcount: "",
    transportcategory: "",
    transportation: "",
    roomcategory: "",
    places: "",
    boathouse: 0,
    boathousedetails: null,
    event: null,
    quationcost: "",
    quataionstatus: "",
    km_travels: "",
    transportationdays: "",
    FoodCost: null,
    createdBy: "15",
    createdByID: "vishnu",
    createdAt: "1719945721638",
  };

  const { userDetails } = useContext(Appcontext);
  const [quatationlist, setquatationlist] = useState([]);

  const getQuatationsByID = async () => {
    await axios.post(`http://localhost:8081/getquatationbyUserID/${userDetails.userId}`).then((response) => {
      if (response.status === 200 && response.data.status == 200) {
        console.log("updated");
        setquatationlist(response.data.result);
        console.log("data", response.data.result);
      }
      console.log(response);
    }).catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    getQuatationsByID();
  }, [userDetails.userId]);

  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`createquotation/${id}`, {
      state: {
        quatationExiting: true,
      },
    });
  };

  return (
    <div className="container-fluid m-0 p-0 h-100">
      <div className="border-bottom py-2">
        <div
          className="d-flex m-0 p-0 align-items-center gap-2 ms-auto  py-2 px-3"
          style={{ width: "fit-content" }}
        >
          <img
            src={sample}
            alt=""
            className=""
            style={{ width: "35px", height: "35px" }}
          />
          <div className="m-0 p-0">
            <p className="m-0 p-0" style={{ fontSize: 14 }}>
              {userDetails.userName}
            </p>
            <p className="m-0 p-0" style={{ fontSize: 12 }}>
              {userDetails.mailId}
            </p>
          </div>
        </div>
      </div>

      <div className="d-flex col-12 flex-wrap p-4">
        <div className="col-4 p-3">
          <div className="border p-3">
            <h6>Pending Quatations</h6>
          </div>
        </div>
        <div className="col-4 p-3">
          <div className="border p-3">
            <h6>Complete your quatations</h6>
          </div>
        </div>
        <div className="col-4 p-3">
          <div className="border p-3">
            <h6>Ongoing quatations</h6>
          </div>
        </div>
        <div className="col-4 p-3">
          <div className="border p-3">
            <h6>Your Quatations</h6>
          </div>
        </div>
        <div className="col-4 p-3">
          <div className="border p-3">
            <h6>Reminders</h6>
          </div>
        </div>
      </div>

      <div className="col-12 mx-3 p-3">
        <h6>Your quatations</h6>
        <div className="col-12 d-flex flex-wrap m-0 p-0">
          {quatationlist.map((value, key) => (
            <div
              key={key}
              className="m-2 p-3 border col-6 rounded-2"
              onClick={() => handleNavigate(value.id)}
            >
              <div className="d-flex align-items-center gap-3">
                <table class="table table-md">
                  <thead>
                    <th scope="col">ID</th>
                    <th scope="col">Package type</th>
                    <th scope="col">Start date</th>
                    <th scope="col">End date</th>
                    <th scope="col">Days</th>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">{value.id}</th>
                      <th scope="row">{value.packagetype}</th>
                      <th scope="row">{value.StartDate}</th>
                      <th scope="row">{value.EndDate}</th>
                      <th scope="row">{value.inbetweendays}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
