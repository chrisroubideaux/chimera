// form component

import { format } from 'date-fns';
export default function Form() {
  const today = format(new Date(), 'MM/dd/yyyy');
  return (
    <>
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
    </>
  );
}
