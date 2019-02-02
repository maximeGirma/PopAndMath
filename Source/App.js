/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import GameContainer from "./Screens/GameContainer/GameContainer";


export default class App extends React.Component {
  render() {
    return (
      <View style={{flex:1}}>
          <GameContainer/>
      </View>
    );
  }
}
