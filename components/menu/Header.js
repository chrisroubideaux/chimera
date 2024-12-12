// Header component
import { ParallaxBanner } from 'react-scroll-parallax';

export default function Header() {
  return (
    <div className="mt-2 container-fluid">
      <ParallaxBanner
        layers={[
          {
            image: '/images/hero/hero5.png', // Ensure this image path is correct
            speed: -20, // Adjust speed for desired effect
          },
        ]}
        className="aspect-[2/1]" // Optional for responsive aspect ratio
        style={{
          height: '100vh', // Full viewport height
          borderRadius: '10px',
          boxShadow: '0 0 20px 0 rgb(0 0 0 / 30%)',
        }}
      >
        <div className="position-absolute start-0 end-0">
          <div className="container">
            <div className="row">
              <div className="col-xl-5 col-lg-7 col-12" data-cue="zoomIn">
                <div className="text-center text-lg-start">
                  <div className="mb-4 text-white-stable">
                    <h1 className="mb-3 mt-3 display-3 text-white-stable">
                      We build fast sites & apps.
                    </h1>
                    <p className="lead mb-0">
                      Block is an agency that designs and develops e-commerce,
                      marketing websites, web applications, and mobile apps.
                    </p>
                  </div>
                  <a href="#!" className="btn btn-primary">
                    Start project
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ParallaxBanner>
    </div>
  );
}

{
  /*
export default function Header() {
  return (
    <div className="mt-2 container-fluid">
      <section
        class="jarallax py-9 hero-agency"
        data-jarallax
        data-speed="0.4"
        style={{
          backgroundImage: 'url(../../images/hero/hero5.png)',
          height: '100vh',
          backgroundSize: 'cover',
          borderRadius: '10px',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          boxShadow: '0 0 20px 0 rgb(0 0 0 / 30%) ',
        }}
      >
        <div class="position-absolute start-0 end-0">
          <div class="container">
            <div class="row">
              <div class="col-xl-5 col-lg-7 col-12" data-cue="zoomIn">
                <div class="text-center text-lg-start">
                  <div class="mb-4 text-white-stable">
                    <h1 class="mb-3 mt-3 display-3 text-white-stable">
                      We build fast sites & apps.
                    </h1>
                    <p class="lead mb-0">
                      Block is an agency that designs and develops e-commerce,
                      marketing websites, web applications, and mobile apps.
                    </p>
                  </div>
                  <a href="#!" class="btn btn-primary">
                    Start project
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
*/
}
