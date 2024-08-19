import React, { useEffect, useState } from "react";

import axios from "axios";
function Users() {
  const [data, setData] = useState([]);
  const [mode, setMode] = useState("online");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        console.log(response.data);
        setData(response.data)
        // localStorage.setItem("users", JSON.stringify(result));
      } catch (error) {
        // Handle error
        setMode("offline");
        // let collection = localStorage.getItem("users");
        // setData(JSON.parse(collection));
        console.error(error);
      }
    };
    // let url = "https://jsonplaceholder.typicode.com/users"
    fetchData();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <div>
        <h2>HTML Table</h2>
        {/* <div>
          {mode === "offline" ? 
          <div>You are in offline mode</div> : null}
        </div> */}
        <table>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
          {data?.map((item) => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.address.street}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default Users;
