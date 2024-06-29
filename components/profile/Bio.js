// Bio component

export default function Bio() {
  return (
    <div className="mt-3">
      <div className="col-lg-9">
        <div className="d-grid gap-3 gap-lg-5">
          <div className="card">
            <div className="card-header border-bottom">
              <h4 className="card-header-title">Basic info</h4>
            </div>
            <div className="card-body">
              <form>
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Profile photo
                  </label>
                  <div className="col-sm-9">
                    <div className="d-flex align-items-center"></div>
                  </div>
                </div>

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
                        placeholder="Clarice"
                        aria-label="Clarice"
                      />
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        id="lastNameLabel"
                        placeholder="Boone"
                        aria-label="Boone"
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
                  <label className="col-sm-3 col-form-label form-label">
                    BIO
                  </label>
                  <div className="col-sm-9">
                    <div className="quill-custom">
                      <div
                        className="js-quill"
                        style={{ height: '15rem' }}
                        data-hs-quill-options='{
                      "placeholder": "Type your message...",
                      "modules": {
                        "toolbar": [
                          ["bold", "italic", "underline", "strike", "link", "image", "blockquote", "code", {"list": "bullet"}]
                        ]
                      }
                    }'
                      ></div>
                    </div>
                  </div>
                </div>
              </form>
              <div className="card-footer pt-0">
                <div className="d-flex justify-content-end gap-3">
                  <a className="btn btn-md" href="#!">
                    Edit Profile
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

{
  /*
export default function Bio() {
  return (
    <div className="mt-3">
      <h4 class="card-header-title">Basic info</h4>
      <form class="row g-3">
        <div class="col-md-6">
          <label for="inputEmail4" className="form-label">
            First Name
          </label>
          <input type="email" className="form-control" id="inputEmail4" />
          <label for="inputAddress" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="Email"
          />
        </div>
        <div className="col-md-6">
          <label for="inputPassword4" className="form-label">
            Last Name
          </label>
          <input type="password" className="form-control" id="inputPassword4" />
          <label for="inputAddress" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="Email"
          />
          <label for="inputAddress" className="form-label">
            Email
          </label>
        </div>
        <div className="col-12">
          <label for="inputAddress" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="Email"
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-md">
            Edit Profile
          </button>
        </div>
      </form>
    </div>
  );
}

*/
}
