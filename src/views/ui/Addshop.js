import {useState, useEffect} from 'react';
import { Alert, Card, Row, Col, CardTitle, CardBody, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { apiPath, config, amount } from "../../Constants";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Addshop = () => {
  //let { shopid } = useParams();
  let [loading, setLoading] = useState(false);
  let [addData, setAddData] = useState({'fname':'','email':'','phone':'','dob':'','tob':'','pob':'','amount':amount});
  let [nameerr, setNameerr] = useState("");
  let [emailerr, setEmailerr] = useState("");
  let [phoneerr, setPhoneerr] = useState("");
  let [doberr, setDobErr] = useState("");
  let [toberr, setTobErr] = useState("");
  let [poberr, setPobErr] = useState("");
  //let [pobcity, setpobcity] = useState([]);
  //let [amountErr, setAmountErr] = useState("");
  let [err, setErr] = useState('');
  //let [shop, setShop] = useState({name:null,id:null});

  let changeName = (e) => {
    setAddData({...addData,[e.target.name]:e.target.value});
    if(e.target.value.trim()===''){setNameerr('Full Name is required');}else{setNameerr('');}
  }
  let changeEmail = (e) => {
    setAddData({...addData,[e.target.name]:e.target.value});
    if(!(RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(e.target.value.trim()))){setEmailerr('Email is required or invalid');}else{setEmailerr('');}
  }
  let changePhone = (e) => {
    setAddData({...addData,[e.target.name]:e.target.value});
    if(e.target.value.trim()==='' || e.target.value.length > 10 || isNaN(e.target.value)){setPhoneerr('Phone number is required or invalid');}else{setPhoneerr('');}
  }
  let changeDob = (e) => {
    setAddData({...addData,[e.target.name]:e.target.value});
    if(e.target.value.trim()===''){setDobErr('Date of Birth is required');}else{setDobErr('');}
  }
  let changeTob = (e) => {
    setAddData({...addData,[e.target.name]:e.target.value});
    if(e.target.value.trim()===''){setTobErr('Time of Birth is required');}else{setTobErr('');}
  }
  let changePob = (e) => {
    setAddData({...addData,[e.target.name]:e.target.value});
    if(e.target.value.trim()===''){setPobErr('place of Birth is required');}else{setPobErr('');
      if(e.target.value.length>=3){
        let url = `${apiPath}city/${e.target.value}`;
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        axios.get(url, config).then((res)=>{
          setpobcity(res.data.results);
        }).catch((err)=>{
          setpobcity([]);
        });
      }
    }
  }
  let changeAmount = (e) => {
    setAddData({...addData,[e.target.name]:e.target.value});
    if(e.target.value.trim()===''){setAmountErr('amount is required');}else{setAmountErr('');}
  }
  let save = (e) => {
    setLoading(true);
    e.preventDefault();
    let error = 0;
    if(addData.fname.trim()===''){error=1;setNameerr('Full Name is required');}else{setNameerr('');}
    if(!(RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(addData.email.trim()))){error=1;setEmailerr('Email is required or invalid');}else{setEmailerr('');}
    if(addData.phone==='' || addData.phone.length > 10 || isNaN(addData.phone)){error=1;setPhoneerr('Phone number is required or invalid');}else{setPhoneerr('');}
    if(addData.dob.trim()===''){error=1;setDobErr('Date of Birth is required');}else{setDobErr('');}
    if(addData.tob.trim()===''){error=1;setTobErr('Time of Birth is required');}else{setTobErr('');}
    if(addData.pob.trim()===''){error=1;setPobErr('place of Birth is required');}else{setPobErr('');}
    setLoading(false);
  }

  useEffect(()=>{
    // let url = `${apiPath}shop/${shopid}`;
    // axios.get(url, config).then((res)=>{
    //   setShop(res.data.result);
    // }).catch((err)=>{
    //   setErr(err.response.data.message);
    // });
  },[])

  return (
    <Row>
      <Col>
        {(err != '')?<Alert color="danger">{err}</Alert>:null}
        <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <i className="bi bi-bell me-2"> </i>
              Guidance & Counseling
            </CardTitle>
            <CardBody>
              <Form onSubmit={save}>
                <FormGroup>
                  <Label for="exampleEmail">Full Name</Label>
                  <Input id="exampleEmail" name="fname" placeholder="Full Name" type="text" onChange={changeName} />
                  <small className="text-danger">{nameerr}</small>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input id="exampleEmail" name="email" placeholder="Email" type="email" onChange={changeEmail} />
                  <small className="text-danger">{emailerr}</small>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Phone Number</Label>
                  <Input id="exampleEmail" name="phone" placeholder="Phone Number" type="text" maxLength={10} onChange={changePhone} />
                  <small className="text-danger">{phoneerr}</small>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Date Of Birth</Label>
                  <Input id="exampleEmail" name="dob" placeholder="Date Of Birth" type="date" onChange={changeDob} />
                  <small className="text-danger">{doberr}</small>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Time Of Birth</Label>
                  <Input id="exampleEmail" name="tob" placeholder="Time Of Birth" type="time" onChange={changeTob} />
                  <small className="text-danger">{toberr}</small>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Place of Birth</Label>
                  <Input id="exampleEmail" name="pob" placeholder="Place of Birth" type="text" onChange={changePob} />
                  <small className="text-danger">{poberr}</small>
                </FormGroup>
                {loading?
                  <Button className="btn" color="light-danger" type="submit" disabled  >
                    Please wait...
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                  </Button>
                  :
                  <Button className="btn" color="light-danger" type="submit">Submit</Button>
                }
              </Form>
            </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Addshop;
