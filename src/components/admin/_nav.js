import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilPencil,
  cilUser,
  cilImage,
  cilSpeedometer,
  cilNotes,
  cilSettings,
  cilPlus,
  cilBasket,
  cilBackspace,
  cilEnvelopeClosed,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Settings',
  },
  {
    component: CNavItem,
    name: 'Home Images',
    to: '/homeimages',
    icon: <CIcon icon={cilImage} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Configuration',
    to: '/configuration',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Customer Information',
  },
  {
    component: CNavItem,
    name: 'Customers Account',
    to: '/customers_account',
  },
  {
    component: CNavItem,
    name: 'Customers Orders',
    to: '/customers_orders',
  },
  {
    component: CNavTitle,
    name: 'Statistics',
  },
  {
    component: CNavGroup,
    name: 'Statistics',
    to: '/statistics',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Users Statistics',
        to: '/users_statistics',
      },
      {
        component: CNavItem,
        name: 'Income Statistics',
        to: '/income_statistics',
      },
      {
        component: CNavItem,
        name: 'Average Order Value',
        to: '/average_order_value_statistics',
      },
      {
        component: CNavItem,
        name: 'Offers Statistics',
        to: '/offers_statistics',
      },
      {
        component: CNavItem,
        name: 'Monthly Sales Statistics',
        to: '/monthly_sales_statistics',
      },
      {
        component: CNavItem,
        name: 'Customers Statistics',
        to: '/customers_statistics',
      },
    ],
  },{
    component: CNavTitle,
    name: 'Messages',
  },
  {
    component: CNavItem,
    name: 'Customer Messages',
    to: '/messages',
    icon: <CIcon icon={cilEnvelopeClosed} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Menu',
  },
  {
    component: CNavItem,
    name: 'Add Menu Item',
    to: '/add_menu_item',
    icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Edit Menu Information',
    to: '/edit_menu_information',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Create An Offer',
    to: '/create_an_offer',
    icon: <CIcon icon={cilBasket} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Revert Changes',
    to: '/revert_changes',
    icon: <CIcon icon={cilBackspace} customClassName="nav-icon" />,
  },
  /*  {
     component: CNavItem,
     name: 'Add Menu Item',
     to: 'menu/add_menu_item',
     icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
   },
   {
     component: CNavItem,
     name: 'Add Menu Offers',
     to: 'menu/add_menu_offers',
     icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
   },
   {
     component: CNavItem,
     name: 'Menu Item Discount',
     to: 'menu/menu_item_discount',
     icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
   }, */
]

export default _nav
