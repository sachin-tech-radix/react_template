import {useState, useEffect} from 'react';
import { BiRupee } from "react-icons/bi";
import { Alert, Card, Row, Col, CardTitle, CardBody, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { templatePath,apiPath, config, amount } from "../../Constants";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { AutoComplete } from 'primereact/autocomplete';

const Forms = () => {
  let { shopid } = useParams();
  let [loading, setLoading] = useState(false);
  let [addData, setAddData] = useState({'fname':'','email':'','phone':'','dob':'','tob':'','pob':'','amount':amount});
  let [nameerr, setNameerr] = useState("");
  let [emailerr, setEmailerr] = useState("");
  let [phoneerr, setPhoneerr] = useState("");
  let [doberr, setDobErr] = useState("");
  let [toberr, setTobErr] = useState("");
  let [poberr, setPobErr] = useState("");
  //let [pobcity, setpobcity] = useState([]);
  let [amountErr, setAmountErr] = useState("");
  let [err, setErr] = useState('');
  let [shop, setShop] = useState({name:null,id:null});

  let [formStatus, setformStatus] = useState(1);
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
    setSelectedCountry1(e.target.value)
    if(e.target.value.name === undefined){
      setAddData({...addData,pob:e.target.value});
    }else{
      setAddData({...addData,pob:e.target.value.name});
    }
    if(e.target.value===''){setPobErr('place of Birth is required');}else{setPobErr('');}
  }
  let changeAmount = (e) => {
    setAddData({...addData,[e.target.name]:e.target.value});
    if(e.target.value.trim()===''){setAmountErr('amount is required');}else{setAmountErr('');}
  }
  let profile = (e) => {
    setLoading(true);
    e.preventDefault();
    let error = 0;
    if(addData.fname.trim()===''){error=1;setNameerr('Full Name is required');}else{setNameerr('');}
    if(!(RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(addData.email.trim()))){error=1;setEmailerr('Email is required or invalid');}else{setEmailerr('');}
    if(addData.phone==='' || addData.phone.length > 10 || isNaN(addData.phone)){error=1;setPhoneerr('Phone number is required or invalid');}else{setPhoneerr('');}
    if(addData.dob.trim()===''){error=1;setDobErr('Date of Birth is required');}else{setDobErr('');}
    if(addData.tob.trim()===''){error=1;setTobErr('Time of Birth is required');}else{setTobErr('');}
    if(addData.pob.trim()===''){error=1;setPobErr('place of Birth is required');}else{setPobErr('');}
    if(error==0){
      setformStatus(2)
    }
    setLoading(false);
  }

  let payment = (e) => {
    setLoading(true);
    e.preventDefault();
    let error = 0;
    if(addData.fname.trim()===''){error=1;setNameerr('Full Name is required');}else{setNameerr('');}
    if(!(RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(addData.email.trim()))){error=1;setEmailerr('Email is required or invalid');}else{setEmailerr('');}
    if(addData.phone==='' || addData.phone.length > 10 || isNaN(addData.phone)){error=1;setPhoneerr('Phone number is required or invalid');}else{setPhoneerr('');}
    if(addData.dob.trim()===''){error=1;setDobErr('Date of Birth is required');}else{setDobErr('');}
    if(addData.tob.trim()===''){error=1;setTobErr('Time of Birth is required');}else{setTobErr('');}
    if(addData.pob.trim()===''){error=1;setPobErr('place of Birth is required');}else{setPobErr('');}
    if(addData.amount===''){error=1;setAmountErr('amount is required');}else{setAmountErr('');}
    if(error==0){
      //setformStatus(3)
      displayRazorpay(addData.amount);
      // let user = {
      //   fname : addData.fname,
      //   email : addData.email,
      //   phone : addData.phone,
      //   dob : addData.dob,
      //   tob : addData.tob,
      //   pob : addData.pob,
      //   amount : addData.amount,
      //   shop_id : shopid,
      //   transaction_id : 'fjfdfd4564545d'
      // };
      // let url = `${apiPath}user/insertuser`;
      // axios.post(url, user, config).then((res)=>{
      //   setErr(res.data.message);
      // }).catch((err)=>{
      //   setErr(err.response.data.message);
      // });
    }
    setLoading(false);
  }
  //Razorpay pament functions
  const loadScript = (src) => {
    return new Promise((resovle) => {
        const script = document.createElement("script");
        script.src = src;
    
        script.onload = () => {
            resovle(true);
        };
    
        script.onerror = () => {
            resovle(false);
        };
    
        document.body.appendChild(script);
    });
  };

  const displayRazorpay = async (amount) => {
    const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      setErr("You are offline... Failed to load Razorpay SDK");  
      return;
    }

    const options = {
        key: "rzp_test_Gx83phOTSCCAk4",
        currency: "INR",
        amount: amount * 100,
        name: "Cosmos Vedic World",
        description: "Thanks for purchasing",
        image:
            `${templatePath}/static/media/logo.c472494e.png`,
    
        handler: function (response) {
            //alert(response.razorpay_payment_id);
            let user = {
              fname : addData.fname,
              email : addData.email,
              phone : addData.phone,
              dob : addData.dob,
              tob : addData.tob,
              pob : addData.pob,
              amount : addData.amount,
              shop_id : shopid,
              transaction_id : response.razorpay_payment_id
            };
            let url = `${apiPath}user/insertuser`;
            axios.post(url, user, config).then((res)=>{
              setErr(res.data.message);
            }).catch((err)=>{
              setErr(err.response.data.message);
            });
        },
        prefill: {
            name: "Cosmos Vedic World",
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  useEffect(()=>{
    let url = `${apiPath}shop/${shopid}`;
    axios.get(url, config).then((res)=>{
      setShop(res.data.result);
    }).catch((err)=>{console.log(err.message);
      if(err.message === 'Network Error'){
        setErr(err.message);
      }else{
        setErr(err.response.data.message);
      }
    });
  },[])
  //Suggestions for Place of birth
  const [countries, setCountries] = useState([{"name": "Adilabad"},{"name": "Agra"},{"name": "Ahmedabad"},{"name": "Ahmednagar"},{"name": "Aizawl"},{"name": "Ajmer"},{"name": "Akola"},{"name": "Alappuzha"},{"name": "Aligarh"},{"name": "Alirajpur"},{"name": "Allahabad"},{"name": "Almora"},{"name": "Alwar"},{"name": "Ambala"},{"name": "Ambedkar Nagar"},{"name": "Amrawati"},{"name": "Amreli District"},{"name": "Amritsar"},{"name": "Anand"},{"name": "Anantapur"},{"name": "Anantnag"},{"name": "Angul"},{"name": "Anjaw"},{"name": "Anuppur"},{"name": "Araria"},{"name": "Ariyalur"},{"name": "Ashok Nagar"},{"name": "Auraiya"},{"name": "Aurangabad"},{"name": "Aurangabad"},{"name": "Azamgarh"},{"name": "Badaun"},{"name": "Badgam"},{"name": "Bagalkot"},{"name": "Bageshwar"},{"name": "Bagpat"},{"name": "Bahraich"},{"name": "Balaghat"},{"name": "Baleswar"},{"name": "Ballia"},{"name": "Balrampur"},{"name": "Banaskantha"},{"name": "Banda"},{"name": "Bandipore"},{"name": "Bangalore Rural District"},{"name": "Bangalore Urban District"},{"name": "Banka"},{"name": "Bankura"},{"name": "Banswara"},{"name": "Barabanki"},{"name": "Baramula"},{"name": "Baran"},{"name": "Bardhaman"},{"name": "Bareilly"},{"name": "Bargarh"},{"name": "Barmer"},{"name": "Barpeta"},{"name": "Barwani"},{"name": "Bastar"},{"name": "Basti"},{"name": "Bathinda"},{"name": "Beed"},{"name": "Begusarai"},{"name": "Belgaum"},{"name": "Bellary"},{"name": "Betul"},{"name": "Bhadrak"},{"name": "Bhagalpur"},{"name": "Bhandara"},{"name": "Bharatpur"},{"name": "Bharuch"},{"name": "Bhavnagar"},{"name": "Bhilwara"},{"name": "Bhind"},{"name": "Bhiwani"},{"name": "Bhojpur"},{"name": "Bhopal"},{"name": "Bidar"},{"name": "Bijapur"},{"name": "Bijnor"},{"name": "Bikaner"},{"name": "Bilaspur"},{"name": "Bilaspur"},{"name": "Birbhum"},{"name": "Bishnupur"},{"name": "Bokaro"},{"name": "Bolangir"},{"name": "Bongaigaon"},{"name": "Boudh"},{"name": "Bulandshahr"},{"name": "Buldhana"},{"name": "Bundi"},{"name": "Burhanpur"},{"name": "Buxar"},{"name": "Cachar"},{"name": "Central Delhi"},{"name": "Chamarajnagar"},{"name": "Chamba"},{"name": "Chamoli"},{"name": "Champawat"},{"name": "Champhai"},{"name": "Chandauli"},{"name": "Chandel"},{"name": "Chandrapur"},{"name": "Changlang"},{"name": "Chatra"},{"name": "Chennai"},{"name": "Chhatarpur"},{"name": "Chhindwara"},{"name": "Chikballapur"},{"name": "Chikmagalur"},{"name": "Chitradurga"},{"name": "Chitrakoot"},{"name": "Chittoor"},{"name": "Chittorgarh"},{"name": "Churachandpur"},{"name": "Churu"},{"name": "Coimbatore"},{"name": "Cooch Behar"},{"name": "Cuddalore"},{"name": "Cuttack"},{"name": "Dahod"},{"name": "Dakshin Dinajpur"},{"name": "Dakshina Kannada"},{"name": "Daman"},{"name": "Damoh"},{"name": "Dantewada"},{"name": "Darbhanga"},{"name": "Darjeeling"},{"name": "Darrang"},{"name": "Datia"},{"name": "Dausa"},{"name": "Davanagere"},{"name": "Debagarh"},{"name": "Dehradun"},{"name": "Deoghar"},{"name": "Deoria"},{"name": "Dewas"},{"name": "Dhalai"},{"name": "Dhamtari"},{"name": "Dhanbad"},{"name": "Dhar"},{"name": "Dharmapuri"},{"name": "Dharwad"},{"name": "Dhemaji"},{"name": "Dhenkanal"},{"name": "Dholpur"},{"name": "Dhubri"},{"name": "Dhule"},{"name": "Dibang Valley"},{"name": "Dibrugarh"},{"name": "Dimapur"},{"name": "Dindigul"},{"name": "Dindori"},{"name": "Diu"},{"name": "Doda"},{"name": "Dumka"},{"name": "Dungapur"},{"name": "Durg"},{"name": "East Delhi"},{"name": "East Garo Hills"},{"name": "East Godavari"},{"name": "East Kameng"},{"name": "East Khasi Hills"},{"name": "East Sikkim"},{"name": "Ernakulam"},{"name": "Erode"},{"name": "Etah"},{"name": "Etawah"},{"name": "Faizabad"},{"name": "Faridabad"},{"name": "Faridkot"},{"name": "Farrukhabad"},{"name": "Fatehabad"},{"name": "Fatehgarh Sahib"},{"name": "Fatehpur"},{"name": "Firozabad"},{"name": "Firozpur"},{"name": "Gadag"},{"name": "Gadchiroli"},{"name": "Gajapati"},{"name": "Gandhinagar"},{"name": "Ganganagar"},{"name": "Ganjam"},{"name": "Garhwa"},{"name": "Gautam Buddha Nagar"},{"name": "Gaya"},{"name": "Ghaziabad"},{"name": "Ghazipur"},{"name": "Giridih"},{"name": "Goalpara"},{"name": "Godda"},{"name": "Golaghat"},{"name": "Gonda"},{"name": "Gondiya"},{"name": "Gopalganj"},{"name": "Gorkakhpur"},{"name": "Gulbarga"},{"name": "Gumla"},{"name": "Guna"},{"name": "Guntur"},{"name": "Gurdaspur"},{"name": "Gurgaon"},{"name": "Gwalior"},{"name": "Hailakandi"},{"name": "Hamirpur"},{"name": "Hamirpur"},{"name": "Hanumangarh"},{"name": "Harda"},{"name": "Hardoi"},{"name": "Haridwar"},{"name": "Hassan"},{"name": "Haveri District"},{"name": "Hazaribagh"},{"name": "Hingoli"},{"name": "Hissar"},{"name": "Hooghly"},{"name": "Hoshangabad"},{"name": "Hoshiarpur"},{"name": "Howrah"},{"name": "Hyderabad"},{"name": "Idukki"},{"name": "Imphal East"},{"name": "Imphal West"},{"name": "Indore"},{"name": "Jabalpur"},{"name": "Jagatsinghpur"},{"name": "Jaintia Hills"},{"name": "Jaipur"},{"name": "Jaisalmer"},{"name": "Jajapur"},{"name": "Jalandhar"},{"name": "Jalaun"},{"name": "Jalgaon"},{"name": "Jalna"},{"name": "Jalore"},{"name": "Jalpaiguri"},{"name": "Jammu"},{"name": "Jamnagar"},{"name": "Jamui"},{"name": "Janjgir-Champa"},{"name": "Jashpur"},{"name": "Jaunpur District"},{"name": "Jehanabad"},{"name": "Jhabua"},{"name": "Jhajjar"},{"name": "Jhalawar"},{"name": "Jhansi"},{"name": "Jharsuguda"},{"name": "Jind"},{"name": "Jodhpur"},{"name": "Jorhat"},{"name": "Juhnjhunun"},{"name": "Junagadh"},{"name": "Jyotiba Phule Nagar"},{"name": "Kadapa"},{"name": "Kaimur"},{"name": "Kaithal"},{"name": "Kalahandi"},{"name": "Kanchipuram"},{"name": "Kandhamal"},{"name": "Kangra"},{"name": "Kanker"},{"name": "Kannauj"},{"name": "Kannur"},{"name": "Kanpur Dehat"},{"name": "Kanpur Nagar"},{"name": "Kanshiram Nagar"},{"name": "Kanyakumari"},{"name": "Kapurthala"},{"name": "Karaikal"},{"name": "Karauli"},{"name": "Karbi Anglong"},{"name": "Kargil"},{"name": "Karimganj"},{"name": "Karimnagar"},{"name": "Karnal"},{"name": "Karur"},{"name": "Kasaragod"},{"name": "Kathua"},{"name": "Katihar"},{"name": "Katni"},{"name": "Kaushambi"},{"name": "Kawardha"},{"name": "Kendrapara"},{"name": "Kendujhar"},{"name": "Khagaria"},{"name": "Khammam"},{"name": "Khandwa"},{"name": "Khargone"},{"name": "Kheda"},{"name": "Khordha"},{"name": "Kinnaur"},{"name": "Kishanganj"},{"name": "Kodagu"},{"name": "Koderma"},{"name": "Kohima"},{"name": "Kokrajhar"},{"name": "Kolar"},{"name": "Kolasib"},{"name": "Kolhapur"},{"name": "Kolkata"},{"name": "Kollam"},{"name": "Koppal"},{"name": "Koraput"},{"name": "Korba"},{"name": "Koriya"},{"name": "Kota"},{"name": "Kottayam"},{"name": "Kozhikode"},{"name": "Krishna"},{"name": "Kulu"},{"name": "Kupwara"},{"name": "Kurnool"},{"name": "Kurukshetra"},{"name": "Kushinagar"},{"name": "Kutch"},{"name": "Lahaul and Spiti"},{"name": "Lakhimpur"},{"name": "Lakhimpur Kheri"},{"name": "Lakhisarai"},{"name": "Lalitpur"},{"name": "Latur"},{"name": "Lawngtlai"},{"name": "Leh"},{"name": "Lohardaga"},{"name": "Lohit"},{"name": "Lower Subansiri"},{"name": "Lucknow"},{"name": "Ludhiana"},{"name": "Lunglei"},{"name": "Madhepura"},{"name": "Madhubani"},{"name": "Madurai"},{"name": "Mahamaya Nagar"},{"name": "Maharajganj"},{"name": "Mahasamund"},{"name": "Mahbubnagar"},{"name": "Mahe"},{"name": "Mahendragarh"},{"name": "Mahoba"},{"name": "Mainpuri"},{"name": "Malappuram"},{"name": "Malda"},{"name": "Malkangiri"},{"name": "Mamit"},{"name": "Mandi"},{"name": "Mandla"},{"name": "Mandsaur"},{"name": "Mandya"},{"name": "Mansa"},{"name": "Marigaon"},{"name": "Mathura"},{"name": "Mau"},{"name": "Mayurbhanj"},{"name": "Medak"},{"name": "Meerut"},{"name": "Mehsana"},{"name": "Mewat"},{"name": "Midnapore"},{"name": "Mirzapur"},{"name": "Moga"},{"name": "Mokokchung"},{"name": "Mon"},{"name": "Moradabad"},{"name": "Morena"},{"name": "Mukatsar"},{"name": "Mumbai name"},{"name": "Mumbai suburban"},{"name": "Munger"},{"name": "Murshidabad"},{"name": "Muzaffarnagar"},{"name": "Muzaffarpur"},{"name": "Mysore"},{"name": "Nabarangpur"},{"name": "Nadia"},{"name": "Nagaon"},{"name": "Nagapattinam"},{"name": "Nagaur"},{"name": "Nagpur"},{"name": "Nainital"},{"name": "Nalanda"},{"name": "Nalbari"},{"name": "Nalgonda"},{"name": "Namakkal"},{"name": "Nanded"},{"name": "Nandurbar"},{"name": "Narmada"},{"name": "Narsinghpur"},{"name": "Nashik"},{"name": "Navsari"},{"name": "Nawada"},{"name": "Nawan Shehar"},{"name": "Nayagarh"},{"name": "Neemuch"},{"name": "Nellore"},{"name": "New Delhi"},{"name": "Nicobar"},{"name": "Nizamabad"},{"name": "North 24 Parganas"},{"name": "North and Middle Andaman"},{"name": "North Cachar Hills"},{"name": "North Delhi"},{"name": "North East Delhi"},{"name": "North Goa"},{"name": "North Sikkim"},{"name": "North Tripura"},{"name": "North West Delhi"},{"name": "Nuapada"},{"name": "Osmanabad"},{"name": "Pakur"},{"name": "Palakkad"},{"name": "Palamu"},{"name": "Pali"},{"name": "Palwal"},{"name": "Panchkula"},{"name": "Panchmahal"},{"name": "Panipat"},{"name": "Panna"},{"name": "Papum Pare"},{"name": "Parbhani"},{"name": "Pashchim Champaran"},{"name": "Pashchim Singhbhum"},{"name": "Patan"},{"name": "Pathanamthitta"},{"name": "Patiala"},{"name": "Patna"},{"name": "Pauri Garhwal"},{"name": "Perambalur"},{"name": "Phek"},{"name": "Pilibhit"},{"name": "Pithoragharh"},{"name": "Poonch"},{"name": "Porbandar"},{"name": "Prakasam"},{"name": "Pratapgarh"},{"name": "Pratapgarh"},{"name": "Puducherry"},{"name": "Pudukkottai"},{"name": "Pulwama"},{"name": "Pune"},{"name": "Purba Champaran"},{"name": "Purba Singhbhum"},{"name": "Puri"},{"name": "Purnia"},{"name": "Purulia"},{"name": "Rae Bareli"},{"name": "Raichur"},{"name": "Raigad"},{"name": "Raigarh"},{"name": "Raipur"},{"name": "Raisen"},{"name": "Rajauri"},{"name": "Rajgarh"},{"name": "Rajkot"},{"name": "Rajnandgaon"},{"name": "Rajsamand"},{"name": "Ramanagara"},{"name": "Ramanathapuram"},{"name": "Ramgarh"},{"name": "Rampur"},{"name": "Ranchi"},{"name": "Rangareddi"},{"name": "Ratlam"},{"name": "Ratnagiri"},{"name": "Rayagada"},{"name": "Rewa"},{"name": "Rewari"},{"name": "Ri-Bhoi"},{"name": "Rohtak"},{"name": "Rohtas"},{"name": "Rudraprayag"},{"name": "Rupnagar"},{"name": "Sabarkantha"},{"name": "Sagar"},{"name": "Saharanpur"},{"name": "Saharsa"},{"name": "Sahibganj"},{"name": "Saiha"},{"name": "Salem"},{"name": "Samastipur"},{"name": "Samba"},{"name": "Sambalpur"},{"name": "Sangli"},{"name": "Sangrur"},{"name": "Sant Kabir Nagar"},{"name": "Sant Ravidas Nagar"},{"name": "Saran"},{"name": "Satara"},{"name": "Satna"},{"name": "Sawai Madhopur"},{"name": "Sehore"},{"name": "Senapati"},{"name": "Seoni"},{"name": "Seraikela and Kharsawan"},{"name": "Serchhip"},{"name": "Shahdol"},{"name": "Shahjahanpur"},{"name": "Shajapur"},{"name": "Sheikhpura"},{"name": "Sheohar"},{"name": "Sheopur"},{"name": "Shimla"},{"name": "Shimoga"},{"name": "Shivpuri"},{"name": "Shravasti"},{"name": "Sibsagar"},{"name": "Siddharthnagar"},{"name": "Sidhi"},{"name": "Sikar"},{"name": "Sindhudurg"},{"name": "Singrauli"},{"name": "Sirmaur"},{"name": "Sirohi"},{"name": "Sirsa"},{"name": "Sitamarhi"},{"name": "Sitapur"},{"name": "Sivagangai"},{"name": "Siwan"},{"name": "Solan"},{"name": "Solapur"},{"name": "Sonbhadra"},{"name": "Sonepat"},{"name": "Sonitpur"},{"name": "South 24 Parganas"},{"name": "South Andaman"},{"name": "South Delhi"},{"name": "South Garo Hills"},{"name": "South Goa"},{"name": "South Sikkim"},{"name": "South Tripura"},{"name": "South West Delhi"},{"name": "Srikakulam"},{"name": "Srinagar"},{"name": "Subarnapur"},{"name": "Sultanpur"},{"name": "Sundargarh"},{"name": "Supaul"},{"name": "Surat"},{"name": "Surendranagar"},{"name": "Surguja"},{"name": "Tamenglong"},{"name": "Tehri Garhwal"},{"name": "Thane"},{"name": "Thanjavur"},{"name": "The Dangs"},{"name": "The Nilgiris"},{"name": "Theni"},{"name": "Thiruvallur"},{"name": "Thiruvananthapuram"},{"name": "Thiruvarur"},{"name": "Thoothukudi"},{"name": "Thoubal"},{"name": "Thrissur"},{"name": "Tikamgarh"},{"name": "Tinsukia"},{"name": "Tirap"},{"name": "Tiruchirappalli"},{"name": "Tirunelveli"},{"name": "Tiruppur"},{"name": "Tiruvannamalai"},{"name": "Tonk"},{"name": "Tuensang"},{"name": "Tumkur"},{"name": "Udaipur"},{"name": "Udham Singh Nagar"},{"name": "Udhampur"},{"name": "Udupi"},{"name": "Ujjain"},{"name": "Ukhrul"},{"name": "Umaria"},{"name": "Una"},{"name": "Unnao"},{"name": "Upper Subansiri"},{"name": "Uttar Dinajpur"},{"name": "Uttara Kannada"},{"name": "Uttarkashi"},{"name": "Vadodara"},{"name": "Vaishali"},{"name": "Valsad"},{"name": "Varanasi"},{"name": "Vellore"},{"name": "Vidisha"},{"name": "Villupuram"},{"name": "Vishakhapatnam"},{"name": "Vizianagaram"},{"name": "Warangal"},{"name": "Wardha"},{"name": "Washim"},{"name": "Wayanad"},{"name": "West Delhi"},{"name": "West Garo Hills"},{"name": "West Godavari"},{"name": "West Kameng"},{"name": "West Khasi Hills"},{"name": "West Sikkim"},{"name": "West Tripura"},{"name": "Wokha"},{"name": "Yadagiri"},{"name": "Yamuna Nagar"},{"name": "Yanam"},{"name": "Yavatmal"},{"name": "Zunheboto"}]);
  const [selectedCountry1, setSelectedCountry1] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState(null);

  const searchCountry = (event) => {
    setTimeout(() => {
        let _filteredCountries;
        if (!event.query.trim().length) {
            _filteredCountries = [...countries];
        }
        else {
            _filteredCountries = countries.filter((country) => {
                return country.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }

        setFilteredCountries(_filteredCountries);
    }, 250);
  }
  //Suggestions for Place of birth
  return (
    <Row>
      <Col>
        {/* --------------------------------------------------------------------------------*/}
        {/* Card-1*/}
        {/* --------------------------------------------------------------------------------*/}
        {(err != '')?<Alert color="success">{err}</Alert>:
        <Card>
          {
          (formStatus == 1)?
          <>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <i className="bi bi-bell me-2"> </i>
              Guidance & Counseling
            </CardTitle>
            <CardBody>
              <Form onSubmit={profile}>
                <FormGroup>
                  <Label for="exampleEmail">Full Name</Label>
                  <Input  name="fname" placeholder="Full Name" type="text" onChange={changeName} />
                  <small className="text-danger">{nameerr}</small>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Date Of Birth</Label>
                  <Input  name="dob" placeholder="Date Of Birth" type="date" onChange={changeDob} />
                  <small className="text-danger">{doberr}</small>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Time Of Birth</Label>
                  <Input  name="tob" placeholder="Time Of Birth" type="time" onChange={changeTob} />
                  <small className="text-danger">{toberr}</small>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Place of Birth</Label>
                  {/* <Input  name="pob" placeholder="Place of Birth" type="text" onChange={changePob} /> */}
                  <AutoComplete style={{'display': 'block'}} name="pob" value={selectedCountry1} suggestions={filteredCountries} completeMethod={searchCountry} field="name" onChange={changePob} aria-label="Countries" />
                  <small className="text-danger">{poberr}</small>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Phone Number</Label>
                  <Input  name="phone" placeholder="Phone Number" type="text" maxLength={10} onChange={changePhone} />
                  <small className="text-danger">{phoneerr}</small>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input  name="email" placeholder="Email" type="email" onChange={changeEmail} />
                  <small className="text-danger">{emailerr}</small>
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
          </>
          :
          <>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Payment details
          </CardTitle>
          <CardBody>
            <Form onSubmit={payment}>
              <FormGroup>
                <Label for="exampleEmail">Full Name</Label>
                <Input  value={addData.fname} name="fname" placeholder="Full Name" type="text" onChange={changeName} />
                <small className="text-danger">{nameerr}</small>
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Date Of Birth</Label>
                <Input  value={addData.dob} name="dob" placeholder="Date Of Birth" type="date" onChange={changeDob} />
                <small className="text-danger">{doberr}</small>
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Time Of Birth</Label>
                <Input  value={addData.tob} name="tob" placeholder="Time Of Birth" type="time" onChange={changeTob} />
                <small className="text-danger">{toberr}</small>
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Place of Birth</Label>
                <AutoComplete style={{'display': 'block'}} name="pob" value={addData.pob} suggestions={filteredCountries} completeMethod={searchCountry} field="name" onChange={changePob} aria-label="Countries" />
                <small className="text-danger">{poberr}</small>
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Amount</Label>
                <div className="input-group input-group">
                  <Input  name="amount" disabled defaultValue={addData.amount} type="text"  onChange={changeAmount} />
                  <span className="input-group-text" id="basic-addon1"><BiRupee /></span>
                  <small className="text-danger">{amountErr}</small>
                </div>
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Phone Number</Label>
                <Input  value={addData.phone} name="phone" placeholder="Phone Number" type="text" maxLength={10} onChange={changePhone} />
                <small className="text-danger">{phoneerr}</small>
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input  value={addData.email} name="email" placeholder="Email" type="email" onChange={changeEmail} />
                <small className="text-danger">{emailerr}</small>
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
          </>
          }
        </Card>
        }
      </Col>
    </Row>
  );
};

export default Forms;
