// Form component

const Form = () => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100 mt-3">
        <div className="card" style={{ width: '30rem' }}>
          <h5 className="text-center mt-2">Add Product</h5>
          <form className="form w-70">
            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <input
                type="text"
                className="form-control"
                id="category"
                //value={category}
                //onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
                //onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="item" className="form-label">
                Item Name
              </label>
              <input
                type="text"
                className="form-control"
                id="item"
                //value={item}
                //onChange={(e) => setItem(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                // value={price}
                // onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                //value={description}
                //onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <a
              type="button"
              className="btn btn-sm "
              href="#"
              //onClick={() => setActiveComponent('Form')}
            >
              <i className="fa-solid fa-plus"></i> New Product
            </a>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
