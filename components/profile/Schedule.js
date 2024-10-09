// Schedule component
import Link from 'next/link';

export default function Schedule({ setActiveComponent }) {
  return (
    <div>
      <div className="mt-3">
        <div className="chat-container ">
          <div className="card card-chat rounded-start-lg-0 border-start-lg-0">
            <div className="card-body h-100">
              <div className="tab-content py-0 mb-0 h-100" id="chatTabsContent">
                <div
                  className="fade tab-pane show active h-100"
                  id="chat-1"
                  role="tabpanel"
                  aria-labelledby="chat-1-tab"
                >
                  <div className="d-sm-flex justify-content-between align-items-center">
                    <div className="d-flex mb-2 mb-sm-0">
                      <div className="flex-shrink-0 avatar me-2">
                        <img
                          className="avatar-img rounded-circle"
                          src="assets/images/avatar/10.jpg"
                          alt=""
                        />
                      </div>
                      <div className="d-block flex-grow-1">
                        <h6 className="mb-0 mt-1 fw-bold d-flex px-1">
                          Up comming shifts: 06/25/2024
                        </h6>
                      </div>
                    </div>
                    <div>
                      <h6 className="fw-bold me-2 px-2">
                        Total Hours
                        <i className=" social-icon fa-solid fa-hourglass-end"></i>
                      </h6>
                    </div>
                  </div>

                  <hr />

                  {/*test */}
                  <div className="">
                    <div className="list-group" style={{ width: '50rem' }}>
                      <label className="list-group-item d-flex gap-3">
                        <span className="pt-1 form-checked-content">
                          <strong className="d-flex me-5 ">06/25/2024</strong>
                          <h5 className="d-block  ">
                            <i className="social-icon fa-solid fa-calendar-days me-1 "></i>
                            Monday: 1:00–2:00pm
                          </h5>
                        </span>
                      </label>
                      <label className="list-group-item d-flex gap-3">
                        <span className="pt-1 form-checked-content">
                          <strong className="d-flex me-5">06/25/2024</strong>
                          <h5 className="d-block  ">
                            <i className="social-icon fa-solid fa-calendar-days me-1 "></i>
                            Monday: 1:00–2:00pm
                          </h5>
                        </span>
                      </label>
                      <label className="list-group-item d-flex gap-3">
                        <span className="pt-1 form-checked-content">
                          <strong className="d-flex me-5">06/25/2024</strong>
                          <h5 className="d-block  ">
                            <i className="social-icon fa-solid fa-calendar-days me-1 "></i>
                            Monday: 1:00–2:00pm
                          </h5>
                        </span>
                      </label>
                      <label className="list-group-item d-flex gap-3 bg-body-tertiary">
                        <span className="pt-1 form-checked-content">
                          <strong className="d-flex me-5">06/25/2024</strong>
                          <h5 className="d-block  ">
                            <i className="social-icon fa-solid fa-calendar-days me-1 "></i>
                            Monday: 1:00–2:00pm
                          </h5>
                        </span>
                      </label>
                      <label className="list-group-item d-flex gap-3 bg-body-tertiary">
                        <span className="pt-1 form-checked-content">
                          <strong className="d-flex me-5">06/25/2024</strong>
                          <h5 className="d-block  ">
                            <i className="social-icon fa-solid fa-calendar-days me-1 "></i>
                            Monday: 1:00–2:00pm
                          </h5>
                        </span>
                      </label>
                      <label className="list-group-item d-flex gap-3 bg-body-tertiary">
                        <span className="pt-1 form-checked-content">
                          <strong className="d-flex me-5">06/25/2024</strong>
                          <h5 className="d-block  ">
                            <i className="social-icon fa-solid fa-calendar-days me-1 "></i>
                            Monday: 1:00–2:00pm
                          </h5>
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
