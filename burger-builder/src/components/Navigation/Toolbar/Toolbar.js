import React from 'react';
import classes from "./Toolbar.css";
import Logo from '../../Logo/Logo'
import NavigationItems from "./../NavigationItems/NavigationItems";
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

export default (props) => (
  <header className={classes.Toolbar}>
    <DrawerToggle toggleSideDrawer={props.toggleSideDrawer} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);
