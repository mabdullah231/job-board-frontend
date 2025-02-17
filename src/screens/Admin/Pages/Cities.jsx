import React, { useEffect, useState } from 'react';
import Helpers from '../../../config/Helpers';
import axios from 'axios';

const Cities = () => {
  const [cities, setCities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [citiesPerPage] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityName, setCityName] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);
  const fetchCities = async () => {
    try {
      const response = await axios.get(`${Helpers.apiUrl}admin/city/all`, Helpers.authHeaders);
      setCities(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };
  useEffect(() => {

    fetchCities();
  }, []);

  const indexOfLastCity = currentPage * citiesPerPage;
  const indexOfFirstCity = indexOfLastCity - citiesPerPage;
  const currentCities = cities.slice(indexOfFirstCity, indexOfLastCity);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddEditCity = async () => {
    try {
      if (selectedCity) {
        await axios.post(`${Helpers.apiUrl}admin/city/manage`, { name: cityName, id:selectedCity.id }, Helpers.authHeaders);
        // setCities(cities.map(city => city.id === selectedCity.id ? { ...city, city: cityName } : city));
        Helpers.toast("success", "City Updated Successfully");
        fetchCities()
      } else {
        const response = await axios.post(`${Helpers.apiUrl}admin/city/manage`, { name: cityName }, Helpers.authHeaders);
        setCities([...cities, response.data]);
        Helpers.toast("success", "City Added Successfully");
      }
      setShowForm(false);
      setCityName('');
      setSelectedCity(null);
    } catch (error) {
      console.error('Error saving city:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${Helpers.apiUrl}admin/city/delete/${id}`, Helpers.authHeaders);
      setCities(cities.filter(city => city.id !== id));
      Helpers.toast("success", "City Deleted Successfully");
      setConfirmDelete(null);
    } catch (error) {
      console.error('Error deleting city:', error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h1>Cities</h1>
        <button className="btn app-btn-primary" onClick={() => { setShowForm(true); setSelectedCity(null); setCityName(''); }}>
          Add City
        </button>
      </div>

      {showForm ? (
        <div>
          <h2>{selectedCity ? 'Edit City' : 'Add City'}</h2>
          <input type="text" className="form-control" value={cityName} onChange={(e) => setCityName(e.target.value)} placeholder="Enter city name" />
          <button className="btn btn-secondary mt-2 text-white" onClick={() => setShowForm(false)}>Cancel</button>
          <button className="btn btn-primary mx-2 mt-2 text-white" onClick={handleAddEditCity}>Save</button>
        </div>
      ) : (
        <>
          <table className="table table-striped table-bordered mt-4">
            <thead>
              <tr>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCities.map(city => (
                <tr key={city.id}>
                  <td>{city.city}</td>
                  <td>
                    <button className="btn app-btn-secondary mx-2" onClick={() => { setShowForm(true); setSelectedCity(city); setCityName(city.city); }}>
                      Edit
                    </button>
                    {confirmDelete === city.id ? (
                      <>
                        <button className="btn btn-danger mx-2 text-white" onClick={() => handleDelete(city.id)}>Confirm Delete</button>
                        <button className="btn btn-secondary" onClick={() => setConfirmDelete(null)}>Cancel</button>
                      </>
                    ) : (
                      <button className="btn btn-danger text-white" onClick={() => setConfirmDelete(city.id)}>Delete</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <nav>
            <ul className="pagination">
              {Array.from({ length: Math.ceil(cities.length / citiesPerPage) }, (_, i) => (
                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                  <button onClick={() => paginate(i + 1)} className="page-link">
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};

export default Cities;
