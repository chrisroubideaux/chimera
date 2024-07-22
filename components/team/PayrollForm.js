// Payroll form

export default function Form({}) {
  return (
    <div className="mt-3">
      <div className="col-lg-9">
        <div className="d-grid gap-3 gap-lg-5">
          <div className="card">
            <div className="card-header border-bottom">
              <h4 className="card-header-title">Payroll</h4>
            </div>
            <div className="card-body">
              <form>
                <div className="row mb-4"></div>
                <div className="row mb-4">
                  <label
                    htmlFor="firstNameLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Full name
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
                    htmlFor="homeLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Address
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="adreess"
                      className="form-control"
                      name="address"
                      id="addressLabel"
                      placeholder="1234 Main St"
                      aria-label="addresss"
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="input-group">
                    <label
                      htmlFor="cityLabel"
                      className="col-sm-3 col-form-label form-label"
                    >
                      City
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="City"
                      id="CityLabel"
                      placeholder="City"
                      aria-label="City"
                    />
                    <select id="inputState" className="form-select ">
                      <option selected>State</option>
                      <option>...</option>
                    </select>
                  </div>
                </div>

                <div className="row mb-4">
                  <label
                    htmlFor="firstNameLabel"
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
                      <input
                        type="text"
                        className="form-control"
                        name="ssn"
                        id="ssn"
                        placeholder="Social security"
                        aria-label="ssn"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <label
                    htmlFor="positionLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Position/Title
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="position"
                      id="positionLabel"
                      placeholder="Position/Title"
                      aria-label="Position"
                    />
                  </div>
                </div>

                <div className="row mb-4">
                  <label
                    htmlFor="firstNameLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Pay Period
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
                        placeholder="08/10/24"
                        aria-label="Last day"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <label
                    htmlFor="firstNameLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Wage
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
                        name="wage"
                        id="wageLabel"
                        placeholder="$28.00/hr"
                        aria-label="Hired"
                      />
                      <input
                        type="text"
                        className="form-control"
                        name="Lastday"
                        id="wageLabel"
                        placeholder="$28.00/hr"
                        aria-label="Last day"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <label
                    htmlFor="firstNameLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Hours/Breaks
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
                        name="wage"
                        id="wageLabel"
                        placeholder="$37.5 hrs"
                        aria-label="Wage"
                      />
                      <input
                        type="text"
                        className="form-control"
                        name="Lastday"
                        id="wageLabel"
                        placeholder=""
                        aria-label="Last day"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <label
                    htmlFor="directDepositLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Direct Deposit Information
                  </label>
                  <div className="col-sm-9">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        name="bankName"
                        id="bankNameLabel"
                        placeholder="Bank Name"
                        aria-label="Bank Name"
                      />
                      <input
                        type="text"
                        className="form-control"
                        name="accountNumber"
                        id="accountNumberLabel"
                        placeholder="Account Number"
                        aria-label="Account Number"
                      />
                      <input
                        type="text"
                        className="form-control"
                        name="routingNumber"
                        id="routingNumberLabel"
                        placeholder="Routing Number"
                        aria-label="Routing Number"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <label
                    htmlFor="payDateLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Payment Total
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="total"
                      id="payDateLabel"
                      placeholder="Payment Total"
                      aria-label="Payment Total"
                    />
                  </div>
                </div>

                <div className="row mb-4">
                  <label
                    htmlFor="payDateLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Pay Date
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="payDate"
                      id="payDateLabel"
                      placeholder="Pay Date"
                      aria-label="Pay Date"
                    />
                  </div>
                </div>
              </form>
              <div className="card-footer pt-0">
                <div className="d-flex justify-content-end gap-3 mt-2">
                  <a className="btn btn-sm" href="#!">
                    Process Payment
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
