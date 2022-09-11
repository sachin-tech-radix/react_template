import {useState, useEffect} from 'react';
import {  Row, Col, Card,CardText,CardTitle} from "reactstrap";
import { apiPath, config } from "../../Constants";
import axios from 'axios';

const Dashboard = () => {
  let [userCount, setUserCount] = useState({});
  useEffect(()=>{
    let url = `${apiPath}countusers`;
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    axios.get(url, config).then((res)=>{
      setUserCount(res.data.results);
    }).catch((err)=>{
      //setOrders(err.response.data.results);
    });
  },[])
  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            Dashboard
          </CardTitle>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <Row>
              <Col md="6" lg="3">
                <Card body color="light-warning">
                  <CardTitle tag="h1">{userCount.plan}</CardTitle>
                  <CardText>
                    Plans have for users.
                  </CardText>
                </Card>
              </Col>
              <Col md="6" lg="3">
                <Card body color="light-info">
                  <CardTitle tag="h1">{userCount.user}</CardTitle>
                  <CardText>
                    Users are in tounch with us.
                  </CardText>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col lg="12"></Col>
            </Row>
            
          </CardTitle>
        </Card>
      </Col>
    </Row>
  );
};

export default Dashboard;
