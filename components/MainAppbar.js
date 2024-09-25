import { Appbar } from 'react-native-paper';
import React from 'react'
import { StyleSheet } from 'react-native';

export default function MainAppbar() {
  return (
    <Appbar.Header  >
      <Appbar.Content title="Todo" style={appBarStyles.header}/>
    </Appbar.Header>
  )
}
const appBarStyles = StyleSheet.create({
  header: {
    textAlignVertical: 'top',
    width:'100%',
    textAlign:'center',
    alignItems:'center'
  }
}); 
