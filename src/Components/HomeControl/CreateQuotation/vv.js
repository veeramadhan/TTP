import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const CreateQuotation = () => {
  const location = useLocation();
  const { state } = location;
  const { quatationExiting, packagetype, StartDate, EndDate, inbetweendays, id } = state || {};

  const [packageType, setPackageType] = useState(packagetype || '');
  const [startDate, setStartDate] = useState(StartDate || '');
  const [endDate, setEndDate] = useState(EndDate || '');
  const [betweenDaysCount, setBetweenDaysCount] = useState(inbetweendays || 1);
  const [cities, setCities] = useState([]);
  const [suggestionPlaces, setSuggestionPlaces] = useState([]);
  const [currencyCity, setCurrencyCity] = useState('');

  useEffect(() => {
    // Assuming initial city data fetching logic here
    setCities(Array(betweenDaysCount).fill({ city: '' }));
  }, [betweenDaysCount]);

  const handleCityChange = (index, value) => {
    const newCities = [...cities];
    newCities[index] = { city: value };
    setCities(newCities);
  };

  const handleUpdatePlaces = (currentCity, value) => {
    // Logic to update places
  };

  return (
    <div className="col-7 px-2 py-3 d-flex flex-wrap justify-content-start rounded-3 align-items-start align-content-start m-0 border my-3 mx-4">
      <div className="d-flex justify-content-between align-items-center col-12 border-bottom pb-2 px-3 mb-2 m-0 p-0">
        <h6 className="m-0 p-0">Quotation details</h6>
        <span className="m-0 p-0">Ref no : {id}</span>
      </div>

      <div className="col-lg-6 m-0 p-0 mb-2 px-3">
        <label style={{ fontSize: 12, color: 'gray' }} className="m-0 p-0 mb-1">Package Type</label>
        <select className="form-control rounded-1" style={{ fontSize: 12 }} id="packageType" value={packageType} onChange={(e) => setPackageType(e.target.value)} >
          <option value="" disabled>Select package type</option>
          <option value="CollegeIV">College IV</option>
          <option value="Family">Family Trip</option>
          <option value="Friends trip">Friends Trip</option>
          <option value="Couples trip">Couples Trip</option>
          <option value="Corporate Trip">Corporate Trip</option>
        </select>
      </div>

      <div className="col-lg-6 m-0 p-0 mb-2 px-3">
        <label style={{ fontSize: 12, color: 'gray' }} className="m-0 p-0 mb-1">Head Count</label>
        <input className="form-control rounded-1" style={{ fontSize: 12 }} type="number" value={headCount} onChange={handleCount} />
      </div>

      <div className="col-12 d-flex m-0 p-0 px-3">
        <div className="col-lg-4 d-flex flex-column m-0 p-0">
          <label style={{ fontSize: 12, color: 'gray' }} className="m-0 p-0 mb-1">Start Date</label>
          <input type="date" value={startDate} name="startDate" min={today} style={{ fontSize: 12 }} onChange={(e) => setStartDate(e.target.value)} className="form-control startDate-endDate rounded-1" id="startDate" placeholderText="Select start date" />
        </div>
        <div className="col-lg-4 d-flex flex-column m-0 p-0 px-3">
          <label style={{ fontSize: 12, color: 'gray' }} className="m-0 p-0 mb-1">End Date</label>
          <input type="date" value={endDate} name="endDate" min={startDate} style={{ fontSize: 12 }} onChange={(e) => setEndDate(e.target.value)} className="form-control startDate-endDate rounded-1" id="endDate" placeholderText="Select end date" />
        </div>
        <div className="col-lg-4 d-flex flex-column m-0 p-0 px-3">
          <label style={{ fontSize: 12, color: 'gray' }} className="m-0 p-0 mb-1">Number of Days</label>
          <input type="number" className="form-control rounded-1" style={{ fontSize: 12 }} id="inputDays" name="betweenDaysCount" value={betweenDaysCount} disabled min="1" />
        </div>
      </div>

      <div className="mt-4 col-12">
        <h6 className="border-bottom pb-2 mb-2 col-12 px-3 m-0 p-0">City details</h6>
        <div className="col-12 d-flex flex-wrap m-0 p-0 px-2 justify-content-start">
          {
            cities.map((city, index) =>
              <div key={index} className="col-lg-4 m-0 p-0 mb-2 px-2">
                <label style={{ fontSize: 12, color: 'gray' }} className="m-0 p-0 mb-1" htmlFor={`city-${index}`}>City for Day {index + 1}</label>
                <input type="text" className="form-control rounded-1" style={{ fontSize: 12 }} id={`city-${index}`} value={city.city} placeholder="Ex : wayanad" onChange={(e) => handleCityChange(index, e.target.value)} />
              </div>
            )
          }
        </div>
      </div>

      <div className="mt-4 col-12" style={{ display: suggestionPlaces.length > 0 ? '' : 'none' }}>
        <h6 className="border-bottom pb-2 mb-2 col-12 px-3 m-0 p-0">Suggestions</h6>
        <div className="d-flex flex-wrap m-0 p-0">
          {
            suggestionPlaces.map((value, key) => (
              <div className="border py-1 px-3 col-12 m-0 p-0 my-2 mx-2" key={key} onClick={() => handleUpdatePlaces(currencyCity, value)}>
                <div className="d-flex m-0 p-0 mb-1 align-items-center justify-content-between">
                  <p className="m-0 p-0" style={{ fontSize: 14, fontWeight: 600 }}>{value.city} ({value.name})</p>
                  <p style={{ fontSize: 12 }} className="m-0 p-0">{value.maxpax} x <FontAwesomeIcon icon={faUser} style={{ fontSize: 12 }} /></p>
                </div>
                <div className="d-flex m-0 p-0 align-items-center">
                  <p className="m-0 p-0" style={{ fontSize: 12, fontWeight: 600, lineHeight: 1 }}>Adult rate : {value.adultrate} INR , </p>
                  <p className="m-0 p-0" style={{ fontSize: 12, fontWeight: 600, lineHeight: 1 }}>Child rate : {value.childrate} INR</p>
                  <span className="m-0 p-0 mx-2" style={{ fontSize: 12 }}>( {value.packagetype} )</span>
                </div>
                <p className="text-muted my-1" style={{ fontSize: 10, lineHeight: 1.5 }}>{value.description}</p>
              </div>
            ))
          }
        </div>
      </div>

    </div>
  );
};

export default CreateQuotation;
