// Edit dessert form
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function EditForms({ setActiveComponent, selectedDessert }) {
  const [isEditing, setIsEditing] = useState(false);
  const [dessert, setDessert] = useState(selectedDessert);

  // Update the state if selected item changes
  useEffect(() => {
    if (selectedDessert) {
      setDessert(selectedDessert);
    }
  }, [selectedDessert]);

  if (!dessert || Object.keys(dessert).length === 0) {
    return <p>No entree data available.</p>;
  }

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDessert((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const id = dessert._id;
      await axios.put(
        `https://chimera-h56c.onrender.com/desserts/${id}`,
        dessert
      );
      console.log(' data updated successfully');

      const updatedDessert = await axios.get(
        `https://chimera-h56c.onrender.com/desserts/${id}`
      );
      setDessert(updatedDessert.data);
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
    let dessertsList = JSON.parse(localStorage.getItem('desserts')) || [];
    dessertsList = dessertsList.filter((item) => item._id !== dessert._id);
    localStorage.setItem('desserts', JSON.stringify(dessertsList));

    setActiveComponent(null);
  };
  return (
    <div className="mt-3">
      <div className="col-lg-9">
        <div className="d-grid gap-3 gap-lg-5">
          <div className="card" style={{ maxWidth: '600px' }}>
            <div className="card-header border-bottom">
              <h4 className="card-header-title">Edit {dessert.name}</h4>
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
                      value={dessert.category || ''}
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
                      value={dessert.name || ''}
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
                          value={dessert[image] || ''}
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
                      value={dessert.description || ''}
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
