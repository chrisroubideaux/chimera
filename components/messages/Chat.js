// Chat component
import Link from 'next/link';

export default function Chat() {
  return (
    <div className="chat-container mt-3">
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
                    <h6 className="mb-0 mt-1">Name: Here</h6>
                    <div className="small text-secondary">
                      <i className="fa-solid fa-circle text-success me-1"></i>
                      Online
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <a
                    href="#!"
                    className="icon-md me-2 px-2"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="View All Messages"
                  >
                    <i className="social-icon fa-solid fa-comments"></i>
                  </a>
                  <a
                    href="#!"
                    className="icon-md me-2 px-2"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Video call"
                  >
                    <i className="social-icon fa-solid fa-video"></i>
                  </a>

                  <a
                    href="#!"
                    className="icon-md me-2 px-2"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Start New Chat"
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
                        <Link className="dropdown-item" href="/profile/profile">
                          <i className="social-icon fs-6 fa-solid fa-user-check"></i>
                          Profile
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

              <div className="chat-conversation-content custom-scrollbar">
                <div className="text-center small my-2">
                  Jul 16, 2022, 06:15 am
                </div>

                <div className="d-flex mb-1">
                  <div className="flex-shrink-0 avatar avatar-xs me-2">
                    <img
                      className="avatar-img rounded-circle"
                      src="assets/images/avatar/10.jpg"
                      alt=""
                    />
                  </div>
                  <div className="flex-grow-1">
                    <div className="w-100">
                      <div className="d-flex flex-column align-items-start">
                        <div className="bg-light text-secondary p-2 px-3 rounded-2">
                          This is placeholder text for messages project
                          chimera😊
                        </div>
                        <div className="small my-2">6:15 AM</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-end text-end mb-1">
                  <div className="w-100">
                    <div className="d-flex flex-column align-items-end">
                      <div className="bg-primary text-white p-2 px-3 rounded-2">
                        This is a test response for project chimera
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr />

              <form className="chat-input-form">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type a message"
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
