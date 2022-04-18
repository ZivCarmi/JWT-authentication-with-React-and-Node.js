// import { useState, useEffect } from "react";
// import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Private = () => {
  // const [users, setUsers] = useState([]);
  // const axiosPrivate = useAxiosPrivate();

  // useEffect(() => {
  //   let isMounted = true;
  //   const controller = new AbortController();

  //   const getUsers = async () => {
  //     try {
  //       const response = await axiosPrivate.get("/private", {
  //         signal: controller.signal,
  //       });

  //       isMounted && setUsers(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   getUsers();

  //   return () => {
  //     isMounted = false;
  //     controller.abort();
  //   };
  // }, [axiosPrivate]);

  return (
    <div>
      {/* {users.length
        ? users.map((user, index) => {
            return <li key={index}>{user.username}</li>;
          })
        : null} */}
      Private page
    </div>
  );
};

export default Private;
