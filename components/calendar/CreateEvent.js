// create event component

import Form from './Form';

export default function CreateEvent() {
  return (
    <>
      <button
        type="button"
        className="btn btn-md"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Create Event
        <i className=" m-1 fa-solid fa-calendar-plus"></i>
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
                Add Event
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <Form />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-md"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button type="button" className="btn btn-md">
                Add Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
