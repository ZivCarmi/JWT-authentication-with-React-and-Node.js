import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import UserPopup from "./UserPopup";

const Account = () => {
  const { auth } = useAuth();

  return (
    <div className="account">
      <ul className="account-nav">
        {!auth.accessToken ? (
          <>
            <li>
              <Link to="/register">
                <FontAwesomeIcon icon={faUser} />
                Register
              </Link>
            </li>
            <li>
              <Link to="/login">
                <FontAwesomeIcon icon={faRightToBracket} />
                Sign in
              </Link>
            </li>
          </>
        ) : (
          <li>
            <UserPopup />
          </li>
        )}
      </ul>
    </div>
  );
};

export default Account;
