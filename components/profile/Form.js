// Form component

export default function Form({}) {
  return (
    <div className="mt-3">
      <div className="col-lg-9">
        <div className="d-grid gap-3 gap-lg-5">
          <div className="card">
            <div className="card-header border-bottom">
              <h4 className="card-header-title">Request Time Off</h4>
            </div>
            <div className="card-body">
              <form>
                <div className="row mb-4"></div>
                <div className="row mb-4">
                  <label
                    htmlFor="firstNameLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Full name{' '}
                    <i
                      className="bi-question-circle text-body ms-1"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Displayed on public forums, such as Front."
                    ></i>
                  </label>
                  <div className="col-sm-9">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        id="firstNameLabel"
                        placeholder="First Name"
                        aria-label="First Name"
                      />
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        id="lastNameLabel"
                        placeholder="Last Name"
                        aria-label="Last Name"
                      />
                    </div>
                  </div>
                </div>

                <div className="row mb-4">
                  <label
                    htmlFor="emailLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Email
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="emailLabel"
                      placeholder="email@example.com"
                      aria-label="emaile@example.com"
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label
                    htmlFor="emailLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Phone
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="phone"
                      className="form-control"
                      name="phone"
                      id="emailLabel"
                      placeholder="xxx-xxx-xxxx"
                      aria-label="phone"
                    />
                  </div>
                </div>

                <div className="row mb-4">
                  <label
                    htmlFor="employeeIDLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Employee ID/ssn
                    <i
                      className="bi-question-circle text-body ms-1"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title=""
                    ></i>
                  </label>
                  <div className="col-sm-9">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        name="Employee ID"
                        id="employeeLabel"
                        placeholder="Employee ID"
                        aria-label="Employee ID"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <label
                    htmlFor="employeeIDLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Request Type
                    <i
                      className="bi-question-circle text-body ms-1"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title=""
                    ></i>
                  </label>
                  <div className="col-sm-9">
                    <div className="input-group">
                      <select
                        className="form-select fw-normal"
                        aria-label="Default select example"
                      >
                        <option className="" selected>
                          Request Type
                        </option>
                        <option value="2">Vacation</option>
                        <option value="3">P.T.O</option>
                        <option value="3">Personal</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <label
                    htmlFor="firstNameLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    From/To
                    <i
                      className="bi-question-circle text-body ms-1"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title=""
                    ></i>
                  </label>
                  <div className="col-sm-9">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        name="hired"
                        id="hiredLabel"
                        placeholder="07/22/24"
                        aria-label="Hired"
                      />
                      <input
                        type="text"
                        className="form-control"
                        name="Lastday"
                        id="lastDayLabel"
                        placeholder="07/22/24"
                        aria-label="Last day"
                      />
                    </div>
                  </div>
                </div>
              </form>
              <div className="card-footer pt-0">
                <div className="d-flex justify-content-end gap-3 mt-2">
                  <a className="btn btn-sm" href="#!">
                    Submit
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
