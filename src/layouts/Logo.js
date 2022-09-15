import user from "../assets/images/logos/logo.png";
import { Link } from "react-router-dom";


const Logo = () => {
  return (
    <Link to="/">
<img src={user}></img>
    </Link>
  );
};

export default Logo;