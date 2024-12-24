// Banner component
import { ParallaxBanner } from 'react-scroll-parallax';

export default function Banner() {
  return (
    <div className="container-fluid">
      <div className="row mb-90 mt-5 h-100">
        <div className="col-lg-6 offset-lg-3 text-center px-lg-50">
          <h2 className="mb-25 px-lg-10" data-show="startbox">
            Helping your bussiness grow
          </h2>
          <p className="m-0 fs-5" data-show="startbox" data-show-delay="100">
            Chimera AI offers seamless team collaboration, allowing users to
            book meetings, setup video calls and coordinate efficiently.
          </p>
        </div>
      </div>
      <div className="mt-5 container-fluid pt-5">
        <ParallaxBanner
          layers={[
            {
              image: '/images/hero/hero6.png',
              speed: -20,
            },
          ]}
          className="aspect-[2/1]"
          style={{
            height: '19rem',
            borderRadius: '10px',
            boxShadow: '0 0 20px 0 rgb(0 0 0 / 30%)',
          }}
        >
          <div className="position-absolute start-0 end-0">
            <div
              className="container pt-5 mt-5 d-flex align-items-center justify-content-center"
              style={{ height: '100%' }}
            >
              <div className="row gy-40 text-center">
                <div className="col-12 col-sm-6 col-lg-3" data-show="startbox">
                  <div className="h1 m-0 text-white">328</div>
                  <div className="h6 mb-15 text-white">Successful projects</div>
                  <p className="font-size-15 m-0 text-white">
                    You every can't thing seed subdue subdue light female.
                  </p>
                </div>
                <div
                  className="col-12 col-sm-6 col-lg-3"
                  data-show="startbox"
                  data-show-delay="100"
                >
                  <div className="h1 m-0 text-white">10+</div>
                  <div className="h6 mb-15 text-white">Years of experience</div>
                  <p className="font-size-15 m-0 text-white">
                    Called a fly, behold seasons meat which stars bring fruit.
                  </p>
                </div>
                <div
                  className="col-12 col-sm-6 col-lg-3"
                  data-show="startbox"
                  data-show-delay="200"
                >
                  <div className="h1 m-0 text-white">68%</div>
                  <div className="h6 mb-15 text-white">Cost savings</div>
                  <p className="font-size-15 m-0 text-white">
                    Image isn't that give appear made us you're yielding.
                  </p>
                </div>
                <div
                  className="col-12 col-sm-6 col-lg-3"
                  data-show="startbox"
                  data-show-delay="300"
                >
                  <div className="h1 m-0 text-white">1k</div>
                  <div className="h6 mb-15 text-white">
                    Email leads generated
                  </div>
                  <p className="font-size-15 m-0 text-white">
                    Fruit deep first cattle set fourth without and day subdue.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ParallaxBanner>
      </div>
    </div>
  );
}

{
  /*
import { ParallaxBanner } from 'react-scroll-parallax';
//import Typewriter from 'typewriter-effect';

export default function Banner() {
  return (
    <div className="mt-5 container-fluid pt-5">
      <ParallaxBanner
        layers={[
          {
            image: '/images/hero/hero5.png',
            speed: -20,
          },
        ]}
        className="aspect-[2/1]"
        style={{
          height: '19rem',
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
                    <h1 className="mb-3 display-3 mt-3 fw-bold text-light"></h1>
                    <div className="container">
                      <div className="row gy-40">
                        <div
                          className="col-12 col-sm-6 col-lg-3"
                          data-show="startbox"
                        >
                          <div className="h1 m-0 text-white">328</div>
                          <div className="h6 mb-15 text-white">
                            Successful projects
                          </div>
                          <p className="font-size-15 m-0 text-white">
                            You every can't thing seed subdue subdue light
                            female.
                          </p>
                        </div>
                        <div
                          className="col-12 col-sm-6 col-lg-3"
                          data-show="startbox"
                          data-show-delay="100"
                        >
                          <div className="h1 m-0 text-white">10+</div>
                          <div className="h6 mb-15 text-white">
                            Years of exeperience
                          </div>
                          <p className="font-size-15 m-0 text-white">
                            Called a fly, behold seasons meat which stars bring
                            fruit.
                          </p>
                        </div>
                        <div
                          className="col-12 col-sm-6 col-lg-3"
                          data-show="startbox"
                          data-show-delay="200"
                        >
                          <div className="h1 m-0 text-white">68%</div>
                          <div className="h6 mb-15 text-white">
                            Cost savings
                          </div>
                          <p className="font-size-15 m-0 text-white">
                            Image isn't that give appear made us you're
                            yielding.
                          </p>
                        </div>
                        <div
                          className="col-12 col-sm-6 col-lg-3"
                          data-show="startbox"
                          data-show-delay="300"
                        >
                          <div className="h1 m-0 text-white">1k</div>
                          <div className="h6 mb-15 text-white">
                            Email leads generated
                          </div>
                          <p className="font-size-15 m-0 text-white">
                            Fruit deep first cattle set fourth without and day
                            subdue.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
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
import { ParallaxBanner } from 'react-scroll-parallax';
//import Typewriter from 'typewriter-effect';

export default function Banner() {
  return (
    <div className="mt-5 container-fluid pt-5">
      <ParallaxBanner
        layers={[
          {
            image: '/images/hero/hero5.png',
            speed: -20,
          },
        ]}
        className="aspect-[2/1]"
        style={{
          height: '19rem',
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
                    <h1 className="mb-3 display-3 mt-3 fw-bold text-light">
                     
                    </h1>
                    <div className="container">
                      <div className="row gy-40">
                        <div
                          className="col-12 col-sm-6 col-lg-3"
                          data-show="startbox"
                        >
                          <div className="h1 m-0 text-white">328</div>
                          <div className="h6 mb-15 text-white">
                            Successful projects
                          </div>
                          <p className="font-size-15 m-0 text-white">
                            You every can't thing seed subdue subdue light
                            female.
                          </p>
                        </div>
                        <div
                          className="col-12 col-sm-6 col-lg-3"
                          data-show="startbox"
                          data-show-delay="100"
                        >
                          <div className="h1 m-0 text-white">10+</div>
                          <div className="h6 mb-15 text-white">
                            Years of exeperience
                          </div>
                          <p className="font-size-15 m-0 text-white">
                            Called a fly, behold seasons meat which stars bring
                            fruit.
                          </p>
                        </div>
                        <div
                          className="col-12 col-sm-6 col-lg-3"
                          data-show="startbox"
                          data-show-delay="200"
                        >
                          <div className="h1 m-0 text-white">68%</div>
                          <div className="h6 mb-15 text-white">
                            Cost savings
                          </div>
                          <p className="font-size-15 m-0 text-white">
                            Image isn't that give appear made us you're
                            yielding.
                          </p>
                        </div>
                        <div
                          className="col-12 col-sm-6 col-lg-3"
                          data-show="startbox"
                          data-show-delay="300"
                        >
                          <div className="h1 m-0 text-white">1k</div>
                          <div className="h6 mb-15 text-white">
                            Email leads generated
                          </div>
                          <p className="font-size-15 m-0 text-white">
                            Fruit deep first cattle set fourth without and day
                            subdue.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ParallaxBanner>
    </div>
  );
}
*/
}
