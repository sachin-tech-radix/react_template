import { Alert, Row, Col, Card, CardTitle, CardBody, Button, Form ,FormGroup ,Label } from "reactstrap";
import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { apiPath, config } from "../../Constants";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({auth}) => {
  const navigate = useNavigate();
  let [loginData, setLoginData] = useState({username:'',password:''});
  let [unameError ,setUnameError] = useState(null);
  let [passError ,setPassError] = useState(null);
  let [error ,setError] = useState('');
  let [loading, setLoading] = useState(false);

  let LoginChecked = (e) => {
    setLoading(true);
    e.preventDefault();
    if(loginData.username === ''){
      setUnameError('Username is required');
    }
    if(loginData.password === ''){
      setPassError('Password is required');
    }
    if(loginData.username !== '' && loginData.password !== ''){
      let user = {
        username : loginData.username,
        password : loginData.password
      };
      let url = `${apiPath}login`;
      axios.post(url, user, config).then((res)=>{//console.log(res);
        localStorage.setItem('type', res.data.result.type);
        localStorage.setItem('token', res.data.access_token);
        if(res.data.result.type == 1){
          auth(true);
          navigate("gems");
        }else{
          auth(null);
          navigate("plan");
        }
      }).catch((err)=>{//console.log(err);
        setError(err.response.data.message);
        setLoading(false);
      });
    }else{
      setLoading(false);
    }
  }
  let inputValue = (e) => {
    if(e.target.name === 'username'){
      if(e.target.value.trim()===''){
        setUnameError('Username is required');
        setLoginData({...loginData,[e.target.name]:''});
      }else{
        setUnameError(null);
        setLoginData({...loginData,[e.target.name]:e.target.value});
      }
    }else if(e.target.name === 'password'){
      if(e.target.value===''){
        setPassError('Password is required');
        setLoginData({...loginData,[e.target.name]:''});
      }else{
        setPassError(null);
        setLoginData({...loginData,[e.target.name]:e.target.value});
      }
    }
  }
  return (
    <Row>
      <Col>
        {/* --------------------------------------------------------------------------------*/}
        {/* Card-1*/}
        {/* --------------------------------------------------------------------------------*/}
        <Card >
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Please Login
          </CardTitle>
          <CardBody>
            <Row className="mt-3">
              <Col sm="12" md={{offset: 2,size: 8}}>
                {(error != '') && <Alert color="danger">{error}</Alert>}
                <Form  onSubmit={LoginChecked}>
                  <FormGroup>
                    <Label for="exampleEmail">Username</Label>
                    <div className="input-group input-group">
                      <span className="input-group-text" style={{color:'#f8dddd',borderTopLeftRadius:"20px",borderBottomLeftRadius:"20px"}} id="basic-addon1"><FaUser></FaUser></span>
                      <input name="username" onChange={inputValue} placeholder="Username" className="form-control" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <small id="passwordHelp" className="text-danger">{unameError}</small>
                  </FormGroup>
                  <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <div className="input-group input-group">
                      <span className="input-group-text"  style={{color:'#f8dddd',borderTopLeftRadius:"20px",borderBottomLeftRadius:"20px"}} id="basic-addon1"><FaLock></FaLock></span>
                      <input name="password" onChange={inputValue} placeholder="Password" type="password" className="form-control" aria-label="Password" aria-describedby="basic-addon1" />
                    </div>
                    <small id="passwordHelp" className="text-danger">{passError}</small>
                  </FormGroup>
                  {loading?
                    <Button className="btn" color="light-danger" type="submit" disabled  >
                      Logging in...
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                    </Button>
                    :
                    <Button className="btn" color="light-danger" type="submit" >Submit</Button>
                  }
                </Form>
              </Col>
            </Row>
            
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
