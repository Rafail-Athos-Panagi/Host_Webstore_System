import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { TextField } from "@mui/material";
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

export default function CustomersOrders() {
  const [menuItemName, setMenuItemName] = useState([]);
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [extraOrderDetails, setExtraOrderDetails] = useState([]);
  const [page, setPage] = useState(0);
  const [rowEdit, setRowEdit] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function menuItems() {
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ select: "itemID,itemName", from: "menuitems" }), // where is wrong
    };
    fetch(`/api/select`, request).then(function (res) {
      res.json().then(function (data) {
        data.sqlMessage ? console.log(data.sqlMessage) : setMenuItemName(data);
      });
    });
  }

  // -------------------------------------------------------------------------------------------
  function OrderDetails() {
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        select: "orderID,itemID,itemPrice,quantity",
        from: "orderdetails natural join orders",
      }),
    };
    fetch(`/api/select`, request).then(function (res) {
      res.json().then(function (data) {
        data.sqlMessage ? console.log(data.sqlMessage) : setOrderDetails(data);
      });
    });
  }
  // -------------------------------------------------------------------------------------------

  function extraOrderDetailsFunction() {
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        select: "orderID,itemID,extraItemName,extraItemPrice,orderedQuantity",
        from: "extraItemsOrderDetails natural join orders",
      }),
    };
    fetch(`/api/select`, request).then(function (res) {
      res.json().then(function (data) {
        data.sqlMessage
          ? console.log(data.sqlMessage)
          : setExtraOrderDetails(data);
      });
    });
  }

  // -------------------------------------------------------------------------------------------

  useEffect(() => {
    const options = {
      method: "POST",
      credentials: "include",
      mode: "cors",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        select: "orderID,orderPrice,orderDate , firstName , lastName",
        from: "orders natural join customers",
      }),
    };

    fetch("http://localhost:8080/api/select", options).then((res) => {
      res.json().then((data) => {
        data.sqlMessage ? console.log(data.sqlMessage) : setOrders(data);
      });
    });
    menuItems();
    OrderDetails();
    extraOrderDetailsFunction();
  }, []);

  function handleClick(e, row) {
    if (e.detail === 2) {
      setRowEdit(row);
      setIsOpen(true);
    }
  }

  useEffect(() => {
    const toggleErrorMessage = setTimeout(() => {}, 8000);
    return () => clearTimeout(toggleErrorMessage);
  });

  const ordersWithProducts = orders.map((order) => {
    const date = new Date(order.orderDate);
    const displayDate = date.toDateString();

    const orderProducts = orderDetails.reduce((acc, product) => {
      const menuReduce = menuItemName.reduce((acc, prd) => {
        if (prd.itemID === product.itemID) {
          acc.push({
            itemName: prd.itemName,
          });
        }
        return acc;
      }, []);

      const orderExtraProducts = extraOrderDetails.reduce(
        (acc, extraProduct) => {
          if (
            extraProduct.itemID === product.itemID &&
            extraProduct.orderedItemID === product.orderedItemID
          ) {
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
      orderFirstName: order.firstName,
      orderLastName: order.lastName,
      orderPrice: order.orderPrice,
      orderDate: displayDate,
      products: orderProducts,
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
            {row.orderFirstName}
          </TableCell>
          <TableCell style={{ textAlign: "center" }} component="th" scope="row">
            {row.orderLastName}
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
                  Products
                </Typography>

                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ textAlign: "center" }}>
                        Product Name
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        Quantity
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        Product Price Including Extras
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        Extra Items
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        Total Price For Each Product
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
                          <Extra extras={prd.extra} />
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {prd.quantity * prd.productPrice}€
                        </TableCell>
                      </TableRow>
                    ))}
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
                        Price For Each Extra
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        Total Price Of Extras
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {extras && (
                      <>
                        {extras.map((extraItem, i) => (
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
                              {extraItem.extraItemPrice *
                                extraItem.orderedQuantity}
                              €
                            </TableCell>
                          </TableRow>
                        ))}
                        {extras.length === 0 && (
                          <span
                            style={{ display: "flex", textAlign: "center" }}
                          >
                            this item doesnt have any extras
                          </span>
                        )}
                      </>
                    )}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Customers Orders
      </Typography>
      <TextField
        label="Search"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ marginBottom: "20px" }}
      />
      <Paper sx={{ overflow: "auto", margin: "20px auto" }}>
        <TableContainer sx={{ maxHeight: 450}}>
          <MUITable stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell style={{ textAlign: "center" }}>Order ID</TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  First Name
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>Last Name</TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  Order Date
                </TableCell>
                <TableCell style={{ textAlign: "center" }} align="right">
                  Total Price
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedOrders
                .filter((item) => {
                  const name = item.orderFirstName.toLowerCase();
                  const lastname = item.orderLastName.toLowerCase();
                  const id = item.orderId;
                  if (
                    name.startsWith(searchTerm.toLowerCase()) ||
                    lastname.startsWith(searchTerm.toLowerCase()) ||
                    id === +searchTerm
                  ) {
                    return true;
                  } else return false;
                })
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
      </Paper>
    </>
  );
}
