import React from 'react';
import MUIDataTable from "mui-datatables";
import { useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import Manual from '../Manual';


export default function RevertChanges() {

    const items = useSelector((state)=>state.menu.menuItems);
    const filteredItems = items.filter((item)=>item.itemStatus === 0);

    const options = {
        deleteIcon: <DeleteIcon/>,
        setRowProps: (row) => ({ 
          onDoubleClick: () => { // on double click of the array set the fields with the data
            Swal.fire({
              title: 'Are you sure you want to bring this item back on the menu?',
              icon: 'question',
              showCancelButton: true,
              reverseButtons:true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes'
            }).then((result) => {
              if (result.isConfirmed) {
                try {
                  
                  const changeStatus = async () => {
                    const request = {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        table: "menuitems",
                        columns: `itemStatus=1`,
                        where: `itemID=${row[0]}`
                      }),
                    };

                    const res = await fetch(`/api/update`, request);
                    
                    if(!res.ok){
                      Swal.fire({
                        title: "Could not be brought back on the menu!",
                        icon: 'error',
                      });
                      throw new Error("Something went wrong");
                    }

                    Swal.fire({
                      title: "Item has been brought back on the menu!",
                      icon: 'success',
                      confirmButtonText: 'OK'
                    });

                  }
                  
                  changeStatus();

                } catch (error) {
                  console.error(error)
                } 
              }
            });
          }}),
      };

    const columns = [
        {
          name: "itemID",
          label: "Item ID",
          options: {
            display: true,
            searchable: false,
            download: false,
            print: false,
            filter: false,
            sort: true,
          },
        },
        {
            name: "itemImage",
            label: "Image",
            options: { display:false,filter: false, sort: false },
          },
        {
          name: "itemName",
          label: "Item Name",
          options: { filter: true, sort: true },
        },
        {
          name: "itemPrice",
          label: "Price",
          options: { filter: true, sort: true },
        },
        {
          name: "itemIngredients",
          label: "Ingredients",
          options: { display: false, filter: false, sort: false },
        },
        {
          name: "itemDescription",
          label: "Description",
          options: { display: false, filter: false, sort: false },
        },
        {
          name: "itemStatus",
          label: "Status",
          options: { display:false,filter: false, sort: true },
        },{
          name: "itemCategory",
          label: "Category",
          options: { display:true,filter: true, sort: false },
        },
        {
          name: "itemTimeOfDay",
          label: "Day/Night",
          options: { display:true,filter: true, sort: false },
        },
        {
          name: "itemDiscountPrice",
          label: "Discount Price",
          options: { display:false,filter: false, sort: true },
        },
      ];

  return (
   <div>
    <MUIDataTable
        title={<div className="d-flex"><div className="me-2">Revert Changes</div><Manual title="Revert manual" pageNumber={27}/></div>}
        data={filteredItems}
        columns={columns}
        options={options}
      />
   </div>
  )
}
