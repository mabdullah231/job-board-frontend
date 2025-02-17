import React, { useEffect, useState } from 'react';
import Helpers from '../../../config/Helpers';
import axios from 'axios';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [skillsPerPage] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [skillName, setSkillName] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);

  const fetchSkills = async () => {
    try {
      const response = await axios.get(`${Helpers.apiUrl}admin/skill/all`, Helpers.authHeaders);
      setSkills(response.data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };
  useEffect(() => {
    fetchSkills();
  }, []);

  const indexOfLastSkill = currentPage * skillsPerPage;
  const indexOfFirstSkill = indexOfLastSkill - skillsPerPage;
  const currentSkills = skills.slice(indexOfFirstSkill, indexOfLastSkill);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddEditSkill = async () => {
    try {
      if (selectedSkill) {
        await axios.post(`${Helpers.apiUrl}admin/skill/manage`, { name: skillName, id:selectedSkill.id }, Helpers.authHeaders);
        // setSkills(skills.map(skill => skill.id === selectedSkill.id ? { ...skill, skill: skillName } : skill));
        fetchSkills();
        Helpers.toast("success", "Skill Updated Successfully");
      } else {
        const response = await axios.post(`${Helpers.apiUrl}admin/skill/manage`, { name: skillName }, Helpers.authHeaders);
        setSkills([...skills, response.data]);
        Helpers.toast("success", "Skill Added Successfully");
      }
      setShowForm(false);
      setSkillName('');
      setSelectedSkill(null);
    } catch (error) {
      console.error('Error saving skill:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${Helpers.apiUrl}admin/skill/delete/${id}`, Helpers.authHeaders);
      setSkills(skills.filter(skill => skill.id !== id));
      Helpers.toast("success", "Skill Deleted Successfully");
      setConfirmDelete(null);
    } catch (error) {
      console.error('Error deleting skill:', error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h1>Skills</h1>
        <button className="btn app-btn-primary" onClick={() => { setShowForm(true); setSelectedSkill(null); setSkillName(''); }}>
          Add Skill
        </button>
      </div>

      {showForm ? (
        <div>
          <h2>{selectedSkill ? 'Edit Skill' : 'Add Skill'}</h2>
          <input type="text" className="form-control" value={skillName} onChange={(e) => setSkillName(e.target.value)} placeholder="Enter skill name" />
          <button className="btn btn-secondary mt-2 text-white" onClick={() => setShowForm(false)}>Cancel</button>
          <button className="btn btn-primary mx-2 mt-2 text-white" onClick={handleAddEditSkill}>Save</button>
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
              {currentSkills.map(skill => (
                <tr key={skill.id}>
                  <td>{skill.name}</td>
                  <td>
                    <button className="btn app-btn-secondary mx-2" onClick={() => { setShowForm(true); setSelectedSkill(skill); setSkillName(skill.name); }}>
                      Edit
                    </button>
                    {confirmDelete === skill.id ? (
                      <>
                        <button className="btn btn-danger mx-2 text-white" onClick={() => handleDelete(skill.id)}>Confirm Delete</button>
                        <button className="btn btn-secondary" onClick={() => setConfirmDelete(null)}>Cancel</button>
                      </>
                    ) : (
                      <button className="btn btn-danger text-white" onClick={() => setConfirmDelete(skill.id)}>Delete</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <nav>
            <ul className="pagination">
              {Array.from({ length: Math.ceil(skills.length / skillsPerPage) }, (_, i) => (
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

export default Skills;