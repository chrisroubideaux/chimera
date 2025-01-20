// Edit entree form
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function EditForms({ setActiveComponent, selectedEntree }) {
  const [isEditing, setIsEditing] = useState(false);
  const [entree, setEntree] = useState(selectedEntree);

  // Update the state if selected item change
  useEffect(() => {
    if (selectedEntree) {
      setEntree(selectedEntree);
    }
  }, [selectedEntree]);

  if (!entree || Object.keys(entree).length === 0) {
    return <p>No entree data available.</p>;
  }

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntree((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const id = entree._id;
      await axios.put(
        `https://chimera-h56c.onrender.com/entrees/${id}`,
        entree
      );
      console.log(' data updated successfully');

      const updatedEntree = await axios.get(
        `https://chimera-h56c.onrender.com/entrees/${id}`
      );
      setEntree(updatedEntree.data);
      setIsEditing(false);
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Status code:', error.response.status);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      alert('Failed to save changes. Check the console for more details.');
    }
  };
  // Delete item by id
  const handleDelete = () => {
    let entreesList = JSON.parse(localStorage.getItem('entrees')) || [];
    entreesList = entreesList.filter((item) => item._id !== entree._id);
    localStorage.setItem('entrees', JSON.stringify(entreesList));

    setActiveComponent(null);
  };
  return (
    <div className="mt-3">
      <div className="col-lg-9">
        <div className="d-grid gap-3 gap-lg-5">
          <div className="card" style={{ maxWidth: '600px' }}>
            <div className="card-header border-bottom">
              <h4 className="card-header-title">Edit {entree.name}</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSaveChanges}>
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Category
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="category"
                      value={entree.category || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      placeholder="Category"
                    />
                    <button
                      type="button"
                      className="btn btn-sm badge"
                      onClick={handleEditClick}
                    >
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                    {isEditing && (
                      <button type="submit" className="btn btn-sm btn-success">
                        Save
                      </button>
                    )}
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Name
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={entree.name || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      placeholder="Title"
                    />
                    <button
                      type="button"
                      className="btn btn-sm badge"
                      onClick={handleEditClick}
                    >
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                    {isEditing && (
                      <button type="submit" className="btn btn-sm btn-success">
                        Save
                      </button>
                    )}
                  </div>
                </div>

                {['image1', 'image2', 'image3', 'image4'].map(
                  (image, index) => (
                    <div className="row mb-4" key={image}>
                      <label className="col-sm-3 col-form-label form-label">
                        Image {index + 1}
                      </label>
                      <div className="col-sm-9 d-flex align-items-center gap-2">
                        <input
                          type="file"
                          className="form-control"
                          name={image}
                          value={entree[image] || ''}
                          readOnly={!isEditing}
                          onChange={handleChange}
                          accept="image/*"
                        />
                        <button
                          type="button"
                          className="btn btn-sm badge"
                          onClick={handleEditClick}
                        >
                          {isEditing ? 'Cancel' : 'Edit'}
                        </button>
                        {isEditing && (
                          <button
                            type="submit"
                            className="btn btn-sm btn-success"
                          >
                            Save
                          </button>
                        )}
                      </div>
                    </div>
                  )
                )}

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Description
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <textarea
                      className="form-control"
                      rows="3"
                      name="description"
                      value={entree.description || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      placeholder="Description"
                      style={{ minWidth: '300px' }}
                    ></textarea>
                    <button
                      type="button"
                      className="btn btn-sm badge"
                      onClick={handleEditClick}
                    >
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                    {isEditing && (
                      <button type="submit" className="btn btn-sm btn-success">
                        Save
                      </button>
                    )}
                  </div>
                </div>

                <div className="card-footer pt-0">
                  <div className="d-flex justify-content-end gap-3 mt-2">
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={handleDelete}
                    >
                      Delete Item
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
