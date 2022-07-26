import {useState, useEffect} from 'react';
import { Form, Input, Alert, Button, Row, Col, Table, Card, CardTitle, CardBody, FormGroup, Label, } from "reactstrap";
import { apiPath, config } from "../../Constants";
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

const Discount = () => {
  const [show, setShow] = useState(false);
  let [err, setErr] = useState('');
  let [discounts, setDiscounts] = useState([]);
  let [discount, setDiscount] = useState({});
  let [addData, setAddData] = useState({type:'',dscount_percentage:'',status:null});
  let [typeerr, setTypeerr] = useState("");
  let [discounterr, setDiscounterr] = useState("");
  useEffect(()=>{
    let url = `${apiPath}discounts`;
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    axios.get(url, config).then((res)=>{
      setDiscounts(res.data.results);
    }).catch((err)=>{
      setErr(err.response.data.message);
    });
  },[])
  let changeType = (e) => {
    setAddData({...addData,[e.target.name]:e.target.value});
    if(e.target.value.trim()===''){setTypeerr('Discount type is required');}else{setTypeerr('');}
  }
  let changeDiscount = (e) => {
    setAddData({...addData,[e.target.name]:e.target.value});
    if(e.target.value.trim()===''){setDiscounterr('Discount percentage is required');}else{setDiscounterr('');}
  }
  // let save = (e) => {
  //   e.preventDefault();
  //   let error = 0;
  //   if(addData.name.trim()===''){error=1;setNameerr('Full Name is required');}else{setNameerr('');}
  //   if(addData.address.trim()===''){error=1;setAddresserr('Full Name is required');}else{setAddresserr('');}
  //   if(error == 0){
  //     //setAddData({...addData,public_id:e.target.value});
  //     let shop = {
  //       name : addData.name,
  //       address : addData.address,
  //       public_id : 0,
  //       status : 'Active'
  //     };
  //     let url = `${apiPath}addshop`;
  //     axios.post(url, shop, config).then((res)=>{
  //       setErr(res.data.message);
  //       setAddData({name:'',address:''});
  //       setShops([...shops, res.data.results[0]]);
  //     }).catch((err)=>{
  //       setErr(err.response.data.message);
  //     });
  //   }
  // }
  let editsave = (e) => {
    e.preventDefault();
    let error = 0;
    if(e.target[1].value.trim()===''){error=1;setTypeerr('Discount type is required');}else{setTypeerr('');}
    if(e.target[2].value===null){error=1;setDiscounterr('Discount percentage is required');}else{setDiscounterr('');}
    if(error == 0){
      //setAddData({...addData,public_id:e.target.value});
      let discount = {
        type : e.target[1].value,
        discount : e.target[2].value,
        public_id : e.target[0].value,
        status : e.target[3].value
      };
      let url = `${apiPath}updatediscount`;
      config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      axios.patch(url, discount, config).then((res)=>{
        setErr(res.data.message);
        //Automatic Update Row
        let newArray = discounts.slice();
        let obj = newArray.find((o, i) => {
            if (o.public_id == res.data.result[0].public_id) {
              newArray[i] = { type: res.data.result[0].type,dscount_percentage: res.data.result[0].dscount_percentage,status:res.data.result[0].status,public_id:res.data.result[0].public_id };
              return true; // stop searching
            }
        });
        setDiscounts(newArray);
        setDiscount(false);
        //Automatic Update Row
      }).catch((err)=>{console.log(err);
        //setErr(err.response.data.message);
      });
    }
  }
  let onEdit = (discount) => {
    setShow(true);
    setDiscount(discount);
  }
  return (
    <Row>
      <Modal show={show} backdrop="static" keyboard={false} >
        <Modal.Header>
          Enter Details
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={editsave}>
            <input type="hidden" name="public_id" defaultValue={discount.public_id} />
            <FormGroup>
              <Input name="type" placeholder="Discount Type" defaultValue={discount.type} type="text" onChange={changeType} /><small className="text-danger">{typeerr}</small>
            </FormGroup>
            <FormGroup>
              <Input name="dscount_percentage" placeholder="Discount percentage" defaultValue={discount.dscount_percentage} type="number" onChange={changeDiscount} /><small className="text-danger">{discounterr}</small>
            </FormGroup>
            <FormGroup>
              <Label for="status">Status</Label>
                <Input defaultValue={discount.status} name="status" type="select">
                    <option value='1'>Active</option>
                    <option value='0'>Inactive</option>
                </Input>
            </FormGroup>
            <Button className="btn" color="light-danger" type="submit">Update</Button>
            <Button className="btn m-2" color="danger" onClick={()=>{setShow(false)}}>Close</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            Discount List
          </CardTitle>
          <CardBody className="">
            {(err != '')?<Alert color="danger">{err}</Alert>:null}
            {/* <Form onSubmit={save}>
              <input type="hidden" name="public_id" defaultValue={0} />
              <Row>
                <Col>
                  <div className="p-2"><Input value={addData.name} name="name" placeholder="Shop Name" type="text" onChange={changeName} /><small className="text-danger">{nameerr}</small></div>
                </Col>
                <Col>
                  <div className="p-2"><Input value={addData.address} name="address" placeholder="Shop Address" type="text" onChange={changeAddress} /><small className="text-danger">{addresserr}</small></div>
                </Col>
                <Col>
                  <div className="p-2"><Button className="btn" color="light-danger" type="submit">Add</Button></div>
                </Col>
              </Row>
            </Form> */}
            <Table bordered responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Type</th>
                  <th>Percentage</th>
                  <th>Status</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
              {
                discounts.map((discount,index) => {
                  return (
                    <tr key={index}>
                      <th>{index+1}</th>
                      <th>{discount.type}</th>
                      <th>{discount.dscount_percentage}%</th>
                      {
                        (discount.status == 1)?
                          <th><Button className="btn" disabled color='success' type="submit">Active</Button></th>
                        :
                          <th><Button className="btn" disabled color='danger' type="submit">Inactive</Button></th>
                      }
                      <th><Button className="btn" color="light-danger" onClick={() => onEdit(discount)}>Edit</Button></th>
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

export default Discount;
