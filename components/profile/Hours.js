// Hours components
import Link from 'next/link';

export default function Hours() {
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
                          Hours worked as of: 06/25/2024
                        </h6>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <a
                        href="#!"
                        className="icon-md me-2 px-2"
                        title="Request time off"
                        onClick={() => setActiveComponent('Form')}
                      >
                        <i className="social-icon fa-solid fa-book"></i>
                      </a>
                      <a
                        href="#!"
                        className="icon-md me-2 px-2"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Calendar"
                        onClick={() => setActiveComponent('Calendar')}
                      >
                        <i className="social-icon fa-solid fa-calendar"></i>
                      </a>

                      <a
                        href="#!"
                        className="icon-md me-2 px-2"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Create new message"
                      >
                        <i className="social-icon fa-solid fa-square-pen"></i>
                      </a>
                      <div className="dropdown">
                        <a
                          className="icon-md rounded-circle me-2 px-2"
                          href="#"
                          id="chatcoversationDropdown"
                          role="button"
                          data-bs-toggle="dropdown"
                          data-bs-auto-close="outside"
                          aria-expanded="false"
                        >
                          <i className="social-icon fa-solid fa-ellipsis-vertical"></i>
                        </a>
                        <ul
                          className="dropdown-menu dropdown-menu-end"
                          aria-labelledby="chatcoversationDropdown"
                        >
                          <li>
                            <a className="dropdown-item" href="#">
                              <i className="social-icon fs-6 fa-solid fa-check"></i>
                              Mark as read
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              <i className="social-icon fa-solid fa-microphone-slash fs-6"></i>
                              Mute
                            </a>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item"
                              href="/messages/messages"
                            >
                              <i className="social-icon fs-6 fa-solid fa-user-check"></i>
                              View all
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="/">
                              <i className="social-icon fs-6 fa-solid fa-trash"></i>
                              Delete chat
                            </Link>
                          </li>
                          <li className="dropdown-divider"></li>
                          <li>
                            <Link className="dropdown-item" href="/">
                              <i className="social-icon fs-6 fa-solid fa-box-archive"></i>
                              Archive chat
                            </Link>
                          </li>
                        </ul>
                      </div>
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
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <h6 className="fw-bold">Week of Jun-23-2024</h6>
                      </div>
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
