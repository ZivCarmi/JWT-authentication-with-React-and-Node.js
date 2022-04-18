import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";

const UserPopup = () => {
  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="account-nav-list">
      <button type="button" className="nav-flyout-trigger">
        <div className="line-1"> Hello, {auth?.username}</div>
        <div className="line-2">Account</div>
      </button>
      <div className="nav-flyout">
        <div className="flyout-inner">
          <div className="my-profile nav-item">My Profile</div>
          <div className="change-email nav-item">Change Email</div>
          <div className="change-email nav-item">Change Password</div>
          <button className="logout nav-item" onClick={signOut}>
            <FontAwesomeIcon icon={faRightFromBracket} />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPopup;
