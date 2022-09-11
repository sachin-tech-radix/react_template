import {useState, useEffect} from 'react';
import { Form, Input, Alert, Button, Row, Col, Table, Card, CardTitle, CardBody, FormGroup, Label, } from "reactstrap";
import { apiPath, config } from "../../Constants";
import UserView from "./UserView";
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const Users = () => {
  let [search, setSearch] = useState(null);
  let [publicId, setPublicId] = useState(null);
  let [view, setView] = useState(false);
  let [show, setShow] = useState(false);
  let [err, setErr] = useState('');
  let [users, setUsers] = useState([]);
  let [user, setUser] = useState({});
  let [plans, setPlans] = useState([]);
  let [addData, setAddData] = useState({
    public_id:0,
    name:'',nameerr:'',
    address:'',addresserr:'',
    email:'',emailerr:'',
    phone:'',phoneerr:'',
    city:'',cityerr:'',
    state:'',stateerr:'',
    country:'',countryerr:'',
    referby:'',referbyerr:'',
    plan_id:'',planerr:'',planname:'',});
    useEffect(()=>{
      let url = `${apiPath}users`;
      config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      axios.get(url, config).then((res)=>{
        setUsers(res.data.results);
      }).catch((err)=>{
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      });
    },[])
  useEffect(()=>{
    let url = `${apiPath}plans`;
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    axios.get(url, config).then((res)=>{
      setPlans(res.data.results);
    }).catch((err)=>{
      toast.error(err.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    });
  },[])
  const addUser = (event) => {
    event.preventDefault();
    let error = {status:0,name:'',address:'',email:'',phone:'',city:'',state:'',country:'',plan:''};
    if(addData.name == ''){error.name = 'Name is required.';error.status=1}else{error.name = ''}
    if(addData.phone<=0 || addData.phone == ''){error.phone = 'Please enter phone number.';error.status=1}else{error.phone = ''}
    if(addData.email<=0 || addData.email == ''){error.email = 'Please enter email.';error.status=1}else{error.email = ''}
    if(addData.address<=0 || addData.address == ''){error.address = 'Please enter address.';error.status=1}else{error.address = ''}
    if(addData.city<=0 || addData.city == ''){error.city = 'Please enter city.';error.status=1}else{error.city = ''}
    if(addData.state<=0 || addData.state == ''){error.state = 'Please enter state.';error.status=1}else{error.state = ''}
    if(addData.country<=0 || addData.country == ''){error.country = 'Please enter country.';error.status=1}else{error.country = ''}
    if(addData.plan_id<=0  || addData.plan_id == ''){error.plan = 'Please select plan.';error.status=1}else{error.plan = ''}
    setAddData({...addData,nameerr:error.name,phoneerr:error.phone,emailerr:error.email,addresserr:error.address,cityerr:error.city,stateerr:error.state,countryerr:error.country,planerr:error.plan});
    if(error.status == 0){
      let url = '';
      let user = {
        fullname : addData.name,
        address : addData.address,
        email : addData.email,
        phone : addData.phone,
        city : addData.city,
        state : addData.state,
        country : addData.country,
        plan_id : addData.plan_id
      };
      config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      if(addData.public_id==0){
        url = `${apiPath}adduser`;
        axios.post(url, user, config).then((res)=>{
          let oldArray = users;
          oldArray.unshift(res.data.results[0]);
          setAddData({
            public_id:0,
            name:'',nameerr:'',
            address:'',addresserr:'',
            email:'',emailerr:'',
            phone:'',phoneerr:'',
            city:'',cityerr:'',
            state:'',stateerr:'',
            country:'',countryerr:'',
            referby:'',referbyerr:'',
            plan_id:'',planerr:'',planname:''});
          setUsers([]);
          setUsers(oldArray);
          setShow(false);
          toast.success(res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
        }).catch((err)=>{
          toast.error(err.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
        });
      }else{
        url = `${apiPath}edituser/${addData.public_id}`;
        axios.patch(url, user, config).then((res)=>{
          toast.success(res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 9000,
          });
          let url = `${apiPath}users`;
          config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
          axios.get(url, config).then((res)=>{
            setUsers(res.data.results);
            setAddData({
              public_id:0,
              name:'',nameerr:'',
              address:'',addresserr:'',
              email:'',emailerr:'',
              phone:'',phoneerr:'',
              city:'',cityerr:'',
              state:'',stateerr:'',
              country:'',countryerr:'',
              referby:'',referbyerr:'',
              plan_id:'',planerr:'',planname:''});
          }).catch((err)=>{
            toast.error(err.response.data.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 3000,
            });
          });
          setShow(false);
        }).catch((err)=>{
          toast.error(err.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
        });
      } 
    }
  }
  let onEdit = (user) => {
    setShow(true);
    setAddData({
      public_id:user.public_id,
      name:user.fullname,
      address:user.address,
      email:user.email,
      phone:user.phone,
      city:user.city,
      state:user.state,
      country:user.country,
      referby:'',
      plan_id:user.plan_id,planname:user.planname,});
  }
  let changeStatus = (public_id) => {
    const confirmBox = window.confirm(
      "Do you really want to extend plan ?"
    )
    if (confirmBox === true) {
      // let url = `${apiPath}changeplan/${public_id}`;
      // config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      // axios.patch(url, public_id, config).then((res)=>{console.log(res);
      //   setErr('Status succssfully changed.');
      //   let newArray = plans.slice();
      //   newArray.find((o, i) => {
      //       if (o.public_id == public_id) {
      //         newArray[i] = {
      //           name:res.data.results.name, 
      //           consultation: res.data.results.consultation,
      //           onelinequestion: res.data.results.onelinequestion,
      //           discountamount: res.data.results.discountamount, 
      //           amount: res.data.results.amount,
      //           status: res.data.results.status,
      //           public_id:res.data.results.public_id };
      //         return true; // stop searching
      //       }
      //   });
      //   setPlans(newArray);
      // }).catch((err)=>{console.log(err);
      //   setErr(err.response.data.message);
      // });
    }
  }
  let changeView = (user) => {
    setView(true);
    setUser(user);
  }
  let getformateddate = (tdate) => {
    const today = new Date(tdate);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return dd + '/' + mm + '/' + yyyy;;
  }
  return (
    <Row>
      <Modal show={view} backdrop="static" keyboard={false} size="lg">
        <Modal.Header>
          User Details
        </Modal.Header>
        <Modal.Body>
          <UserView userdata={user}/>
        </Modal.Body>
        <Modal.Footer>
            <Button className="btn m-2" color="danger" onClick={()=>{setView(false)}}>Close</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show} backdrop="static" keyboard={false} >
        <Modal.Header>
          Enter Detailscsc
        </Modal.Header>
        <Modal.Body>
          {(err != '')?<Alert color="danger">{err}</Alert>:null}
          <Form onSubmit={addUser}>
            <input type="hidden" name="public_id" defaultValue={user.public_id} />
            <FormGroup>
              <Input name="name" placeholder="Full Name" defaultValue={addData.name} type="text" onChange={(e)=>{e.target.value.trim()!==''?setAddData({...addData,name:e.target.value,nameerr:''}):setAddData({...addData,name:'',nameerr:'Full name is required.'})}} /><small className="text-danger">{addData.nameerr}</small>
            </FormGroup>
            <FormGroup>
              <Input name="phone" placeholder="Phone Number" type="text" maxLength={10}  defaultValue={addData.phone}  onChange={(e)=>{e.target.value>0?setAddData({...addData,phone:e.target.value,phoneerr:''}):setAddData({...addData,phone:'',phoneerr:'Phone number is required or invalid'})}} /><small className="text-danger">{addData.phoneerr}</small>
            </FormGroup>
            <FormGroup>
              <Input defaultValue={addData.email} name="email" placeholder="email" type="email" onChange={(e)=>{(RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(e.target.value.trim()))?setAddData({...addData,email:'',email:e.target.value,emailerr:''}):setAddData({...addData,emailerr:'Email format is wrong.'})}} /><small className="text-danger">{addData.emailerr}</small>
            </FormGroup>
            <FormGroup>
              <Input name="address" placeholder="Address" defaultValue={addData.address} type="text" onChange={(e)=>{e.target.value.trim()!==''?setAddData({...addData,address:e.target.value,addresserr:''}):setAddData({...addData,address:'',addresserr:'Address is required.'})}} /><small className="text-danger">{addData.addresserr}</small>
            </FormGroup>
            <FormGroup>
              <Input defaultValue={addData.city} name="city" placeholder="Enter city" type="text" onChange={(e)=>{e.target.value.trim()!==''?setAddData({...addData,city:e.target.value,cityerr:''}):setAddData({...addData,city:'',cityerr:'Please enter city.'})}} /><small className="text-danger">{addData.cityerr}</small>
            </FormGroup>
            <FormGroup>
              <Input defaultValue={addData.state} name="state" placeholder="Enter State" type="text" onChange={(e)=>{e.target.value.trim()!==''?setAddData({...addData,state:e.target.value,stateerr:''}):setAddData({...addData,state:'',stateerr:'Please enter state.'})}} /><small className="text-danger">{addData.stateerr}</small>
            </FormGroup>
            <FormGroup>
              <Input defaultValue={addData.country} name="country" placeholder="Enter country" type="text" onChange={(e)=>{e.target.value.trim()!==''?setAddData({...addData,country:e.target.value,countryerr:''}):setAddData({...addData,country:'',countryerr:'Please enter country.'})}} /><small className="text-danger">{addData.countryerr}</small>
            </FormGroup>
            <FormGroup>
              <Input onChange={(e)=>{e.target.value>0?setAddData({...addData,plan_id:e.target.value,planerr:''}):setAddData({...addData,plan_id:'',planerr:'Please select plan.'})}}  name="plan" type="select">
                  <option value="0" selected={true} disabled>Select Plan</option>
                  {
                      plans.map((plan) => {
                          return(
                            <>
                              <option key={plan.public_id} selected={addData.plan_id == plan.public_id} value={plan.public_id}>{plan.name}</option>
                            </>
                          )
                      })
                  }
              </Input><small className="text-danger">{addData.planerr}</small>
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
            User List
          </CardTitle>
          <CardBody className="">
            {(err != '')?<Alert color="danger">{err}</Alert>:null}
            <Row>
              <Col>
                <FormGroup>
                <Button className="btn" color="light-danger" onClick={()=>setShow(true)}>Add</Button>
                </FormGroup>
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Input name="search" placeholder="Enter name or Mobile Number" defaultValue={search} type="text" onChange={(e)=>{setSearch(e.target.value)}} />
                </FormGroup>
              </Col>
              <Col></Col>
              <Col></Col>
            </Row>
            <Table bordered responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>City</th>
                  <th>Plan</th>
                  <th>Expire Date</th>
                  {/* <th>Plan Extend</th> */}
                  <th>View</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
              {users.length === 0?
                <tr>
                      <td colSpan={7}>No user found.</td>
                </tr>:
                users.filter((user) => {
                  if (search === "") {
                    return user
                  } else if ((user.fullname || '').toLowerCase().includes((search || '').toLowerCase())||
                  user.phone.toString().includes(search))
                  {
                    return user
                  }
                }).map((user,index) => {
                  return (
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>{user.fullname}</td>
                      <td>{user.phone}</td>
                      <td>{user.city}</td>
                      <td>{user.planname}</td>
                      <td>{getformateddate(user.plan_expire_date)}</td>
                      {/* <td><Button className="btn" color="light-danger" onClick={() => changeStatus(user.public_id)}>Click here</Button></td> */}
                      <td><Button className="btn" color="light-danger" onClick={() => changeView(user)}>View</Button></td>
                      <td><Button className="btn" color="light-danger" onClick={()=>onEdit(user)}>Edit</Button></td>
                    </tr>
                  )
                })
              }
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
      <ToastContainer />
    </Row>
  );
};

export default Users;
