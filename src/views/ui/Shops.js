import {useState, useEffect} from 'react';
import { Form, Input, Alert, Button, Row, Col, Table, Card, CardTitle, CardBody, FormGroup, Label, } from "reactstrap";
import { apiPath, config } from "../../Constants";
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import QrCode from "./QrCode";

const Shops = () => {
  const [show, setShow] = useState(false);
  let [err, setErr] = useState('');
  let [shops, setShops] = useState([]);
  let [shop, setShop] = useState({});
  let [addData, setAddData] = useState({name:'',address:'',phone:'',payment:null,offermaking:null,offerstone:null});
  let [nameerr, setNameerr] = useState("");
  let [phoneerr, setPhoneerr] = useState("");
  let [makingerr, setMakingerr] = useState("");
  let [stoneerr, setStoneerr] = useState("");
  let [addresserr, setAddresserr] = useState("");
  let [generateQR, setGenerateQR] = useState("");
  useEffect(()=>{
    let url = `${apiPath}shops/0`;
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    axios.get(url, config).then((res)=>{
      setShops(res.data.results);
    }).catch((err)=>{
      setErr(err.response.data.message);
    });
  },[])
  let changeOffermaking = (e) => {
    setAddData({...addData,[e.target.name]:e.target.value});
    //if(e.target.value>100  || e.target.value<0  || e.target.value==''){setMakingerr('Offer on making should remain 0 to 100');}else{setMakingerr('');}
  }
  let changeOfferstone = (e) => {
    setAddData({...addData,[e.target.name]:e.target.value});
    //if(e.target.value>100 || e.target.value<0 || e.target.value==''){setStoneerr('Offer on making should remain 0 to 100');}else{setStoneerr('');}
  }
  let changeName = (e) => {
    setAddData({...addData,[e.target.name]:e.target.value});
    if(e.target.value.trim()===''){setNameerr('Full Name is required');}else{setNameerr('');}
  }
  let changeAddress = (e) => {
    setAddData({...addData,[e.target.name]:e.target.value});
    if(e.target.value.trim()===''){setAddresserr('Address is required');}else{setAddresserr('');}
  }
  let changePhone = (e) => {
    setAddData({...addData,[e.target.name]:e.target.value});
    if(e.target.value.trim()==='' || e.target.value.length > 10 || isNaN(e.target.value)){
      setPhoneerr('Phone number is required/invalid');
    }else{setPhoneerr('');}
  }
  let changePayment = (e) => {
    (e.target.checked)?setAddData({...addData,[e.target.name]:1}):setAddData({...addData,[e.target.name]:0})
  }
  let save = (e) => {
    e.preventDefault();
    let error = 0;
    if(addData.name.trim()===''){error=1;setNameerr('Full Name is required');}else{setNameerr('');}
    if(addData.address.trim()===''){error=1;setAddresserr('Address is required');}else{setAddresserr('');}
    if((addData.phone === '') || (addData.phone.length !== 10)){error=1;setPhoneerr('Phone is required/invalid');}else{setPhoneerr('');}
    //if(addData.offermaking>100  || addData.offermaking<0 || addData.offermaking==null){error=1;setMakingerr('Offer on making should remain 0 to 100');}else{setMakingerr('');}
    //if(addData.offerstone>100 || addData.offerstone<0 || addData.offerstone==null){error=1;setStoneerr('Offer on making should remain 0 to 100');}else{setStoneerr('');}
    if(error == 0){
      //setAddData({...addData,public_id:e.target.value});
      let shop = {
        name : addData.name,
        address : addData.address,
        public_id : 0,
        phone : addData.phone,
        payment : addData.payment,
        offermaking : addData.offermaking,
        offerstone : addData.offerstone
      };
      let url = `${apiPath}addshop`;
      config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      axios.post(url, shop, config).then((res)=>{
        setErr(res.data.message);
        setAddData({name:'',address:'',phone:'',offermaking:'',offerstone:''});
        let oldArray = shops;
        oldArray.unshift(res.data.results[0]);
        setShops([]);
        setShops(oldArray);
      }).catch((err)=>{
        setErr(err.response.data.message);
      });
    }
  }
  let editsave = (e) => {
    e.preventDefault();
    let error = 0;
    if(e.target[1].value.trim()===''){error=1;setNameerr('Full Name is required');}else{setNameerr('');}
    if(e.target[2].value.trim()===''){error=1;setAddresserr('Address is required');}else{setAddresserr('');}
    if((e.target[3].value === '') || (e.target[3].value.length !== 10)){error=1;setPhoneerr('Phone is required/invalid');}else{setPhoneerr('');}
    //if(e.target[4].value>100  || e.target[4].value<0 || e.target[4].value==''){error=1;setMakingerr('Offer on making not more than 100%');}else{setMakingerr('');}
    //if(e.target[5].value>100  || e.target[5].value<0 || e.target[5].value==''){error=1;setStoneerr('Offer on stone not more than 100%');}else{setStoneerr('');}
    if(error == 0){
      //setAddData({...addData,public_id:e.target.value});
      let shop = {
        name : e.target[1].value,
        address : e.target[2].value,
        public_id : e.target[0].value,
        phone : e.target[3].value,
        offermaking : e.target[4].value,
        offerstone : e.target[5].value
      };
      let url = `${apiPath}addshop`;
      config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      axios.post(url, shop, config).then((res)=>{
        setAddData({name:'',address:'',phone:'',offermaking:'',offerstone:''});
        setErr(res.data.message);
        //Automatic Update Row
        let newArray = shops.slice();
        let obj = newArray.find((o, i) => {
            if (o.public_id == res.data.results[0].public_id) {
              newArray[i] = { payment_date:res.data.results[0].payment_date, offer_making: res.data.results[0].offer_making,offer_jwellary: res.data.results[0].offer_jwellary,phone: res.data.results[0].phone, name: res.data.results[0].name,address: res.data.results[0].address,public_id:res.data.results[0].public_id };
              return true; // stop searching
            }
        });
        setShops(newArray);
        setShow(false);
        //Automatic Update Row
      }).catch((err)=>{
        setErr(err.response.data.message);
      });
    }
  }
  let onEdit = (shop) => {
    setShow(true);
    setShop(shop);
  }
  let generateQRCode = (shop) => {
    setGenerateQR('qr');
    setShop(shop);
  }
  let changeList = (e) => {
    let url = `${apiPath}shops/${e.target.value}`;
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    axios.get(url, config).then((res)=>{
      setErr('');
      setShops(res.data.results);
    }).catch((err)=>{
      setErr(err.response.data.message);
      setShops([]);
    });
  }
  let addPayment = (shop_data) => {
    let url = `${apiPath}addpayment/${shop_data.public_id}`;
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    axios.patch(url, shop_data, config).then((res)=>{
      setErr('Payment done');
      let newArray = shops.slice();
      newArray.find((o, i) => {
          if (o.public_id == shop_data.public_id) {
            newArray[i] = { payment_date:res.data.result.payment_date ,offer_making: shop_data.offer_making,offer_jwellary: shop_data.offer_jwellary,phone: shop_data.phone, name: shop_data.name,address: shop_data.address,public_id:shop_data.public_id };
            return true; // stop searching
          }
      });
      setShops(newArray);
    }).catch((err)=>{
      setErr(err.response.data.message);
      //setShops([]);
    });
  }
  let unduPayment = (shop_data) => {
    let url = `${apiPath}undupayment/${shop_data.public_id}`;
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    axios.patch(url, shop_data, config).then((res)=>{
      setErr('Payment done');
      let newArray = shops.slice();
      newArray.find((o, i) => {
          if (o.public_id == shop_data.public_id) {
            newArray[i] = { payment_date:res.data.result.payment_date ,offer_making: shop_data.offer_making,offer_jwellary: shop_data.offer_jwellary,phone: shop_data.phone, name: shop_data.name,address: shop_data.address,public_id:shop_data.public_id };
            return true; // stop searching
          }
      });
      setShops(newArray);
    }).catch((err)=>{
      setErr(err.response.data.message);
      //setShops([]);
    });
  }
  let correctdate= (tdate) => {
    let odate = [new Date(tdate).getDate(),new Date(tdate).getMonth() + 1,  new Date(tdate).getFullYear()].join('/');
    return odate;
  }
  let todaydate = new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate();
  return (
    <Row>
      <Modal show={generateQR === "qr"} backdrop="static" keyboard={false} >
        <Modal.Header>
          {shop.name}
        </Modal.Header>
        <Modal.Body>
          <div style={{ background: 'white', padding: '16px' }}>
            <QrCode public_id={shop.public_id} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="danger" onClick={()=>{setGenerateQR('')}}>Close</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show} backdrop="static" keyboard={false} >
        <Modal.Header>
          Enter Details
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={editsave}>
            <input type="hidden" name="public_id" defaultValue={shop.public_id} />
            <FormGroup>
              <Input name="name" placeholder="Shop Name" defaultValue={shop.name} type="text" onChange={changeName} /><small className="text-danger">{nameerr}</small>
            </FormGroup>
            <FormGroup>
              <Input name="address" placeholder="Shop Address" defaultValue={shop.address} type="text" onChange={changeAddress} /><small className="text-danger">{addresserr}</small>
            </FormGroup>
            <FormGroup>
            <Input defaultValue={shop.phone} name="phone" placeholder="Shop Phone" maxLength="10" type="text" onChange={changePhone} /><small className="text-danger">{phoneerr}</small>
            </FormGroup>
            <FormGroup>
            <Input defaultValue={0} disabled={true} name="offermaking" type="number" placeholder="Offer on making charge (%)" onChange={changeOffermaking}/><small className="text-danger">{makingerr}</small>
            </FormGroup>
            <FormGroup>
            <Input defaultValue={0}  disabled={true} name="offerstone" type="number" placeholder="Offer on stone charge (%)" onChange={changeOfferstone} /><small className="text-danger">{stoneerr}</small>
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
            Shops List
          </CardTitle>
          <CardBody className="">
            {(err != '')?<Alert color="danger">{err}</Alert>:null}
            <Form onSubmit={save}>
              <input type="hidden" name="public_id" defaultValue={0} />
              <Row className='p-4'>
                <Col>
                  <div><Input  value={addData.name} name="name" placeholder="Shop Name" type="text" onChange={changeName} /><small className="text-danger">{nameerr}</small></div>
                </Col>
                <Col>
                  <div><Input value={addData.address} name="address" placeholder="Shop Address" type="text" onChange={changeAddress} /><small className="text-danger">{addresserr}</small></div>
                </Col>
                <Col>
                  <div><Input value={addData.phone} name="phone" placeholder="Shop Phone" maxLength="10" type="text" onChange={changePhone} /><small className="text-danger">{phoneerr}</small></div>
                </Col>
              </Row>
              <Row className='p-4'>
                <Col>
                  <div><Input value={0} disabled={true} name="offermaking" type="number" placeholder="Offer on making charge (%)" onChange={changeOffermaking}/><small className="text-danger">{makingerr}</small></div>
                </Col>
                <Col>
                  <div><Input value={0} disabled={true} name="offerstone" type="number" placeholder="Offer on stone charge (%)" onChange={changeOfferstone} /><small className="text-danger">{stoneerr}</small></div>
                </Col>
                <Col>
                  <div><Input checked={addData.payment} name="payment" defaultValue="1" type="checkbox" onClick={changePayment} /> <Label check>Payment</Label>&nbsp;&nbsp;<Button className="btn" color="light-danger" type="submit">Add</Button></div>
                </Col>
              </Row>
            </Form>
            <Row className='p-4'>
              <Col>
                <FormGroup>
                  <Input onChange={changeList} name="country" type="select">
                      <option value='0'>All</option>
                      <option value='1'>Active</option>
                      <option value='2'>Inactive after one month</option>
                      <option value='3'>Inactive</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col></Col>
            </Row>
            <Table bordered responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Phone</th>
                  {/* <th>Offer On Making</th>
                  <th>Offer On Stone</th> */}
                  <th>Payment Date</th>
                  <th>Add Payment</th>
                  <th>Undo Payment</th>
                  <th>QR</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
              {
                shops.map((shop,index) => {
                  return (
                    <tr key={index}>
                      <th>{index+1}</th>
                      <th>{shop.name}</th>
                      <th>{shop.address}</th>
                      <th>{shop.phone}</th>
                      {/* <th>{shop.offer_making}</th>
                      <th>{shop.offer_jwellary}</th> */}
                      <th>{correctdate(shop.payment_date)}</th>
                      <th><Button className="btn" color="light-danger" onClick={() => addPayment(shop)}>Add Payment</Button></th>
                      <th>{new Date(shop.payment_date) >= new Date(todaydate)?<Button className="btn" color="light-danger" onClick={() => unduPayment(shop)}>Undo Payment</Button>:null}</th>
                      <th><Button className="btn" color="light-danger" onClick={() => generateQRCode(shop)}>Genrate</Button></th>
                      <th><Button className="btn" color="light-danger" onClick={() => onEdit(shop)}>Edit</Button></th>
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
