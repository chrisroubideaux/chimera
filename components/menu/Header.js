// Header component
import { ParallaxBanner } from 'react-scroll-parallax';
import Typewriter from 'typewriter-effect';
import Link from 'next/link';

export default function Header() {
  return (
    <div className="mt-2 container-fluid">
      <ParallaxBanner
        layers={[
          {
            image: '/images/hero/hero5.png',
            speed: -20,
          },
        ]}
        className="aspect-[2/1]"
        style={{
          height: '100vh',
          borderRadius: '10px',
          boxShadow: '0 0 20px 0 rgb(0 0 0 / 30%)',
        }}
      >
        <div className="position-absolute start-0 end-0">
          <div className="container pt-5 mt-5">
            <div className="row">
              <div className="col-xl-5 col-lg-7 col-12 " data-cue="zoomIn">
                <div className="text-center text-lg-start">
                  <div className="mb-4 text-white-stable">
                    <h2 className="mb-3 display-3 mt-3 fw-bold text-light">
                      <Typewriter
                        options={{
                          strings: ['  Wecome to Chimera AI.'],
                          autoStart: true,
                          loop: true,
                        }}
                      />
                    </h2>
                    <p className="lead text-light mb-0">
                      cutting-edge application designed to streamline business
                      operations by tracking sales and automating inventory
                      management.Using advanced AI techniques such as machine
                      learning and deep learning, Chimera provides accurate
                      sales projections, helping businesses stay ahead of market
                      trends.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container d-flex flex-column flex-sm-row align-items-center justify-content-between position-relative zindex-5 pb-5">
            <div className="d-flex mb-4 mb-sm-0">
              <Link href="/" className=" me-3">
                <i className="social-icons fa-brands fa-facebook mt-1"></i>
              </Link>
              <Link href="#!" className=" me-3">
                <i className="social-icons fa-brands fa-linkedin mt-1"></i>
              </Link>
              <Link href="https://github.com/chrisroubideaux" className="me-2">
                <i className="social-icons fa-brands fa-github mt-1"></i>
              </Link>
            </div>
          </div>
        </div>
      </ParallaxBanner>
    </div>
  );
}
