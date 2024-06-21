// test compoent for date picker
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
