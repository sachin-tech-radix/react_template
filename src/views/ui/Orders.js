import {useState, useEffect} from 'react';
import {  Alert, Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";
import { apiPath, config } from "../../Constants";
import axios from 'axios';

const Orders = () => {
  const [show, setShow] = useState(false);
  let [orders, setOrders] = useState([]);
  let [err, setErr] = useState('');
  useEffect(()=>{
    let url = `${apiPath}orders`;
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    axios.get(url, config).then((res)=>{
      setOrders(res.data.results);
    }).catch((err)=>{
      setErr(err.response.data.message);
    });
  },[])
  let correctdate= (tdate) => {
    let odate = [new Date(tdate).getDate(),new Date(tdate).getMonth() + 1,  new Date(tdate).getFullYear()].join('/');
    return odate;
  }
  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            Order List
          </CardTitle>
          <CardBody className="">
            {(err != '')?<Alert color="danger">{err}</Alert>:null}
            <Table bordered responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Orderid</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>DOB</th>
                  <th>TOB</th>
                  <th>POB</th>
                  <th>Shop Name</th>
                  <th>Shop Phone</th>
                  <th>Shop Address</th>
                </tr>
              </thead>
              <tbody>
              {
                orders.map((order,index) => {
                  return (
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>{order.public_id}</td>
                      <td>{correctdate(order.created_at)}</td>
                      <td>Completed</td>
                      <td>{order.username}</td>
                      <td>{order.userphone}</td>
                      <td>{correctdate(order.dob)}</td>
                      <td>{order.tob}</td>
                      <td>{order.pob}</td>
                      <td>{order.shopname}</td>
                      <td>{order.shopphone}</td>
                      <td>{order.address}</td>
                    </tr>
                  )
                })
              }
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Orders;
