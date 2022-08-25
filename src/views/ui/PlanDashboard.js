import {useState, useEffect} from 'react';
import {  Row, Col, Table, Card,CardText,CardTitle} from "reactstrap";
import { apiPath, config } from "../../Constants";
import axios from 'axios';

const Dashboard = () => {
  const [count, setCount] = useState({});
  let [orders, setOrders] = useState([]);
  useEffect(()=>{
    let url = `${apiPath}count`;
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    axios.get(url, config).then((res)=>{
      setCount(res.data.results);
    }).catch((err)=>{
      //setErr(err.response.data.message);
    });
  },[])
  useEffect(()=>{
    let url = `${apiPath}countoreders`;
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    axios.get(url, config).then((res)=>{
      setOrders(res.data.results);
    }).catch((err)=>{console.log(err);
      setOrders(err.response.data.results);
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
                  <CardTitle tag="h1">{count.shop}</CardTitle>
                  <CardText>
                    Shops are connected with us.
                  </CardText>
                </Card>
              </Col>
              <Col md="6" lg="3">
                <Card body color="light-info">
                  <CardTitle tag="h1">{count.user}</CardTitle>
                  <CardText>
                    Users are in tounch with us.
                  </CardText>
                </Card>
              </Col>
            </Row>
            <Row>
              <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                Orders count by shops
              </CardTitle>
              <Col lg="12">
                <Table bordered responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Order Count</th>
                      <th>Shop Name</th>
                      <th>Shop Address</th>
                      <th>Shop Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                  {orders.length !== 0?
                    orders.map((order,index) => {
                      return(
                        <tr key={index+1}>
                          <td>{index+1}</td>
                          <td>{order.totalorders}</td>
                          <td>{order.shopname}</td>
                          <td>{order.shopaddress}</td>
                          <td>{order.shopphone}</td>
                        </tr>
                      )
                    })
                    :<tr><td colSpan='5'>No data Found.</td></tr>
                  }
                  </tbody>
                </Table>
              </Col>
            </Row>
          </CardTitle>
        </Card>
      </Col>
    </Row>
  );
};

export default Dashboard;
