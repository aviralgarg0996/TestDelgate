import { TabNavigator,StackNavigator ,DrawerNavigator} from "react-navigation";
import MainScreen from "../containers/user/MainScreen";
import Login from "../containers/user/driver/Login";
import Register from "../containers/user/driver/Register";
import NewUser from "../components/driver/NewUser";
import Home from "../containers/user/driver/home";
import DriverForm from "../containers/user/driver/DriverForm";
import Loader from "../components/common/Loader";
import ChangePassword from "../containers/user/driver/ChangePassword";
import AppIntroduction from "../containers/user/driver/AppIntroduction";
import SplashScreen from "../containers/user/driver/SplashScreen";
import LandingScreen from "../containers/user/driver/LandingScreen";

import { Image, StyleSheet, Platform } from 'react-native';
import Constants from "../constants";
import React, { Component } from 'react';

// export list of routes.
export default routes = {
    Loader : { screen: Loader },
    Login : { screen: Login },
    MainScreen : { screen: MainScreen },
    Register : { screen: Register },
    DriverForm : {screen : DriverForm},
    NewUser : {screen : NewUser},
    ChangePassword: { screen: ChangePassword },
    AppIntroduction: { screen: AppIntroduction},
    SplashScreen: {screen: SplashScreen},
    LandingScreen:{screen:LandingScreen},
    Home:{screen:Home},

};
