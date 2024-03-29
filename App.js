import React, { Component } from 'react';
import {View,Image} from 'react-native';
import { createAppContainer,} from 'react-navigation'; 
import { createBottomTabNavigator} from 'react-navigation-tabs'


import BookTransactionScreen from './screens/BookTransactionScreen';
import SearchScreen from './screens/SearchScreen';


export default class App extends Component {
  render() {
    return (
        <Appcontainer />
    )
  }
}

var tabContainer = createBottomTabNavigator(
{
 Transaction:{screen:BookTransactionScreen},
  Search:{screen:SearchScreen}
},{
  defaultNavigationOptions:({navigation}) => ({
    tabBarIcon:()=>{
      const routeName=navigation.state.routeName
      if(routeName==="Transaction"){
        return(<Image source= {require("./assets/book.png")}
        style = {{
          width:35,
          height:35 }}/> )
      }else if(routeName==="Search"){
        return(<Image source= {require("./assets/searchingbook.png")}
        style = {{
          width:35,
          height:35 }}/> )
      }
    }
  })
}
)
const Appcontainer = createAppContainer(tabContainer)