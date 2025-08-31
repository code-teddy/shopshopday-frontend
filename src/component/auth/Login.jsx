import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/features/authSlice";
import {
  Container,
  InputGroup,
  Row,
  Col,
  Button,
  Form,
  Card,
} from "react-bootstrap";
import { BsPersonFill, BsLockFill } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const authErrorMessage = useSelector((state) => state.auth.errorMessage);
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
      window.location.reload();
    }
  }, [isAuthenticated, navigate, from]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!credentials.email || !credentials.password) {
      const errorMsg = "Please enter both email and password";
      toast.error(errorMsg);
      setErrorMessage(errorMsg);
      return;
    }
    
    try {
      // This will either succeed or be handled by the Redux rejected case
      await dispatch(login(credentials)).unwrap();
      toast.success("Login successful!");
    } catch  {
      // This catch block will handle any errors that weren't caught by Redux
      // The actual error message will be handled by the useEffect above
      toast.success("Login failed");
    }
  };
  return (
    <>
    
     <ToastContainer />
    <Container className='mt-5 mb-5'>
     
      <Row className='d-flex justify-content-center'>
        <Col xs={12} sm={10} md={8} lg={6} xl={6}>
          <Card>
            <Card.Body>
              {/* {authErrorMessage && (
                <div className='text-danger'>{authErrorMessage}</div>
              )} */}
              <Card.Title className='text-center mb-4'>Login</Card.Title>

              <Form onSubmit={handleLogin}>
                <Form.Group className='mb-3' controlId='username'>
                  <Form.Label>Email</Form.Label>

                  <InputGroup>
                    <InputGroup.Text>
                      <BsPersonFill />
                    </InputGroup.Text>

                    <Form.Control
                      type='email'
                      name='email'
                      placeholder='Enter your email address'
                      value={credentials.email}
                      onChange={handleInputChange}
                      isInvalid={!!authErrorMessage || errorMessage}
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className='mb-3' controlId='password'>
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <BsLockFill />
                    </InputGroup.Text>
                    <Form.Control
                      type='password'
                      name='password'
                      placeholder='Enter your password'
                      value={credentials.password}
                      onChange={handleInputChange}
                      isInvalid={!!authErrorMessage || errorMessage}
                    />
                  </InputGroup>
                </Form.Group>

                {(authErrorMessage || errorMessage) && (
                  <div className="alert alert-danger" role="alert">
                    {authErrorMessage || errorMessage}
                  </div>
                )}

                <Button
                  variant='outline-primary'
                  type='submit'
                  className='w-100'>
                  Login
                </Button>
              </Form>

              <div className='text-center mt-4 mb-4'>
                Don't have an account yet?{" "}
                <Link to={"/register"} style={{ textDecoration: "none" }}>
                  Register here
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default Login;
