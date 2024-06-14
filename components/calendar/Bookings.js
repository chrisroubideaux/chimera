// Bookings.js
import React from 'react';
import { format } from 'date-fns';
import Calendar from './Calendar';

export default function Bookings() {
  const today = format(new Date(), 'MM/dd/yyyy');
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
              <h1 className=" fs-5" id="exampleModalToggleLabel">
                Calendar
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <Calendar />
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-sm"
                data-bs-target="#exampleModalToggle2"
                data-bs-toggle="modal"
              >
                View Meetings
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
                className="btn btn-sm"
                data-bs-target="#exampleModalToggle"
                data-bs-toggle="modal"
              >
                Back to Calendar
              </button>
            </div>
          </div>
        </div>
      </div>

      <form className="d-flex" style={{ width: '14rem' }}>
        <div className="input-group">
          <input
            type="text"
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
  );
}
