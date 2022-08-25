import {useState, useEffect} from 'react';
import { Form, Input, Alert, Button, Row, Col, Table, Card, CardTitle, CardBody, FormGroup, Label, } from "reactstrap";
import { apiPath, config } from "../../Constants";
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

const Shops = () => {
  const [show, setShow] = useState(false);
  let [err, setErr] = useState('');
  let [plans, setPlans] = useState([]);
  let [plan, setPlan] = useState({});
  let [addData, setAddData] = useState({name:'',nameerr:'',consultation:'',consultationerr:'',onelinequestion:'',onelinequestionerr:'',amount:'',amounterr:'',discountamount:'',discountamounterr:''});
  useEffect(()=>{
    let url = `${apiPath}plans`;
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    axios.get(url, config).then((res)=>{
      setPlans(res.data.results);
    }).catch((err)=>{
      setErr(err.response.data.message);
    });
  },[])
  const addPlan = (event) => {
    event.preventDefault();
    let error = {status:0,name:'',consultation:'',onelinequestion:'',amount:'',discountamount:''};
    if(addData.name == ''){error.name = 'Plan name is required.';error.status=1}else{error.name = ''}
    if(addData.consultation<=0 || addData.consultation == ''){error.consultation = 'Please enter numeric value.';error.status=1}else{error.consultation = ''}
    if(addData.onelinequestion<=0 || addData.onelinequestion == ''){error.onelinequestion = 'Please enter numeric value.';error.status=1}else{error.onelinequestion = ''}
    if(addData.amount<=0 || addData.amount == ''){error.amount = 'Please enter numeric value.';error.status=1}else{error.amount = ''}
    if(addData.discountamount<=0 || addData.discountamount == ''){error.discountamount = 'Please enter numeric value.';error.status=1}else{error.discountamount = ''}
    setAddData({...addData,nameerr:error.name,consultationerr:error.consultation,discountamounterr:error.discountamount,amounterr:error.amount,onelinequestionerr:error.onelinequestion});
    if(error.status == 0){
      let url = `${apiPath}addplan`;
      config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      let plan = {
        name : addData.name,
        consultation : addData.consultation,
        onelinequestion : addData.onelinequestion,
        amount : addData.amount,
        discountamount : addData.discountamount
      };
      axios.post(url, plan, config).then((res)=>{
        setErr(res.data.message);
        let oldArray = plans;
        oldArray.unshift(res.data.results[0]);
        setPlans([]);
        setPlans(oldArray);
        setShow(false);
      }).catch((err)=>{
        setErr(err.response.data.message);
      });
    }
  }
  let onEdit = (plan) => {
    setShow(true);
    setAddData({...addData,name:plan.name,consultation:plan.consultation,onelinequestion:plan.onelinequestion,amount:plan.amount,discountamount:plan.discountamount,public_id:plan.public_id});
  }
  // let addPayment = (shop_data) => {
  //   const confirmBox = window.confirm(
  //     "Do you really want to make a payment?"
  //   )
  //   if (confirmBox === true) {
  //     let url = `${apiPath}addpayment/${shop_data.public_id}`;
  //     config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  //     axios.patch(url, shop_data, config).then((res)=>{
  //       setErr('Payment done');
  //       let newArray = shops.slice();
  //       newArray.find((o, i) => {
  //           if (o.public_id == shop_data.public_id) {
  //             newArray[i] = { payment_date:res.data.result.payment_date ,offer_making: shop_data.offer_making,offer_jwellary: shop_data.offer_jwellary,phone: shop_data.phone, name: shop_data.name,address: shop_data.address,public_id:shop_data.public_id };
  //             return true; // stop searching
  //           }
  //       });
  //       setShops(newArray);
  //     }).catch((err)=>{
  //       setErr(err.response.data.message);
  //       //setShops([]);
  //     });
  //   }
  // }
  // let unduPayment = (shop_data) => {
  //   const confirmBox = window.confirm(
  //     "Do you really want to remove a payment?"
  //   )
  //   if (confirmBox === true) {
  //     let url = `${apiPath}undupayment/${shop_data.public_id}`;
  //     config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  //     axios.patch(url, shop_data, config).then((res)=>{
  //       setErr('Payment done');
  //       let newArray = shops.slice();
  //       newArray.find((o, i) => {
  //           if (o.public_id == shop_data.public_id) {
  //             newArray[i] = { payment_date:res.data.result.payment_date ,offer_making: shop_data.offer_making,offer_jwellary: shop_data.offer_jwellary,phone: shop_data.phone, name: shop_data.name,address: shop_data.address,public_id:shop_data.public_id };
  //             return true; // stop searching
  //           }
  //       });
  //       setShops(newArray);
  //     }).catch((err)=>{
  //       setErr(err.response.data.message);
  //       //setShops([]);
  //     });
  //   }
  // }
  let correctdate= (tdate) => {
    let odate = [new Date(tdate).getDate(),new Date(tdate).getMonth() + 1,  new Date(tdate).getFullYear()].join('/');
    return odate;
  }
  let todaydate = new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate();
  return (
    <Row>
      <Modal show={show} backdrop="static" keyboard={false} >
        <Modal.Header>
          Enter Details{JSON.stringify(addData)}
        </Modal.Header>
        <Modal.Body>
          {(err != '')?<Alert color="danger">{err}</Alert>:null}
          <Form onSubmit={addPlan}>
            <input type="hidden" name="public_id" defaultValue={plan.public_id} />
            <FormGroup>
              <Input name="name" placeholder="Plan Name" defaultValue={addData.name} type="text" onChange={(e)=>{e.target.value!==''?setAddData({...addData,name:e.target.value,nameerr:''}):setAddData({...addData,nameerr:'Plan name is required.'})}} /><small className="text-danger">{addData.nameerr}</small>
            </FormGroup>
            <FormGroup>
              <Input name="consultation" placeholder="Consultancy Count" defaultValue={addData.consultation} type="number" onChange={(e)=>{e.target.value>0?setAddData({...addData,consultation:e.target.value,consultationerr:''}):setAddData({...addData,consultationerr:'Please enter numeric value.'})}} /><small className="text-danger">{addData.consultationerr}</small>
            </FormGroup>
            <FormGroup>
            <Input defaultValue={addData.onelinequestion} name="onelinequestion" placeholder="One Line Question Count" type="number" onChange={(e)=>{e.target.value>0?setAddData({...addData,onelinequestion:e.target.value,onelinequestionerr:''}):setAddData({...addData,onelinequestionerr:'Please enter numeric value.'})}} /><small className="text-danger">{addData.onelinequestionerr}</small>
            </FormGroup>
            <FormGroup>
              <Input name="amount" placeholder="Amount" defaultValue={addData.amount} type="number" onChange={(e)=>{e.target.value>0?setAddData({...addData,amount:e.target.value,amounterr:''}):setAddData({...addData,amounterr:'Please enter numeric value.'})}} /><small className="text-danger">{addData.amounterr}</small>
            </FormGroup>
            <FormGroup>
            <Input defaultValue={addData.discountamount} name="phone" placeholder="Real Amount" type="number" onChange={(e)=>{e.target.value>0?setAddData({...addData,discountamount:e.target.value,discountamounterr:''}):setAddData({...addData,discountamounterr:'Please enter numeric value.'})}} /><small className="text-danger">{addData.discountamounterr}</small>
            </FormGroup>
            <Button className="btn" color="light-danger" type="submit" >Save</Button>
            <Button className="btn m-2" color="danger" onClick={()=>{setShow(false)}}>Close</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            Plans List
          </CardTitle>
          <CardBody className="">
            {(err != '')?<Alert color="danger">{err}</Alert>:null}
            <Row className='p-4'>
              <Col>
                <FormGroup>
                <Button className="btn" color="light-danger" onClick={()=>setShow(true)}>Add</Button>
                </FormGroup>
              </Col>
              <Col></Col>
            </Row>
            <Table bordered responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Consultancy</th>
                  <th>One Line</th>
                  <th>Amount</th>
                  <th>Real Amount</th>
                  <th>Status</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
              {plans.length === 0?
                <tr>
                      <td colSpan={8}>No plan found.</td>
                </tr>:
                plans.map((plan,index) => {
                  return (
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>{plan.name}</td>
                      <td>{plan.consultation}</td>
                      <td>{plan.onelinequestion}</td>
                      <td>{plan.amount}</td>
                      <td>{plan.discountamount}</td>
                      <td><Button className="btn" color="light-danger" >{plan.status}</Button></td>
                      <td><Button className="btn" color="light-danger" onClick={()=>onEdit(plan)}>Edit</Button></td>
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

export default Shops;
