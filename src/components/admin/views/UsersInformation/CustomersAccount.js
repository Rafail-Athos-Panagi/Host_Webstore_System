import React from "react";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";

const CustomersAccount = () => {
  const [usersAccount, setUsersAccount] = useState([]);

  useEffect(() => {
    const options = {
      method: "POST",
      credentials: "include",
      mode: "cors",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        select: "email , firstName , lastName , area , city",
        from: "users natural join customers natural join address",
      }),
    };

    fetch("/api/select", options).then((res) => {
      res.json().then((data) => {
        const updatedUsers = data.map(user => ({ ...user, fullname: user.firstName + " " + user.lastName }));

        setUsersAccount(updatedUsers);
      });
    });
  }, []);

  console.log(usersAccount);
  const columns = [ 
    {
      name: "fullname",
      label: "User",
      options: {
        filter: true,
        sort: true,
        print: false,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: true,
        print: false,
      },
    },
    {
      name: "area",
      label: "Area",
      options: {
        filter: true,
        sort: true,
        print: false,
      },
    },
    {
      name: "city",
      label: "City",
      options: {
        filter: true,
        sort: true,
        print: false,
      },
    },
  ];

  return (
    <MUIDataTable
      title="Customers Account"
      data={usersAccount}
      columns={columns}
    />
  );
};

export default CustomersAccount;
