// Details component

export default function Details() {
  return (
    <div className="pt-120 pb-130 pt-5 mt-4">
      {/*
      <div className="container  ">
        <div className="row mb-90 mt-5">
          <div className="col-lg-6 offset-lg-3 text-center px-lg-50">
            <h2 className="mb-25 px-lg-10" data-show="startbox">
              Why choose Chimera AI?
            </h2>
            <p className="m-0 fs-5 " data-show="startbox" data-show-delay="100">
              Chimera AI provides accurate sales projections, helping businesses
              stay ahead of market trends.
            </p>
          </div>
        </div>
      </div>
        */}
      <div className="container pt-5 mt-5">
        <div className="row gy-60 align-items-center mt-5 pt-5">
          <div className="col-12 col-lg-6">
            <div className="gallery-wrapper pe-lg-70" data-show="startbox">
              <a
                className="gallery-item rounded-4 overflow-hidden"
                style={{
                  '--img-height': '110%',
                  display: 'inline-block',
                  borderRadius: '10px',
                }}
                data-img-height
              >
                <img
                  loading="lazy"
                  src="../../images/hero/hero4.png"
                  alt=""
                  style={{
                    width: '400px',
                    height: '500px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                  }}
                />
              </a>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <h3 className="mb-45" data-show="startbox">
              Business Logic
            </h3>
            <p className="mb-60" data-show="startbox" data-show-delay="100">
              Chimera AI helps businesses integrate smart decision-making by
              analyzing vast amounts of sales data with machine learning
              algorithms. It predicts trends and provides insights to optimize
              business operations.
            </p>

            <div className="row gy-40">
              <div className="col-12 col-lg-6" data-show="startbox">
                <ul className="list-unstyled fw-medium font-size-15">
                  <li className="active">
                    <i className="social-icons fa-solid fa-circle-check"></i>{' '}
                    Seamlessly track sales data from multiple sources.
                  </li>
                </ul>
              </div>
              <div
                className="col-12 col-lg-6"
                data-show="startbox"
                data-show-delay="100"
              >
                <ul className="list-unstyled fw-medium font-size-15">
                  <li className="active">
                    <i className="social-icons fa-solid fa-circle-check"></i>{' '}
                    Leverage machine learning algorithms to predict sales
                    trends.
                  </li>
                </ul>
              </div>
              <div className="col-12 col-lg-6" data-show="startbox">
                <ul className="list-unstyled fw-medium font-size-15">
                  <li className="active">
                    <i className="social-icons fa-solid fa-circle-check"></i>{' '}
                    Automate inventory management by syncing sales data.
                  </li>
                </ul>
              </div>
              <div
                className="col-12 col-lg-6"
                data-show="startbox"
                data-show-delay="100"
              >
                <ul className="list-unstyled fw-medium font-size-15">
                  <li className="active">
                    <i className="social-icons fa-solid fa-circle-check"></i>{' '}
                    Empower your sales team with real-time insights and
                    analytics.
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-45" data-show="startbox">
              <a
                className="btn btn-sm"
                href="service-single.html"
                target="_self"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
