import React, { useState, useEffect, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./CreateQuotation.css";
import axios from "axios";
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useLocation, useParams } from "react-router-dom";

const CreateQuotation = () => {

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const { id } = useParams();
  const location = useLocation();

  const saveQuatatioButton = useRef();
  const loadingRefSaveQuatation = useRef();

  const initialCities = [
    { "id": 0, "city": "", "places": [] }
  ];

  const [cities, setCities] = useState(initialCities);
  const [places, setPlaces] = useState([]);

  const [packageType, setPackageType] = useState("");
  const [headCount, setHeadCount] = useState(1);

  const [suggestionPlaces, setSuggestionsPlaces] = useState([])
  const [currencyCity, setCurrenctCity] = useState(0);

  const [tripDataDetails, setTripDateDetails] = useState({
    startDate: moment(today).format('YYYY-MM-DD'),
    endDate: moment(tomorrow).format('YYYY-MM-DD'),
    betweenDaysCount: 1,
  })

  const [betweenDays, setBetweenDays] = useState({
    days: []
  })

  const handleCount = (e) => {
    setHeadCount(parseInt(e.target.value, 10));
  };

  const handleCityChange = async (index, value) => {

    const dataset = {
      id: index,
      city: value,
      places: []
    };

    const updatedCities = [...cities];
    if (index >= updatedCities.length) {
      for (let i = updatedCities.length; i <= index; i++) {
        updatedCities[i] = { id: i, city: "", places: [] };
      }
    }
    updatedCities[index] = dataset;
    setCities(updatedCities);
    setCurrenctCity(index)
    await getSuggestions()

  };



  const handleUpdatePlaces = async (index, value) => {

    const dataset = {
      id: index,
      city: value.city,
      places: [...cities[index].places, value]
    };

    const updatedCities = [...cities];
    if (index >= updatedCities.length) {
      for (let i = updatedCities.length; i <= index; i++) {
        updatedCities[i] = { id: i, city: "", places: [] };
      }
    }
    updatedCities[index] = dataset;
    setCities(updatedCities);



  }




  const handleDateDetails = (e, name) => {
    setTripDateDetails({
      ...tripDataDetails,
      [name]: moment(e.target.value).format('YYYY-MM-DD')
    })
  }


  const handleSaveQuatation = async () => {

    saveQuatatioButton.current.disabled = true;
    loadingRefSaveQuatation.current.style.display = "block";

    const dataset = {
      packageType: packageType,
      startDate: tripDataDetails.startDate,
      endDate: tripDataDetails.endDate,
      inbetweenDays: tripDataDetails.betweenDaysCount,
      startingPoint: '',
      endingPoint: "",
      pickupPoint: "",
      dropPoint: "",
      childCount: "",
      adultCount: "",
      transportCategory: "",
      transportation: "",
      roomCategory: "",
      places: "",
      boatHouse: "",
      boatHouseDetails: "",
      event: "",
      quataionCost: "",
      quatationStatus: "",
      kmsTravels: "",
      transporataionDays: "transporataionDays",
      foodCost: 'foodCost',
      id: id
    }

    try {
      await axios.post(`http://localhost:8081/saveQuatation/${id}`, dataset).then((response) => {
        setTimeout(() => {
          if (response.status === 200 && response.data.status === 200) {
            saveQuatatioButton.current.disabled = false;
            loadingRefSaveQuatation.current.style.display = "none";
          } else {
            // Handle non-successful response
            console.error('Error updating quotation:', response.data.message);
          }
        }, 1000);
      }).catch((err) => {
        saveQuatatioButton.current.disabled = false;
        loadingRefSaveQuatation.current.style.display = "none";
      });
    } catch (error) {
      saveQuatatioButton.current.disabled = false;
      loadingRefSaveQuatation.current.style.display = "none";
    }

  }


  const [quatationDetails, setQuatationDetails] = useState([])

  // need to work on this
  const getDetailsAboutQuataion = async () => {
    await axios.post(`http://localhost:8081/getquatationbyUserID/${id}`).then((res) => {
      setQuatationDetails(res.data.result[0])
      updateInitialValues(res.data.result[0])
      console.log(res);
    })
  }

  const updateInitialValues = (dataset) => {

    setPackageType(dataset.packagetype)
    setTripDateDetails({
      startDate: dataset.startDate,
      endDate: dataset.endDate,
      betweenDaysCount: dataset.inbetweenDays
    })
    setHeadCount(dataset.headCount)

  }

  const getPlaces = async () => {
    await axios.get('http://localhost:8081/places').then((res) => {
      setPlaces(res.data);
    }).catch((error) => {
      console.error("Error fetching places data:", error); // Debugging line
    });
  }


  const getSuggestions = async () => {
    if (cities[currencyCity].city !== '') {
      let filteredPlaces = places.filter((place) => {
        return !cities?.[currencyCity]?.places?.includes(place) && place.city.toLowerCase().includes(cities[currencyCity].city.toLowerCase());
      })
      setSuggestionsPlaces(filteredPlaces)
    } else {
      setSuggestionsPlaces([])
    }
  }

  useEffect(() => {

    const inBetween = [];
    const startDt = new Date(tripDataDetails.startDate);
    const endDt = new Date(tripDataDetails.endDate);

    let currentDate = new Date(startDt);
    currentDate.setDate(currentDate.getDate() + 1);

    while (currentDate <= endDt) {
      inBetween.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setBetweenDays({
      ...betweenDays,
      days: inBetween
    })

    setTripDateDetails({
      ...tripDataDetails,
      betweenDaysCount: Object.keys(inBetween).length
    })

  }, [tripDataDetails.startDate, tripDataDetails.endDate])

  useEffect(() => {
    getDetailsAboutQuataion()
  }, [id])

  useEffect(() => {
    getSuggestions()
  }, [cities])

  useEffect(() => {
    getPlaces()
  }, [])

  return (
    <div className="row container-fluid m-0 p-0">

      <div className="col-12 d-flex align-items-center py-3 px-4 border-bottom m-0 p-0">
        <h4>Create Quotation</h4>
        <button className="btn btn-secondary ms-auto">Create a new quatation</button>
      </div>

      <div className="col-7 px-2 py-3 d-flex flex-wrap justify-content-start rounded-3 align-items-start align-content-start m-0 border my-3 mx-4">

        <div className="d-flex justify-content-between align-items-center col-12 border-bottom pb-2 px-3 mb-2 m-0 p-0">
          <h6 className="m-0 p-0">Quatation details</h6>
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
            <input type="date" value={tripDataDetails.startDate} name="startDate" min={today} style={{ fontSize: 12 }} onChange={(e) => handleDateDetails(e, "startDate")} className="form-control startDate-endDate rounded-1" id="startDate" placeholderText="Select start date" />
          </div>
          <div className="col-lg-4 d-flex flex-column m-0 p-0 px-3">
            <label style={{ fontSize: 12, color: 'gray' }} className="m-0 p-0 mb-1">End Date</label>
            <input type="date" value={tripDataDetails.endDate} name="endDate" min={tripDataDetails.startDate} style={{ fontSize: 12 }} onChange={(e) => handleDateDetails(e, "endDate")} className="form-control startDate-endDate rounded-1" id="endDate" placeholderText="Select end date" />
          </div>
          <div className="col-lg-4 d-flex flex-column m-0 p-0 px-3">
            <label style={{ fontSize: 12, color: 'gray' }} className="m-0 p-0 mb-1">Number of Days</label>
            <input type="number" className="form-control rounded-1" style={{ fontSize: 12 }} id="inputDays" name="betweenDaysCount" value={tripDataDetails.betweenDaysCount} disabled onChange={(e) => setTripDateDetails({ ...tripDataDetails, betweenDaysCount: e.target.value })} min="1" />
          </div>
        </div>

        <div className="mt-4 col-12">
          <h6 className="border-bottom pb-2 mb-2 col-12 px-3 m-0 p-0">City details</h6>
          <div className="col-12 d-flex flex-wrap m-0 p-0 px-2 justify-content-start">
            {
              betweenDays.days.map((city, index) =>
                <div key={index} className="col-lg-4 m-0 p-0 mb-2 px-2">
                  <label style={{ fontSize: 12, color: 'gray' }} className="m-0 p-0 mb-1" htmlFor={`city-${index}`}>City for Day {index + 1}</label>
                  <input type="text" className="form-control rounded-1" style={{ fontSize: 12 }} id={`city-${index}`} value={cities?.[index]?.city} placeholder="Ex : wayanad" onChange={(e) => handleCityChange(index, e.target.value)} />
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

      <div className="col-4 px-2 py-3 d-flex flex-wrap rounded-3 align-items-start align-content-start m-0 border my-3">

        <h6 className="border-bottom pb-2 mb-2 col-12 px-2 m-0 p-0">Final Quotation</h6>

        <div className="px-2 col-12">
          <h6 className="m-0 p-0 mb-1">Package details</h6>
          <p className="m-0 p-0" style={{ fontSize: 13 }}>Package type : {packageType}</p>
          <p className="m-0 p-0" style={{ fontSize: 13 }}>{headCount} x persons , {tripDataDetails.betweenDaysCount} x days</p>
          <p className="m-0 p-0" style={{ fontSize: 13 }}>Start / End date : {moment(tripDataDetails.startDate).format('YYYY-MM-DD')} -  {moment(tripDataDetails.endDate).format('YYYY-MM-DD')}</p>
        </div>

        <div className="px-2 col-12 my-3">
          <h6 className="m-0 p-0 mb-1">Trip details</h6>
          <div className="d-flex flex-column align-items-start">
            <span>Start date : {moment(tripDataDetails.startDate).format('YYYY-MM-DD')}</span>
            <div className="px-2 my-2">
              {
                betweenDays.days.map((value, key) => (
                  <div className="mb-2" key={key}>
                    <div className="d-flex align-items-center m-0 p-0">
                      <p className="m-0 p-0" style={{ fontSize: 12 }}>Day {key + 1}</p>
                      <span className="m-0 p-0 px-1 text-muted" style={{ fontSize: 10 }}>( {value} )</span>
                      <span className="m-0 p-0 px-1 text-muted" style={{ fontSize: 10 }}>-</span>
                      <p className="m-0 p-0" style={{ fontSize: 12 }}>{cities?.[key]?.city}</p>
                    </div>
                    <div className="day-wise-placesDetails">
                      {
                        cities?.[key]?.places?.length > 0 &&
                        cities?.[key]?.places?.map((value, index) => (
                          <p key={index} style={{ fontSize: 12 }} className="m-0 p-0 px-1" >{index + 1}.  {value.name} </p>
                        ))
                      }
                    </div>
                  </div>
                ))
              }
            </div>
            <span>End date : {moment(tripDataDetails.endDate).format('YYYY-MM-DD')}</span>
          </div>
        </div>

        <div className="col-12 border-top px-1 pt-3">
          <button className="btn btn-primary d-flex align-items-center" ref={saveQuatatioButton} onClick={() => handleSaveQuatation()}>Save quatation<i ref={loadingRefSaveQuatation} style={{ display: 'none' }} class="fa-solid fa-spinner fa-spin-pulse ml-2"></i></button>
        </div>

      </div>

    </div>
  );
};

export default CreateQuotation;
