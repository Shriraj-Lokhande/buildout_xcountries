import './App.css';
import { useState, useEffect } from "react";
import axios from 'axios';
export default function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // useEffect(() => {
    // fetch("https://restcountries.com/v3.1/all")
    //   .then((res) => {
    //     if (!res.ok) {
    //       throw new Error(`HTTP error! Status: ${res.status}`);
    //     }
    //     return res.json();
    //   })
    //   .then((data) => {
    //     setCountries(data);
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     console.error("Error fetching data: ", err);
    //     setError(true);
    //     setLoading(false);
    //   });
  // }, []);

const fetchApi = async () => {
    try {
      const res = await axios.get(
        `https://xcountries-backend.azurewebsites.net/all`
      );

      // console.log(res.data);
      setCountries(res.data);
    } catch (e) {
      console.error(`Error fetching data:${e}`);
    }
  };
  useEffect(() => {
    fetchApi();
  }, []);

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const cardStyle = {
    width: "200px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    margin: "10px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const imageStyle = {
    width: "100px",
    height: "100px",
  };

  if (loading) {
    return <h2>Loading countries...</h2>;
  }

  if (error) {
    return <h2>Failed to load countries. Please try again later.</h2>;
  }

  return (
    <div style={containerStyle}>
      {countries.map((country) => {
        return (
          <div key={country.cca3} style={cardStyle} className="countryCard">
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
              style={imageStyle}
            />
            <h2>{country.name.common}</h2>
          </div>
        );
      })}
    </div>
  );
}
