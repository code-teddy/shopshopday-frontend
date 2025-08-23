import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const AboutUs = () => {
  return (
    <div className="about-us-page">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={10}>
            {/* Hero Section */}
            <div className="text-center mb-5">
              <h1 className="display-4 fw-bold text-primary mb-4">About ShopShopDay</h1>
            </div>

            {/* Main Content */}
            <Row className="g-5">
              <Col md={12}>
                <div className="content-section mb-5">
                  <p className="fs-5 text-muted mb-4">
                    Welcome to <strong>ShopShopDay</strong> – Hong Kong's premier destination for cutting-edge electronics and technology solutions. Since our establishment, we have been committed to bringing you the latest and greatest in mobile phones, computers, photography equipment, audio-visual gear, and much more.
                  </p>
                </div>

                {/* What We Offer Section */}
                <div className="content-section mb-5">
                  <h2 className="h3 fw-bold text-primary mb-4">What We Offer</h2>
                  <Row className="g-4">
                    <Col md={6}>
                      <div className="feature-card p-4 h-100">
                        <div className="feature-icon mb-3">
                          <span className="fs-2">📱</span>
                        </div>
                        <h3 className="h5 fw-bold mb-3">Mobile Phones & Accessories</h3>
                        <p className="text-muted">
                          From the newest smartphones to essential accessories, we carry a comprehensive range of mobile devices and protective gear to keep you connected and your devices secure.
                        </p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="feature-card p-4 h-100">
                        <div className="feature-icon mb-3">
                          <span className="fs-2">💻</span>
                        </div>
                        <h3 className="h5 fw-bold mb-3">Computers & Computer Accessories</h3>
                        <p className="text-muted">
                          Whether you're a professional, student, or tech enthusiast, our extensive collection of computers, laptops, and accessories ensures you have the right tools for any task.
                        </p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="feature-card p-4 h-100">
                        <div className="feature-icon mb-3">
                          <span className="fs-2">📷</span>
                        </div>
                        <h3 className="h5 fw-bold mb-3">Photography & Audio-Visual Equipment</h3>
                        <p className="text-muted">
                          Capture life's precious moments with our professional-grade cameras, lenses, audio equipment, and video gear. Perfect for both amateur photographers and industry professionals.
                        </p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="feature-card p-4 h-100">
                        <div className="feature-icon mb-3">
                          <span className="fs-2">🔧</span>
                        </div>
                        <h3 className="h5 fw-bold mb-3">Electronics & More</h3>
                        <p className="text-muted">
                          Our diverse inventory extends beyond the basics, featuring innovative electronics and gadgets that enhance your digital lifestyle.
                        </p>
                      </div>
                    </Col>
                  </Row>
                </div>

                {/* Why Choose Us Section */}
                <div className="content-section mb-5">
                  <h2 className="h3 fw-bold text-primary mb-4">Why Choose ShopShopDay?</h2>
                  <div className="why-choose-grid">
                    <div className="why-choose-item mb-4 p-4 border rounded">
                      <h4 className="h6 fw-bold text-primary mb-2">Local Expertise</h4>
                      <p className="text-muted mb-0">As a Hong Kong-based business, we understand the unique needs and preferences of our local community.</p>
                    </div>
                    <div className="why-choose-item mb-4 p-4 border rounded">
                      <h4 className="h6 fw-bold text-primary mb-2">Wide Selection</h4>
                      <p className="text-muted mb-0">Our comprehensive inventory means you can find everything you need in one convenient location.</p>
                    </div>
                    <div className="why-choose-item mb-4 p-4 border rounded">
                      <h4 className="h6 fw-bold text-primary mb-2">Trusted Quality</h4>
                      <p className="text-muted mb-0">We partner with reputable brands and suppliers to ensure every product meets our high standards.</p>
                    </div>
                    <div className="why-choose-item mb-4 p-4 border rounded">
                      <h4 className="h6 fw-bold text-primary mb-2">Convenient Shopping</h4>
                      <p className="text-muted mb-0">Our user-friendly online platform makes it easy to browse, compare, and purchase your desired products from the comfort of your home.</p>
                    </div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="content-section text-center bg-light p-5 rounded">
                  <h2 className="h3 fw-bold text-primary mb-3">Get in Touch</h2>
                  <p className="fs-6 text-muted mb-4">
                    Ready to discover the ShopShopDay difference? Browse our extensive catalog online or contact our friendly team for personalized recommendations. We're here to help you find exactly what you're looking for.
                  </p>
                  <p className="fst-italic text-muted">
                    <em>Experience the future of electronics shopping with ShopShopDay – where technology meets excellence.</em>
                  </p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutUs;