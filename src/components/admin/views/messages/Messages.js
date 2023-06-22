import React from 'react'
import MUIDataTable from "mui-datatables";
import Manual from '../../Manual';

export default function Messages() {
  const [messagesData, setMessagesData] = React.useState([]);

  const options = {
    onRowsDelete: (rowsDeleted) => {
      const deleted = rowsDeleted.data;

      // changes the status to true so it can go to the deleted section
      /* try {
        deleted.forEach(i => {
          const request = {
            method: "POST",
            credentials: "include",
            mode: "cors",
            
            
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              table: "menuitems",
              columns: `itemStatus=true`,
              where: `itemID=${i}`
            }),
          };

          fetch(`/api/update`, request).then(function (res) {
            res.json().then(function (data) {
              if (data.sqlMessage) {
                console.log(data.sqlMessage);
              }
            })
          });
        })
      } catch (error) {
        console.error(error)
      }; */
    },
    selectableRows: false,
  };

  React.useEffect(() => {

    const options = {
      method: "POST",
      credentials: "include",
      mode: "cors",
      
      
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ select: "*", from: "customerMessages" }),
    }

    fetch("/api/select", options).then((res) => {
      res.json().then((data) => {
        setMessagesData(data);
      });
    });

  }, [])
  const columns = [
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: true,
        print: false
      }
    },
    {
      name: "reason",
      label: "Reason",
      options: {
        filter: true,
        sort: true,
        print: false
      }
    },
    {
      name: "messageDate",
      label: "Date",
      options: {
        filter: true,
        sort: true,
        print: false,
        customBodyRender: value => {
          const date = new Date(value);
          return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        },
        sortDirection: 'desc'
      }
    },
    {
      name: "message",
      label: "Message",
      options: {
        filter: false,
        sort: false,
        print: false
      }
    },
  ];



  return (<>
    <MUIDataTable title={<div className="d-flex"><div className="me-2">Customer Messages</div><Manual title="Messages manual" pageNumber={18}/></div>} data={messagesData} columns={columns} options={options} />

  </>);
}
