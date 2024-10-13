// new message

export default function NewMessage() {
  return (
    <div>
      {/*modal*/}

      <button
        type="button"
        className="btn btn-sm bg-transparent me-1 px-2"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <i className="social-icon fa-solid fa-square-pen"></i>
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                New Message
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  To
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
            <div className="modal-footer">
              <form className="chat-input-form">
                <div className="input-group" style={{ width: '30rem' }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Message"
                  />
                  <button className="btn btn-primary" type="submit">
                    <i className="fa-solid fa-paper-plane"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
