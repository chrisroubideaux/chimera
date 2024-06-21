// test compoent for date picker
import { useState } from 'react';
import { format } from 'date-fns';

const today = format(new Date(), 'MM/dd/yyyy');

export default function CreateEvent() {
  const [selectedDate, setSelectedDate] = useState(today);

  return (
    <div>
      <div
        className="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalToggleLabel">
                Modal 1
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option selected>Create Event</option>
                  <option value="1">Video Call</option>
                  <option value="2">Meeting</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div className="mt-2">
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option selected>Select Time</option>
                  <option value="1">10:00 AM</option>
                  <option value="2">2:00 PM</option>
                  <option value="3">5:00 PM</option>
                </select>
              </div>
              <div className="mt-2">
                <button
                  type="button"
                  className="btn btn-md w-100 d-flex align-items-center"
                  data-bs-target="#exampleModalToggle2"
                  data-bs-toggle="modal"
                >
                  <i className="fa-solid fa-calendar-days me-2"></i>
                  {selectedDate}
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                data-bs-target="#exampleModalToggle2"
                data-bs-toggle="modal"
              >
                Open second modal
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalToggleLabel2">
                Modal 2
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Hide this modal and show the first with the button below.
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                data-bs-target="#exampleModalToggle"
                data-bs-toggle="modal"
              >
                Back to first
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        className="btn btn-md"
        data-bs-target="#exampleModalToggle"
        data-bs-toggle="modal"
      >
        Create Event
        <i className=" m-1 fa-solid fa-calendar-plus"></i>
      </button>
    </div>
  );
}

{
  /*
import { format } from 'date-fns';
const today = format(new Date(), 'MM/dd/yyyy');

export default function TestEvent() {
  return (
    <div>
      <div
        class="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabindex="-1"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalToggleLabel">
                Modal 1
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div>
                <select class="form-select" aria-label="Default select example">
                  <option selected>Create Event</option>
                  <option value="1">Video Call</option>
                  <option value="2">Meeting</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div className="mt-2">
                <select class="form-select" aria-label="Default select example">
                  <option selected>Select Time</option>
                  <option value="1"></option>
                  <option value="2">Meeting</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div className="mt-2">
                <form className="d-flex" style={{ width: '29rem' }}>
                  <div className="input-group">
                    <input
                      type="text"
                      input="type"
                      className="form-control"
                      id="dash-daterange"
                      value={today}
                      readOnly
                    />
                    <button
                      type="button"
                      className="input-group-text bg-sm"
                      data-bs-target="#exampleModalToggle"
                      data-bs-toggle="modal"
                    >
                      <i className="social-icon fa-solid fa-calendar-days"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-primary"
                data-bs-target="#exampleModalToggle2"
                data-bs-toggle="modal"
              >
                Open second modal
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabindex="-1"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">
                Modal 2
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              Hide this modal and show the first with the button below.
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-primary"
                data-bs-target="#exampleModalToggle"
                data-bs-toggle="modal"
              >
                Back to first
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        class="btn btn-md"
        data-bs-target="#exampleModalToggle"
        data-bs-toggle="modal"
      >
        Create Event
        <i className=" m-1 fa-solid fa-calendar-plus"></i>
      </button>
    </div>
  );
}

*/
}
