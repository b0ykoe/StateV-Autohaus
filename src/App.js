import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ_ON6gGzW12qfede9fih_ugkSa8En9jc7uBwe9JON8UhP4gD4AlmCCk3q_bwoRG0bSzFHaCUnx9WJX/pub?gid=0&single=true&output=csv';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(SPREADSHEET_URL);
        const parsedData = Papa.parse(response.data, { header: true });
        console.log(parsedData);
        setData(parsedData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
      <div>
        <table>
          <thead>
          <tr>
            <th>Name</th>
            <th>Bild</th>
            <th>Preis</th>
            <th>Information</th>
          </tr>
          </thead>
          <tbody>
          {data.map((row, index) => (
              <tr key={index}>
                <td>{row.Name}</td>
                <td><img src={`assets/images/${row.Bild}`} alt={row.Name} style={{ width: '100px' }} /></td>
                <td>{row.Preis}€</td>
                <td>{row.Information}</td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};

export default App;