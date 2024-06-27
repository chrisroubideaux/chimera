// test component

import { useState } from 'react';
import Image from 'next/image';
import Calendar from './Calendar';

export default function Bookings({}) {
  return (
    <>
      <div
        className="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabindex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="fw-normal fs-5" id="exampleModalToggleLabel">
                Create Event
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <a data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">
                <Calendar />
              </a>
            </div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabindex="-1"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h6 className=" fs-5" id="exampleModalToggleLabel2">
                Select a time
              </h6>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="">
                <div className="list-group-item list-group-item-action d-flex gap-3 py-3 ">
                  <Image
                    src=""
                    className=" avatar"
                    width={200}
                    height={100}
                    alt="..."
                  />

                  <div className="d-flex gap-2 w-100 justify-content-between mt-1 ">
                    <div className="">
                      <h6 className="fs-5 me-2">name</h6>
                      <h6 className="">name</h6>
                      <h6 className="">times</h6>
                    </div>

                    <small className="opacity-50 text-nowrap">
                      <h6 className="">time one</h6>
                      <select>
                        <option value="1">time one</option>
                        <option value="2">time one</option>
                        <option value="3">time one</option>
                        <option value="4">time one</option>
                        <option value="5">time one</option>
                        <option value="6">time one</option>
                        <option value="7">time one</option>
                      </select>
                    </small>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-md"
                data-bs-target="#exampleModalToggle"
                data-bs-toggle="modal"
              >
                back to calendar
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        className="btn btn-sm"
        data-bs-target="#exampleModalToggle"
        data-bs-toggle="modal"
      >
        Create Event
        <i className=" m-1 fa-solid fa-calendar-plus"></i>
      </button>
    </>
  );
}
