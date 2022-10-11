import React from "react";

export default function Home(){

    return(
        <div>
        {/* Basic */}
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {/* Mobile Metas */}
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        {/* Site Metas */}
        <meta name="keywords" content />
        <meta name="description" content />
        <meta name="author" content />
        <title>Birdim</title>
        {/* slider stylesheet */}
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.1.3/assets/owl.carousel.min.css" />
        {/* bootstrap core css */}
        <link rel="stylesheet" type="text/css" href="css/bootstrap.css" />
        {/* fonts style */}
        <link href="https://fonts.googleapis.com/css?family=Poppins:400,700|Roboto:400,700&display=swap" rel="stylesheet" />
        {/* Custom styles for this template */}
        <link href="css/style.css" rel="stylesheet" />
        {/* responsive style */}
        <link href="css/responsive.css" rel="stylesheet" />
        <div className="hero_area">
          {/* header section strats */}
          <header className="header_section">
            <div className="container-fluid">
              <nav className="navbar navbar-expand-lg custom_nav-container">
                <a className="navbar-brand" href="index.html">
                  <img src="images/logo.png" alt="" />
                  <span>
                    Birdim
                  </span>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <div className="d-flex  flex-column flex-lg-row align-items-center">
                    <ul className="navbar-nav  ">
                      <li className="nav-item active">
                        <a className="nav-link" href="index.html">Home <span className="sr-only">(current)</span></a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="crud2.php"> Register</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="login.php"> Login </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">Donate </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="contact.html">Contact Us</a>
                      </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0 ml-0 ml-lg-4 mb-3 mb-lg-0">
                      <button className="btn  my-2 my-sm-0 nav_search-btn" type="submit" />
                    </form>
                  </div>
                </div>
                <div>
                  <div className="custom_menu-btn ">
                    <button>
                      <span className=" s-1">
                      </span>
                      <span className="s-2">
                      </span>
                      <span className="s-3">
                      </span>
                    </button>
                  </div>
                </div>
              </nav>
            </div>
          </header>
          {/* end header section */}
          {/* slider section */}
          <section className=" slider_section ">
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
              <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active indicator-li-1">01</li>
                <li data-target="#carouselExampleIndicators" data-slide-to={1}>02</li>
              </ol>
              <ol className="carousel-indicators indicator-2">
                <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active indicator-li-1">01</li>
                <li data-target="#carouselExampleIndicators" data-slide-to={1}>02</li>
              </ol>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-6 col-md-10">
                        <div className="detail-box">
                          <h1>
                            Productos <span>Nuevos</span> <br />
                            Productos <span>Nuevos</span>
                          </h1>
                          <p>
                            Revise lo mas nuevo
                          </p>
                          <div className="btn-box">
                            <a href className="btn-1">
                              About Us
                            </a>
                            <a href className="btn-2">
                              Donate Now
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-2">
                        <div className="img-box">
                          <div className="play_btn">
                            <a href>
                              <img src="images/play.png" alt="" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item ">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-6 ">
                        <div className="detail-box">
                          <h1>
                            Productos <span>Nuevos</span> <br />
                            Productos <span>Nuevos</span>
                          </h1>
                          <p>
                            REvise lo mas nuevo.
                          </p>
                          <div className="btn-box">
                            <a href className="btn-1">
                              About Us
                            </a>
                            <a href className="btn-2">
                              Donate Now
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="img-box">
                          <div className="play_btn">
                            <a href>
                              <img src="images/play.png" alt="" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel_btn-container">
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                  <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
          </section>
          {/* end slider section */}
        </div>
        {/* arrival section */}
        <section className="arrival_section layout_padding">
          <div className="container">
            <div className="heading_container">
              <h2>
                New <span>Arrival</span>
              </h2>
            </div>
            <p>
              There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration There
              are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration
            </p>
            <div className="carousel-wrap layout_padding2-top ">
              <div className="owl-carousel">
                <div className="item">
                  <div className="content">
                    <div className="img-box">
                      <img src="images/cat.png" alt="" />
                    </div>
                    <div className="detail-box">
                      <h5>
                        Cat
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="content">
                    <div className="img-box">
                      <img src="images/bird.png" alt="" />
                    </div>
                    <div className="detail-box">
                      <h5>
                        bird
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="content">
                    <div className="img-box">
                      <img src="images/lion.png" alt="" />
                    </div>
                    <div className="detail-box">
                      <h5>
                        Lion
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="content">
                    <div className="img-box">
                      <img src="images/deer.png" alt="" />
                    </div>
                    <div className="detail-box">
                      <h5>
                        Deer
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="content">
                    <div className="img-box">
                      <img src="images/dove-orange.png" alt="" />
                    </div>
                    <div className="detail-box">
                      <h5>
                        Dove
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* end arrival section */}
        {/* about section */}
        <section className="about_section layout_padding">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="detail-box">
                  <div className="heading_container">
                    <h2>
                      <span>About</span> Our Birds
                    </h2>
                  </div>
                  <p>
                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration
                    in some form, by injected humour, or randomised words which don't look even slightly believable. If you
                    are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in
                    the middle of text.
                  </p>
                  <div>
                    <a href>
                      Read More
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="img-box">
                  <img src="images/about-img.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* end about section */}
        {/* gallery section */}
        <section className="gallery_section layout_padding">
          <div className="container">
            <div className="heading_container">
              <h2>
                Our Birds And <span>Animals</span>
              </h2>
            </div>
            <p>
              There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in
              some form, by injected humour, or randomised words
            </p>
          </div>
          <div className="gallery_bg layout_padding">
            <div className="container">
              <div className="gallery_container ">
                <div className="box-1">
                  <div className="img-box b-1">
                    <img src="images/bird-1.jpg" alt="" />
                    <div className="btn-box">
                      <a href className="btn-1">
                      </a>
                      <a href className="btn-2">
                      </a>
                    </div>
                  </div>
                  <div className="img-box b-2">
                    <img src="images/bird-2.jpg" alt="" />
                    <div className="btn-box">
                      <a href className="btn-1">
                      </a>
                      <a href className="btn-2">
                      </a>
                    </div>
                  </div>
                </div>
                <div className="box-2">
                  <div className="box-2-top">
                    <div className="img-box b-3">
                      <img src="images/bird-3.jpg" alt="" />
                      <div className="btn-box">
                        <a href className="btn-1">
                        </a>
                        <a href className="btn-2">
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="box-2-btm">
                    <div className="box-2-left">
                      <div className="img-box b-4">
                        <img src="images/bird-4.jpg" alt="" />
                        <div className="btn-box">
                          <a href className="btn-1">
                          </a>
                          <a href className="btn-2">
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="box-2-right">
                      <div className="img-box b-5">
                        <img src="images/bird-5.jpg" alt="" />
                        <div className="btn-box">
                          <a href className="btn-1">
                          </a>
                          <a href className="btn-2">
                          </a>
                        </div>
                      </div>
                      <div className="img-box b-6">
                        <img src="images/bird-6.jpg" alt="" />
                        <div className="btn-box">
                          <a href className="btn-1">
                          </a>
                          <a href className="btn-2">
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <a href className="read_btn">
                  See More
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* end gallery section */}
        {/* client section */}
        <section className="client_section layout_padding-bottom">
          <div className="container">
            <div className="heading_container">
              <h2>
                Testimonial
              </h2>
            </div>
            <div className="layout_padding">
              <div id="carouselExample2Indicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                  <li data-target="#carouselExample2Indicators" data-slide-to={0} className="active" />
                  <li data-target="#carouselExample2Indicators" data-slide-to={1} />
                  <li data-target="#carouselExample2Indicators" data-slide-to={2} />
                </ol>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <div className="client_box">
                      <div className="img-box">
                        <img src="images/client.jpg" alt="" />
                      </div>
                      <div className="detail-box">
                        <h5>
                          Alex ilby
                        </h5>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                          et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                          culpa qui officia deserunt mollit anim id est laborum
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="client_box">
                      <div className="img-box">
                        <img src="images/client.jpg" alt="" />
                      </div>
                      <div className="detail-box">
                        <h5>
                          Alex ilby
                        </h5>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                          et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                          culpa qui officia deserunt mollit anim id est laborum
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="client_box">
                      <div className="img-box">
                        <img src="images/client.jpg" alt="" />
                      </div>
                      <div className="detail-box">
                        <h5>
                          Alex ilby
                        </h5>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                          et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                          culpa qui officia deserunt mollit anim id est laborum
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* end client section */}
        {/* subscribe section */}
        <section className="subscribe_section layout_padding">
          <div className="container">
            <h4>
              Subscribe Our Newsletter
            </h4>
            <form action>
              <input type="email" placeholder="Enter your email" />
              <button type="submit">
                subscribe
              </button>
            </form>
          </div>
        </section>
        {/* end subscribe section */}
        {/* contact section */}
        <section className="contact_section layout_padding-top">
          <div className="container">
            <div className="heading_container">
              <h2>
                Request A <span>Call Back</span>
              </h2>
            </div>
          </div>
          <div className="map_section layout_padding-top">
            <div className="map-responsive">
              <iframe src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=Eiffel+Tower+Paris+France" width={600} height={300} frameBorder={0} style={{border: 0, width: '100%'}} allowFullScreen />
            </div>
          </div>
          <div className="contact_box">
            <div className="row">
              <div className="col-md-6">
                <form action>
                  <div className="contact_form-container">
                    <div>
                      <div>
                        <input type="text" placeholder="Your Name" />
                      </div>
                      <div>
                        <input type="email" placeholder="Email" />
                      </div>
                      <div>
                        <input type="text" placeholder="Phone Number" />
                      </div>
                      <div className>
                        <input type="text" placeholder="Message" />
                      </div>
                      <div className=" d-flex justify-content-center justify-content-sm-start">
                        <button type="submit">
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-md-6">
                <div className="contact_info">
                  <a href>
                    <img src="images/location.png" alt="" />
                    <span>
                      It is a long established fact that
                    </span>
                  </a>
                  <a href>
                    <img src="images/phone.png" alt="" />
                    <span>
                      +1 1234567890
                    </span>
                  </a>
                  <a href>
                    <img src="images/mail.png" alt="" />
                    <span>
                      demo@gmail.com
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* end contact section */}
        {/* footer section */}
        <section className="container-fluid footer_section layout_padding2-top">
          <div className="social-box">
            <div>
              <a href>
                <img src="images/fb.png" alt="" />
              </a>
            </div>
            <div>
              <a href>
                <img src="images/twitter.png" alt="" />
              </a>
            </div>
            <div>
              <a href>
                <img src="images/linkedin.png" alt="" />
              </a>
            </div>
            <div>
              <a href>
                <img src="images/instagram.png" alt="" />
              </a>
            </div>
          </div>
          <div className="container">
            <p>
              © <span id="displayYear" /> All Rights Reserved By
              <a href="https://html.design/">Free Html Templates</a>
            </p>
          </div>
        </section>
        {/* footer section */}
      </div>
    );
}