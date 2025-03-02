import React, { useEffect, useState } from "react";
import Helpers from "../../../Config/Helpers";
import axios from "axios";

const Tags = () => {
  const [tags, setTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tagsPerPage] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tagName, setTagName] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);

  const fetchTags = async () => {
    try {
      const response = await axios.get(
        `${Helpers.apiUrl}admin/tag/all`,
        Helpers.getAuthHeaders()
      );
      setTags(response.data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    } finally{
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTags();
  }, []);

  const indexOfLastTag = currentPage * tagsPerPage;
  const indexOfFirstTag = indexOfLastTag - tagsPerPage;
  const currentTags = tags.slice(indexOfFirstTag, indexOfLastTag);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddEditTag = async () => {
    try {
      if (selectedTag) {
        await axios.post(
          `${Helpers.apiUrl}admin/tag/manage`,
          { name: tagName, id: selectedTag.id },
          Helpers.getAuthHeaders()
        );
        // setTags(tags.map(tag => tag.id === selectedTag.id ? { ...tag, tag: tagName } : tag));
        fetchTags();
        Helpers.toast("success", "Tag Updated Successfully");
      } else {
        const response = await axios.post(
          `${Helpers.apiUrl}admin/tag/manage`,
          { name: tagName },
          Helpers.getAuthHeaders()
        );
        setTags([...tags, response.data]);
        Helpers.toast("success", "Tag Added Successfully");
      }
      setShowForm(false);
      setTagName("");
      setSelectedTag(null);
    } catch (error) {
      console.error("Error saving tag:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${Helpers.apiUrl}admin/tag/delete/${id}`,
        Helpers.getAuthHeaders()
      );
      setTags(tags.filter((tag) => tag.id !== id));
      Helpers.toast("success", "Tag Deleted Successfully");
      setConfirmDelete(null);
    } catch (error) {
      console.error("Error deleting tag:", error);
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
      {showForm ? (
        <div>
          <h2>{selectedTag ? "Edit Tag" : "Add Tag"}</h2>
          <input
            type="text"
            className="form-control"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            placeholder="Enter tag name"
          />
          <button
            className="btn btn-secondary mt-2 text-white"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary mx-2 mt-2 text-white"
            onClick={handleAddEditTag}
          >
            Save
          </button>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between">
            <h1>Tags</h1>
            <button
              className="btn app-btn-primary"
              onClick={() => {
                setShowForm(true);
                setSelectedTag(null);
                setTagName("");
              }}
            >
              Add Tag
            </button>
          </div>
          <table className="table table-striped table-bordered mt-4">
            <thead>
              <tr>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentTags.map((tag) => (
                <tr key={tag.id}>
                  <td>{tag.name}</td>
                  <td>
                    <button
                      className="btn app-btn-secondary mx-2"
                      onClick={() => {
                        setShowForm(true);
                        setSelectedTag(tag);
                        setTagName(tag.name);
                      }}
                    >
                      Edit
                    </button>
                    {confirmDelete === tag.id ? (
                      <>
                        <button
                          className="btn btn-danger mx-2 text-white"
                          onClick={() => handleDelete(tag.id)}
                        >
                          Confirm Delete
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => setConfirmDelete(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        className="btn btn-danger text-white"
                        onClick={() => setConfirmDelete(tag.id)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <nav>
            <ul className="pagination">
              {Array.from(
                { length: Math.ceil(tags.length / tagsPerPage) },
                (_, i) => (
                  <li
                    key={i}
                    className={`page-item ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      onClick={() => paginate(i + 1)}
                      className="page-link"
                    >
                      {i + 1}
                    </button>
                  </li>
                )
              )}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};

export default Tags;
