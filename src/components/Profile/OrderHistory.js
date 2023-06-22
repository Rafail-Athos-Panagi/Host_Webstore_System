import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MUITable from "@mui/material/Table";
import TablePagination from "@mui/material/TablePagination";
import UserID from "../hooks/userid";
import Loading from "../UI/Loading/Loading";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

export default function OrderHistory() {
  const menuItems = useSelector((state)=>state.menu.menuItems);

  const [menuItemName,setMenuItemName]=useState(menuItems);
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [extraOrderDetails, setExtraOrderDetails] = useState([]);
  const [page, setPage] = useState(0);
  const [rowEdit, setRowEdit] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { userID } = useContext(UserID);
  const [isLoading, setIsLoading] = useState(true);
  

 
  
const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // -------------------------------------------------------------------------------------------
  function OrderDetails() {
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`/api/customer/historydetails`, request).then(function (res) {
      res.json().then(function (data) {
        data.sqlMessage ? console.log(data.sqlMessage) : setOrderDetails(data);
        console.log("orderdetails");
        console.log(data);
      });
    });
  }
  // -------------------------------------------------------------------------------------------

  function extraOrderDetailsFunction() {
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`/api/customer/historyextras`, request).then(function (res) {
      res.json().then(function (data) {
        data.sqlMessage
          ? console.log(data.sqlMessage)
          : setExtraOrderDetails(data);
        console.log("extraItemsDetails");
        console.log(data);
      });
    });
  }

  // -------------------------------------------------------------------------------------------

  useEffect(() => {

    if (userID == null) return;

    const options = {
      method: "POST",
      credentials: "include",
      mode: "cors",
      
      
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("/api/customer/history", options).then((res) => {
      res.json().then((data) => {
        if(data.sqlMessage!=null){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to load data. Please try again later.",
          })
        }
        else
          setOrders(data);
      });
    });
    OrderDetails();
    extraOrderDetailsFunction();
    setTimeout(() => { setIsLoading(false); }, 1000);
  }, [userID]);

  function handleClick(e, row) {
    // console.log(e.detail);
    if (e.detail === 2) {
      setRowEdit(row);
      setIsOpen(true);
    }
  }

  useEffect(() => {
    const toggleErrorMessage = setTimeout(() => {
      // console.log(extraOrderDetails);
      // console.log(orders);
      // console.log(orderDetails);
    }, 8000);
    return () => clearTimeout(toggleErrorMessage);
  });

  const ordersWithProducts = orders.map((order) => {
    const date = new Date(order.orderDate);
    const displayDate = date.toDateString();

    const orderProducts = orderDetails.reduce((acc, product) => {

      const menuReduce = menuItemName.reduce((acc,prd)=>
      {
        if(prd.itemID === product.itemID)
        {
          acc.push({
            itemName : prd.itemName,
          });
        }
        return acc
      },[])

      const orderExtraProducts = extraOrderDetails.reduce(
        (acc, extraProduct) => {
          if (extraProduct.itemID === product.itemID && extraProduct.orderedItemID === product.orderedItemID) {
            acc.push({
              extraItemName: extraProduct.extraItemName,
              extraItemPrice: extraProduct.extraItemPrice,
              orderedQuantity: extraProduct.orderedQuantity,
            });
          }
          return acc;
        },
        []
      );

      


      if (product.orderID === order.orderID) {
        acc.push({
          productName: menuReduce[0].itemName,
          productPrice: product.itemPrice,
          quantity: product.quantity,
          extra: orderExtraProducts,
        });
      }
      return acc;
    }, []);

    return {
      orderId: order.orderID,
      orderPrice: order.orderPrice,
      orderDate: displayDate,
      products: orderProducts,
      

      // orderDate: order.orderDate.slice(0,-3),
      // arrivalDate: (order.arrivalDate? order.arrivalDate.slice(0,-3) : "Awaiting"),
      // orderInvoice: (order.orderInvoice? <Link to={`../../assets/uploads/invoices/${order.orderInvoice}`} target="_blank" download><DownloadIcon /></Link>: "Not uploaded"),

      // comments: order.comments
    };
  });

  const sortedOrders = ordersWithProducts.sort((a, b) => {
    if (a.orderId > b.orderId) {
      return -1;
    }
    if (a.orderId < b.orderId) {
      return 1;
    }
    return 0;
  });

  //  useEffect(() => {
  //     const filteredRows = sortedOrders.filter((row) => {
  //        return row.supplierName.toLowerCase().includes(search.toLowerCase());
  //     });
  //     setRows(filteredRows);
  //   }, [search, sortedOrders]);

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow
          sx={{ "& > *": { borderBottom: "unset" } }}
          onClick={(e) => handleClick(e, row.orderId)}
        >
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell style={{ textAlign: "center" }} component="th" scope="row">
            {row.orderId}
          </TableCell>
          <TableCell style={{ textAlign: "center" }} component="th" scope="row">
            {row.orderDate}
          </TableCell>
          <TableCell style={{ textAlign: "center" }}>
            {row.orderPrice}€
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Dishes
                </Typography>

                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ textAlign: "center" }}>
                        Dish Name
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        Quantity
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        Dish Price
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        Extra Items
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        Total Price
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.products.map((prd) => (
                      <TableRow key={prd.productName}>
                        <TableCell style={{ textAlign: "center" }}>
                          {prd.productName}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {prd.quantity}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {prd.productPrice}€
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {prd.extra.length > 0 &&
                             <Extra extras={prd.extra} />
                          }
                          {prd.extra.length === 0 && 
                            "No extra items"
                          }
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {prd.quantity * prd.productPrice}€
                        </TableCell>
                      </TableRow>
                    ))}
                    {/* {console.log("extraaa")}
                    {console.log(row.extraProducts)}
                    {row.extraProducts.map((extraItem)=>
                    {
                      <TableRow key={extraItem.productName}>
                        <TableCell style={{textAlign:"center"}}>{extraItem.extraItemName}</TableCell>
                        <TableCell style={{textAlign:"center"}}>{extraItem.extraItemPrice}</TableCell>
                      </TableRow>
                    })} */}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  function Extra(props) {
    const { extras } = props;
    const [open, setOpen] = React.useState(false);
    console.log("extras");
    console.log(extras);
    return (
      <React.Fragment>
        <TableRow
          sx={{ "& > *": { borderBottom: "unset" } }}
          onClick={(e) => handleClick(e, extras.extraItemName)}
        >
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Extras
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ textAlign: "center" }}>
                        Extra Items
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        Quantity
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        Price for each extra
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        Total price of extras
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* {console.log("aaaaaa")}
                    {console.log(extras)} */}
                    {extras && <>
                      {extras.map((extraItem,i) => (
                      <TableRow key={i}> 
                        <TableCell style={{ textAlign: "center" }}>
                          {extraItem.extraItemName} 
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {extraItem.orderedQuantity}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {extraItem.extraItemPrice}€
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {extraItem.extraItemPrice * extraItem.orderedQuantity}€
                        </TableCell>
                      </TableRow>
                    ))}
                    {extras.length===0 && <span style={{display:'flex', textAlign: "center" }}>No extras selected.</span>}
                    
                    </>}
                   
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  
  return (
    <>
      {" "}
      <OrderHistoryFunction />
      <Paper sx={{ overflow: "auto", margin: "20px auto" }}>
        {isLoading && <Loading />}
        {!isLoading && <>
        <TableContainer sx={{ maxHeight: 450,minWidth:550 }} >
          <MUITable stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell style={{ textAlign: "center",}}>Order ID</TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  Order Date
                </TableCell>
                <TableCell style={{ textAlign: "center" }} align="right">
                  Total Price
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {console.log("sortteed")}
              {console.log(sortedOrders)}
              {sortedOrders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => (
                  <Row key={i} row={row} />
                ))}
            </TableBody>
          </MUITable>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={sortedOrders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </>}
      </Paper>

    </>
  );

  function OrderHistoryFunction() {
    return (
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          height: "100%",
          width: "30ch",
        }}
      >
        <span>Order History</span>
        <hr />
        {!orders && (
          <>
            <span>No orders found</span>
          </>
        )}
      </Box>
    );
  }
}
