import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import ListIcon from '@mui/icons-material/List';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Place } from '@mui/icons-material';
import { useEffect } from 'react';

interface Props {
}

export const MainListItems:React.FC<Props> = ( ) => {
 return (
  <React.Fragment>
    <ListItemButton href="/" >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton href="/orders">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItemButton>
    <ListItemButton href="/products" color="secondary">
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="Products" />
    </ListItemButton>
    <ListItemButton href="/inventory">
      <ListItemIcon>
        <InventoryIcon />
      </ListItemIcon>
      <ListItemText primary="Inventory" />
    </ListItemButton>
  </React.Fragment>
)}

function createData(
  id: number,
  title: string,
  href: string,
) {
  return {id, title, href };
}

const defaultRows = [
  createData(
    0,
    "Current Month",
    ""
  ),
  createData(
    1,
    "Last Quarter",
    ""
  ),
  createData(
    2,
    "Year-end sale",
    ""
  ),
];

const productRows = [
  createData(
    0,
    "Class",
    "/products/class"
  ),
  createData(
    1,
    "Department",
    "/products/department"
  ),
  createData(
    2,
    "Variants",
    "/products/variant"
  ),
  createData(
    3,
    "Types",
    "/products/product-type"
  ),
  createData(
    4,
    "Tags",
    "/products/tag"
  ),
  createData(
    5,
    "Audiences",
    "/products/audience"
  ),
  createData(
    6,
    "Vendors",
    "/products/vendor"
  ),
  createData(
    7,
    "Styles",
    "/products/style"
  ),
];



export  function SecondaryListItems( ): React.JSX.Element  {

  var rows = defaultRows

  if(location.pathname.includes("/products")){
    rows = productRows
  }
 
  return (<React.Fragment>
    <ListSubheader component="div" inset>
      Product Helpers
    </ListSubheader>
    {rows.map((row) => (
       <ListItemButton href={row.href} key={row.id}>
       <ListItemIcon>
         <AssignmentIcon />
       </ListItemIcon>
       <ListItemText primary={row.title} />
     </ListItemButton>
    ))}
  </React.Fragment>)
};
