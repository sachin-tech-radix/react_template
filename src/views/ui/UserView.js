import { useEffect, useState } from "react";
import { Badge, Card,Row,Col,Table, Form, CardText, Button, Input, FormGroup } from "reactstrap";
import { apiPath, config } from "../../Constants";
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const UserView = (user) => {
  let [addAppointment, setAddAppointment] = useState(false);
  let [appointments, setAppointments] = useState([]);
  let [plan, setPlan] = useState({consultancy:null,onelineque:null});
  let [currentPlan, setCurrentPlan] = useState({consultancy:null,onelineque:null});
  let [addData, setAddData] = useState({type:1,name:'',appointmenttype:null});
  let [nameerror, setNameerror] = useState('');
  let [load, setLoad] = useState(0);

  useEffect(()=>{
    let url = `${apiPath}userplans/${user.userdata.id}`;
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    axios.get(url, config).then((res)=>{
      setAppointments(res.data.results[1]);
      setCurrentPlan({...plan,consultancy:res.data.results[0][0].app_type_count,onelineque:res.data.results[0][1].app_type_count});
    }).catch((err)=>{
      setAppointments(err.response.data.results);
    });
  },[load])
  useEffect(()=>{
    let url = `${apiPath}plan/${user.userdata.plan_id}`;
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    axios.get(url, config).then((res)=>{
      setPlan({...plan,planname:res.data.results[0].name,consultancy:res.data.results[0].consultation,onelineque:res.data.results[0].onelinequestion});
    }).catch((err)=>{
      setPlan(err.response.data.results);
    });
  },[load])
  let getformateddate = (tdate) => {
    const today = new Date(tdate);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return dd + '/' + mm + '/' + yyyy;;
  }
  let addApp = (e) => {
    e.preventDefault();
    if(Number(addData.type) === 2 && Number(addData.name.trim().length) <= 0){
      setNameerror('Please enter name.');
    }else{
      setNameerror('');
      let app = {
        name : addData.name,
        type : addData.type,
        appointmenttype : addData.appointmenttype,
        user_id : user.userdata.id
      };
      let url = `${apiPath}addapp`;
      axios.post(url, app, config).then((res)=>{
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        setAddAppointment(false);
        setLoad(1);
      }).catch((err)=>{
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      });
    }
  }
  return (
    <div>
      <Modal show={addAppointment} backdrop="static" keyboard={false}>
        <Form onSubmit={addApp}>
        <Modal.Header>
          User Details{JSON.stringify(addData)}
        </Modal.Header>
        <Modal.Body>
            <FormGroup>
              <Input onChange={(e)=>{setAddData({...addData,type:e.target.value})}}  name="type" type="select" style={{width:"40%"}}>
                  <option value="1" >Self</option>
                  <option value="2" >Other</option>
              </Input>
            </FormGroup>
            {Number(addData.type) === 2 && 
            <FormGroup>
              <Input name="name" placeholder="Enter name" type="text" onChange={(e)=>{setAddData({...addData,name:e.target.value})}} style={{width:"40%"}} />
              <small className="text-danger">{nameerror}</small>
            </FormGroup>
            }
        </Modal.Body>
        <Modal.Footer>
            <Button className="btn" color="light-danger" type="submit" >Save</Button>
            <Button className="btn m-2" color="danger" onClick={()=>{setAddAppointment(false)}}>Close</Button>
        </Modal.Footer>
        </Form>
      </Modal>
      <Row>
        <h4><Badge color="secondary">{plan.planname} </Badge> plan with <Badge>{plan.consultancy}</Badge> consultancy and <Badge>{plan.onelineque}</Badge> one line question</h4>
        <h4>Reamaining consultancy <Badge color="secondary">{Number(plan.consultancy)-Number(currentPlan.consultancy)}</Badge> 
        {Number(plan.onelineque)>0 &&
          <>
            &nbsp;&nbsp;&nbsp;<Button className="btn" color="light-danger" value='1' onClick={()=>{setAddData({...addData,appointmenttype:1,type:1});setAddAppointment(true)}}>Add Consultancy</Button>
          </>
        }
        </h4>
        <h4>Reamaining One line Question <Badge color="secondary">{Number(plan.onelineque)-Number(currentPlan.onelineque)}</Badge>
        {Number(plan.onelineque)>0 &&
          <>
            &nbsp;&nbsp;&nbsp;<Button className="btn" color="light-danger" value='2' onClick={()=>{setAddData({...addData,appointmenttype:2,type:1});setAddAppointment(true)}}>Add One Line Question</Button></>
        }
        </h4>
      </Row>
      <Row>
        <Col md="6" lg="6" sm="12">
          <Card body>
            <Table responsive>
              <tbody>
                <tr>
                  <td align="right">Name:</td>
                  <td align="left">{user.userdata.fullname}</td>
                </tr>
                <tr>
                  <td align="right">Phone:</td>
                  <td align="left">{user.userdata.phone}</td>
                </tr>
                <tr>
                  <td align="right">Address:</td>
                  <td align="left">{user.userdata.address}</td>
                </tr>
                <tr>
                  <td align="right">State:</td>
                  <td align="left">{user.userdata.state}</td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </Col>
        <Col md="6" lg="6" sm="12">
          <Card body className="text-center">
            <Table responsive>
              <tbody>
                <tr>
                  <td align="right">plan name:</td>
                  <td align="left">{user.userdata.planname}</td>
                </tr>
                <tr>
                  <td align="right">Email:</td>
                  <td align="left">{user.userdata.email}</td>
                </tr>
                <tr>
                  <td align="right">City:</td>
                  <td align="left">{user.userdata.city}</td>
                </tr>
                <tr>
                  <td align="right">Country:</td>
                  <td align="left">{user.userdata.country}</td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
      <Table bordered responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Appointments Type</th>
            <th>Appointments Date</th>
          </tr>
        </thead>
        <tbody>
        {appointments.length === 0?
          <tr>
                <td colSpan={4}>No user found.</td>
          </tr>:
          appointments.map((appointments,index) => {
            return (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{(appointments.fuser_name === null?"Self":appointments.fuser_name)}</td>
                <td>{appointments.appointment_type === 1?"Consultancy":"One Line Question"}</td>
                <td>{getformateddate(appointments.appointment_date)}</td>
              </tr>
            )
          })
        }
        </tbody>
      </Table>
    </div>
  );
};

export default UserView;
