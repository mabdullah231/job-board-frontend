import React, { useEffect, useState } from "react";
import Helpers from "../../../Config/Helpers";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${Helpers.apiUrl}admin/userdata/get-all`,
        Helpers.getAuthHeaders()
      );
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleUserStatus = async (id, isActive) => {
    try {
      await axios.put(
        `${Helpers.apiUrl}admin/userdata/toggle-status/${id}`,
        {},
        Helpers.getAuthHeaders()
      );
      //   setUsers(users.map(user => user.id === id ? { ...user, is_active: isActive ? 0 : 1 } : user));
      Helpers.toast(
        "success",
        `User ${isActive ? "Deactivated" : "Activated"} Successfully`
      );
      fetchUsers();
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h1>Users</h1>
      </div>

      <table className="table table-striped table-bordered mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Type</th>
            <th>Created At</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.is_active ? "Active" : "Inactive"}</td>
              <td>{new Date(user.created_at).toLocaleDateString()}</td>
              <td>{user.company ? user.company.name : "N/A"}</td>
              <td>
                <button
                  className={`btn ${
                    user.is_active ? "btn-danger" : "btn-success"
                  } text-white`}
                  onClick={() => toggleUserStatus(user.id, user.is_active)}
                >
                  {user.is_active ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav>
        <ul className="pagination">
          {Array.from(
            { length: Math.ceil(users.length / usersPerPage) },
            (_, i) => (
              <li
                key={i}
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
              >
                <button onClick={() => paginate(i + 1)} className="page-link">
                  {i + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Users;
