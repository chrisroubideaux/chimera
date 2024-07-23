// Form component
import React, { useState } from 'react';

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

{
  /*

const Form = () => {
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
                      htmlFor="firstNameLabel"
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
                          aria-label=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <label
                      htmlFor="firstNameLabel"
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
                          aria-label=""
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <label
                      htmlFor="emailLabel"
                      className="col-sm-3 col-form-label form-label"
                    >
                      Image
                    </label>
                    <div className="col-sm-9">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          name="image"
                          id="image"
                          placeholder="Image"
                          aria-label=""
                        />
                        <img
                          className="avatar"
                          src="./assets/img/160x160/img9.jpg"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <label
                      htmlFor="descriptionLabel"
                      className="col-sm-3 col-form-label form-label"
                    >
                      Description
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="description"
                        className="form-control"
                        name="description"
                        id="description"
                        placeholder="Description"
                        aria-label="description"
                      />
                    </div>
                  </div>

                  <div className="row mb-4">
                    <label
                      htmlFor="homeLabel"
                      className="col-sm-3 col-form-label form-label"
                    >
                      Price
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="Price"
                        className="form-control"
                        name="Price"
                        id="price"
                        placeholder="Price"
                        aria-label="price"
                      />
                    </div>
                  </div>
                  <div className="row mb-4">
                    <label
                      htmlFor="countLabel"
                      className="col-sm-3 col-form-label form-label"
                    >
                      Count
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="Count"
                        className="form-control"
                        name="count"
                        id="count"
                        placeholder="Count"
                        aria-label="count"
                      />
                    </div>
                  </div>
                  <div className="row mb-4">
                    <label
                      htmlFor="parLabel"
                      className="col-sm-3 col-form-label form-label"
                    >
                      Par
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="Par"
                        className="form-control"
                        name="par"
                        id="par"
                        placeholder="Par"
                        aria-label="par"
                      />
                    </div>
                  </div>

                  <div className="row mb-4">
                    <label
                      htmlFor="emailLabel"
                      className="col-sm-3 col-form-label form-label"
                    >
                      Options
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="options"
                        className="form-control"
                        name="options"
                        id="options"
                        placeholder="Options"
                        aria-label="phone"
                      />
                    </div>
                  </div>
                </form>
                <div className="card-footer pt-0">
                  <div className="d-flex justify-content-end gap-3 mt-2">
                    <a className="btn btn-sm" href="#!">
                      Add Product
                    </a>
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
