import React from "react";

const AddMenu = React.lazy(() => import("./MenuHandling/AddMenu"));
const EditMenu = React.lazy(() => import("./MenuHandling/EditMenu"));
const CreateOffer = React.lazy(() => import("./MenuHandling/CreateOffer"));
const RevertChanges = React.lazy(() => import("./MenuHandling/RevertChanges"));

const UsersStatistics = React.lazy(() =>
  import("./views/PdfPrint/UsersStatistics/UsersStatistics")
);
const IncomeStatistics = React.lazy(() =>
  import("./views/PdfPrint/IncomeStatistics/IncomeStatistics")
);
const AverageOrderValueStatistics = React.lazy(() =>
  import(
    "./views/PdfPrint/AverageOrderValueStatistics/AverageOrderValueStatistics"
  )
);
const OffersStatistics = React.lazy(() =>
  import("./views/PdfPrint/OffersStatistics/OffersStatistics")
);
const MonthlySalesStatistics = React.lazy(() =>
  import("./views/PdfPrint/MonthlySalesStatistics/MonthlySalesStatistics")
);
const CustomersStatistics = React.lazy(() =>
  import("./views/PdfPrint/CustomersStatistics/CustomersStatistics")
);
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Charts = React.lazy(() => import("./views/charts/Charts"));
const Configuration = React.lazy(() =>
  import("./views/settings/Configuration")
);
const Messages = React.lazy(() => import("./views/messages/Messages"));
const CustomersAccount = React.lazy(() =>
  import("./views/UsersInformation/CustomersAccount")
);
const CustomersOrders = React.lazy(() =>
  import("./views/UsersInformation/CustomersOrders")
);
const Homeimages = React.lazy(() => import("./views/settings/Homeimages"));

// Icons
const CoreUIIcons = React.lazy(() =>
  import("./views/icons/coreui-icons/CoreUIIcons")
);
const Flags = React.lazy(() => import("./views/icons/flags/Flags"));
const Brands = React.lazy(() => import("./views/icons/brands/Brands"));
const Widgets = React.lazy(() => import("./views/widgets/Widgets"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  { path: "/charts", name: "Charts", element: Charts },
  { path: "/icons", exact: true, name: "Icons", element: CoreUIIcons },
  { path: "/icons/coreui-icons", name: "CoreUI Icons", element: CoreUIIcons },
  { path: "/icons/flags", name: "Flags", element: Flags },
  { path: "/icons/brands", name: "Brands", element: Brands },
  { path: "/widgets", name: "Widgets", element: Widgets },
  { path: "/messages", name: "Messages", element: Messages },
  { path: "/add_menu_item", name: "add_menu_item", element: AddMenu },
  {
    path: "/edit_menu_information",
    name: "edit_menu_information",
    element: EditMenu,
  },
  {
    path: "/create_an_offer",
    name: "create_an_offer",
    element: CreateOffer,
  },
  {
    path: "/revert_changes",
    name: "Revert Changes",
    element: RevertChanges,
  },
  {
    path: "/users_statistics",
    name: "users_statistics",
    element: UsersStatistics,
  },
  {
    path: "/income_statistics",
    name: "income_statistics",
    element: IncomeStatistics,
  },
  {
    path: "/average_order_value_statistics",
    name: "average_order_value_statistics",
    element: AverageOrderValueStatistics,
  },
  {
    path: "/offers_statistics",
    name: "offers_statistics",
    element: OffersStatistics,
  },
  {
    path: "/monthly_sales_statistics",
    name: "monthly_sales_statistics",
    element: MonthlySalesStatistics,
  },
  {
    path: "/customers_statistics",
    name: "customers_statistics",
    element: CustomersStatistics,
  },
  {
    path: "/configuration",
    name: "Configuration",
    element: Configuration,
  },
  {
    path: "/homeimages",
    name: "Home Images",
    element: Homeimages,
  },
  {
    path: "/customers_account",
    name: "customer_account",
    element: CustomersAccount,
  },
  {
    path: "/customers_orders",
    name: "customers_orders",
    element: CustomersOrders,
  },
];

export default routes;
