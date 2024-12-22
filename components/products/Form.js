// Form component
import { useState } from 'react';

const Form = () => {
  const [options, setOptions] = useState(['']);
  const [images, setImages] = useState(['']);
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    description: '',
    price: '',
    count: '',
    par: '',
  });

  const endpoints = {
    desserts: 'http://localhost:3001/desserts',
    beverages: 'http://localhost:3001/beverages',
    entrees: 'http://localhost:3001/entrees',
    starters: 'http://localhost:3001/starters',
  };

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleRemoveOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleAddImage = () => {
    setImages([...images, '']);
  };

  const handleImageChange = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const handleRemoveImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addProduct = async (e) => {
    e.preventDefault();

    const { category, ...data } = formData;
    data.options = options.filter((opt) => opt.trim() !== '');
    data.images = images.filter((img) => img.trim() !== '');

    const endpoint = endpoints[category.toLowerCase()];
    if (!endpoint) {
      alert(
        'Invalid category. Please enter one of: desserts, beverages, entrees, starters.'
      );
      return;
    }

    // Validate required fields
    if (
      !data.name ||
      !data.description ||
      !data.price ||
      !data.count ||
      !data.par
    ) {
      alert('Please fill out all required fields.');
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Product added successfully!');
        // Reset form
        setFormData({
          category: '',
          name: '',
          description: '',
          price: '',
          count: '',
          par: '',
        });
        setOptions(['']);
        setImages(['']);
      } else {
        const errorDetails = await response.json();
        console.error('Error from server:', errorDetails);
        alert(
          `Failed to add product: ${errorDetails.message || 'Unknown error'}`
        );
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="mt-3">
      <div className="col-lg-9">
        <div className="d-grid gap-3 gap-lg-5">
          <div className="card">
            <div className="card-header border-bottom">
              <h4 className="card-header-title">Add Product</h4>
            </div>
            <div className="card-body">
              <form onSubmit={addProduct}>
                <div className="row mb-4">
                  <label
                    htmlFor="category"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Category
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="category"
                      id="category"
                      placeholder="Category (e.g., desserts, beverages)"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label
                    htmlFor="name"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Name
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      id="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label
                    htmlFor="images"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Images
                  </label>
                  <div className="col-sm-9">
                    {images.map((image, index) => (
                      <div key={index} className="input-group mb-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Image URL"
                          value={image}
                          onChange={(e) =>
                            handleImageChange(index, e.target.value)
                          }
                        />
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={handleAddImage}
                        >
                          <i className="fa-solid fa-plus"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-sm"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <i className="fa-solid fa-times"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="row mb-4">
                  <label
                    htmlFor="description"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Description
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="description"
                      id="description"
                      placeholder="Description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label
                    htmlFor="price"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Price
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="price"
                      id="price"
                      placeholder="Price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label
                    htmlFor="count"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Count
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="count"
                      id="count"
                      placeholder="Count"
                      value={formData.count}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label
                    htmlFor="par"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Par
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="par"
                      id="par"
                      placeholder="Par"
                      value={formData.par}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label
                    htmlFor="options"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Add More
                  </label>
                  <div className="col-sm-9">
                    {options.map((option, index) => (
                      <div key={index} className="input-group mb-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Option"
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(index, e.target.value)
                          }
                        />
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={handleAddOption}
                        >
                          <i className="fa-solid fa-plus"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-sm"
                          onClick={() => handleRemoveOption(index)}
                        >
                          <i className="fa-solid fa-times"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="card-footer pt-0">
                  <div className="d-flex justify-content-end gap-3 mt-2">
                    <button className="btn btn-sm btn-primary" type="submit">
                      Add Product
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
};

export default Form;

{
  /*
import { useState } from 'react';

const Form = () => {
  const [options, setOptions] = useState(['']);
  const [images, setImages] = useState(['']);

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleRemoveOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleAddImage = () => {
    setImages([...images, '']);
  };

  const handleImageChange = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const handleRemoveImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  return (
    <>
      <div className="mt-3">
        <div className="col-lg-9">
          <div className="d-grid gap-3 gap-lg-5">
            <div className="card">
              <div className="card-header border-bottom">
                <h4 className="card-header-title">Add Product</h4>
              </div>
              <div className="card-body">
                <form>
                  <div className="row mb-4"></div>
                  <div className="row mb-4">
                    <label
                      htmlFor="category"
                      className="col-sm-3 col-form-label form-label"
                    >
                      Category{' '}
                      <i
                        className="bi-question-circle text-body ms-1"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Displayed on public forums, such as Front."
                      ></i>
                    </label>
                    <div className="col-sm-9">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          name="category"
                          id="category"
                          placeholder="Category"
                          aria-label="Category"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <label
                      htmlFor="name"
                      className="col-sm-3 col-form-label form-label"
                    >
                      Name{' '}
                      <i
                        className="bi-question-circle text-body ms-1"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Displayed on public forums, such as Front."
                      ></i>
                    </label>
                    <div className="col-sm-9">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          id="name"
                          placeholder="Name"
                          aria-label="Name"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <label
                      htmlFor="images"
                      className="col-sm-3 col-form-label form-label"
                    >
                      Images
                    </label>
                    <div className="col-sm-9">
                      {images.map((image, index) => (
                        <div key={index} className="input-group mb-2">
                          <input
                            type="text"
                            className="form-control"
                            name={`image-${index}`}
                            id={`image-${index}`}
                            placeholder="Image URL"
                            value={image}
                            onChange={(e) =>
                              handleImageChange(index, e.target.value)
                            }
                          />
                          <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={handleAddImage}
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-sm"
                            onClick={() => handleRemoveImage(index)}
                          >
                            <i className="fa-solid fa-times"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="row mb-4">
                    <label
                      htmlFor="description"
                      className="col-sm-3 col-form-label form-label"
                    >
                      Description
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        name="description"
                        id="description"
                        placeholder="Description"
                        aria-label="Description"
                      />
                    </div>
                  </div>

                  <div className="row mb-4">
                    <label
                      htmlFor="price"
                      className="col-sm-3 col-form-label form-label"
                    >
                      Price
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        name="price"
                        id="price"
                        placeholder="Price"
                        aria-label="Price"
                      />
                    </div>
                  </div>
                  <div className="row mb-4">
                    <label
                      htmlFor="count"
                      className="col-sm-3 col-form-label form-label"
                    >
                      Count
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        name="count"
                        id="count"
                        placeholder="Count"
                        aria-label="Count"
                      />
                    </div>
                  </div>
                  <div className="row mb-4">
                    <label
                      htmlFor="par"
                      className="col-sm-3 col-form-label form-label"
                    >
                      Par
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        name="par"
                        id="par"
                        placeholder="Par"
                        aria-label="Par"
                      />
                    </div>
                  </div>

                  <div className="row mb-4">
                    <label
                      htmlFor="options"
                      className="col-sm-3 col-form-label form-label"
                    >
                      Add More
                    </label>
                    <div className="col-sm-9">
                      {options.map((option, index) => (
                        <div key={index} className="input-group mb-2">
                          <input
                            type="text"
                            className="form-control"
                            name={`option-${index}`}
                            id={`option-${index}`}
                            placeholder="Option"
                            value={option}
                            onChange={(e) =>
                              handleOptionChange(index, e.target.value)
                            }
                          />
                          <button
                            type="button"
                            className="btn btn-outline-sm"
                            onClick={handleAddOption}
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-sm"
                            onClick={() => handleRemoveOption(index)}
                          >
                            <i className="fa-solid fa-x"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </form>
                <div className="card-footer pt-0">
                  <div className="d-flex justify-content-end gap-3 mt-2">
                    <button className="btn btn-sm btn-primary" type="submit">
                      Add Product
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
*/
}
