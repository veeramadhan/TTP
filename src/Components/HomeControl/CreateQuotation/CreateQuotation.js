import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CreateQuotation.css";
import axios from "axios";

const CreateQuotation = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [numberOfDays, setNumberOfDays] = useState(1);
  const [cities, setCities] = useState([]);
  const [packageType, setPackageType] = useState("");
  const [count, setCount] = useState(1);
  const [places, setPlaces] = useState([]);

  const handlePackageChange = (e) => {
    setPackageType(e.target.value);
  };

  useEffect(() => {
    if (startDate && numberOfDays > 0) {
      const newEndDate = new Date(startDate);
      newEndDate.setDate(startDate.getDate() + numberOfDays - 1);
      setEndDate(newEndDate);
      setCities(Array(numberOfDays).fill(""));
    } else {
      setEndDate(null);
      setCities([]);
    }
  }, [startDate, numberOfDays]);

  const handleDaysChange = (e) => {
    setNumberOfDays(parseInt(e.target.value, 10));
  };

  const handleCount = (e) => {
    setCount(parseInt(e.target.value, 10));
  };

  const handleCityChange = (index, value) => {
    const newCities = [...cities];
    newCities[index] = value;
    setCities(newCities);

    // Fetch places data
    const url = "http://localhost:8081/places";
    axios.get(url)
      .then((res) => {
        console.log("API Response:", res.data); // Debugging line
        setPlaces(res.data);
      })
      .catch((error) => {
        console.error("Error fetching places data:", error); // Debugging line
      });
  };

  return (
    <div className="d-flex">
      <div className="createPageMain">
        <div className="header">Create Quotation</div>
        <form>
          <div className="d-flex gap-5">
            <div className="gap-5 packageType mb-4">
              <label htmlFor="packageType" className="form-label">
                Package Type
              </label>
              <select
                className="form-control"
                id="packageType"
                value={packageType}
                onChange={handlePackageChange}
              >
                <option value="">Select package type</option>
                <option value="CollegeIV">College IV</option>
                <option value="family">Family Trip</option>
                <option value="friendstrip">Friends Trip</option>
                <option value="Couplestrip">Couples Trip</option>
                <option value="CorporateTrip">Corporate Trip</option>
              </select>
            </div>

            <div>
              <label className="form-label">Head Count</label>
              <input className="form-control" type="number" value={count} onChange={handleCount} />
            </div>
          </div>

          <div className="d-flex gap-5 mb-4">
            <div className="form-group">
              <label htmlFor="inputDays" className="form-label">
                Number of Days
              </label>
              <input
                type="number"
                className="form-control"
                id="inputDays"
                value={numberOfDays}
                onChange={handleDaysChange}
                min="1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="startDate" className="form-label">
                Start Date
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy/MM/dd"
                className="form-control"
                id="startDate"
                placeholderText="Select start date"
              />
            </div>
            <div className="form-group">
              <label htmlFor="endDate" className="form-label">
                End Date
              </label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="yyyy/MM/dd"
                className="form-control"
                id="endDate"
                placeholderText="Select end date"
                readOnly
              />
            </div>
          </div>

          {startDate && (
            <div className="city-inputs-container">
              {cities.map((city, index) => (
                <div className="form-group" key={index}>
                  <label htmlFor={`city-${index}`} className="form-label">
                    City for Day {index + 1}
                  </label>
                  <input
                    type="text"
                    className="form-control sizeCity"
                    id={`city-${index}`}
                    value={city}
                    onChange={(e) => handleCityChange(index, e.target.value)}
                  />
                </div>
              ))}
            </div>
          )}
        </form>
      </div>

      <div className="quotation">
        <div className="header">Final Quotation</div>

        {/* Display the fetched places */}
        {places.length > 0 && (
          <div className="places-list mt-4">
            <h3>Fetched Places</h3>
            <ul>
              {places.map((place) => (
                <li key={place.id}>
                  <strong>{place.name}</strong> in {place.city} - {place.description}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateQuotation;
