import React, { useEffect, useState } from "react";
import Helpers from "../../../Config/Helpers";
import axios from "axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${Helpers.apiUrl}admin/category/all`,
        Helpers.getAuthHeaders()
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddEditCategory = async () => {
    try {
      if (selectedCategory) {
        await axios.post(
          `${Helpers.apiUrl}admin/category/manage`,
          { name: categoryName, id: selectedCategory.id },
          Helpers.getAuthHeaders()
        );
        // setCategories(categories.map(category => category.id === selectedCategory.id ? { ...category, category: categoryName } : category));
        fetchCategories();
        Helpers.toast("success", "Category Updated Successfully");
      } else {
        const response = await axios.post(
          `${Helpers.apiUrl}admin/category/manage`,
          { name: categoryName },
          Helpers.getAuthHeaders()
        );
        setCategories([...categories, response.data]);
        Helpers.toast("success", "Category Added Successfully");
      }
      setShowForm(false);
      setCategoryName("");
      setSelectedCategory(null);
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${Helpers.apiUrl}admin/category/delete/${id}`,
        Helpers.getAuthHeaders()
      );
      setCategories(categories.filter((category) => category.id !== id));
      Helpers.toast("success", "Category Deleted Successfully");
      setConfirmDelete(null);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div>
      {showForm ? (
        <div>
          <h2>{selectedCategory ? "Edit Category" : "Add Category"}</h2>
          <input
            type="text"
            className="form-control"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
          />
          <button
            className="btn btn-secondary mt-2 text-white"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary mx-2 mt-2 text-white"
            onClick={handleAddEditCategory}
          >
            Save
          </button>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between">
            <h1>Categories</h1>
            <button
              className="btn app-btn-primary"
              onClick={() => {
                setShowForm(true);
                setSelectedCategory(null);
                setCategoryName("");
              }}
            >
              Add Category
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
              {currentCategories.map((category) => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td>
                    <button
                      className="btn app-btn-secondary mx-2"
                      onClick={() => {
                        setShowForm(true);
                        setSelectedCategory(category);
                        setCategoryName(category.name);
                      }}
                    >
                      Edit
                    </button>
                    {confirmDelete === category.id ? (
                      <>
                        <button
                          className="btn btn-danger mx-2 text-white"
                          onClick={() => handleDelete(category.id)}
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
                        onClick={() => setConfirmDelete(category.id)}
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
                { length: Math.ceil(categories.length / categoriesPerPage) },
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

export default Categories;
