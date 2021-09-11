import React,{useState} from "react";
import {View,Text,StyleSheet,FlatList,Alert} from 'react-native';
import Header from "./components/Header";
// import {uuid} from 'uuid'
// import 'react-native-get-random-values';
// import { v4 as uuidv4 } from 'uuid';
import uuid from 'react-native-uuid';
import ListItem from './components/ListItem'
import AddItem from "./components/AddItem";

const App = () => {
  const [items,setItems] = useState([
    {id:uuid.v4(),text:'Mild'},
    {id:uuid.v4(),text:'Eggs'},
    {id:uuid.v4(),text:'Bread'},
    {id:uuid.v4(),text:'Juice'},
  ])

  const deleteItem = (id) => {
    setItems(prevItems=>{
      return prevItems.filter(item=>item.id !== id)
    })
  }

  const addItem = text => {
    if(!text){
      Alert.alert('Error','Please enter an item',{text:'Ok'})
    }else {
      setItems(prevItems=>{
        return [{id:uuid.v4(),text},...prevItems]
      })
    }
  }

  return (
    <View style={styles.container}>
      <Header />
      <AddItem addItem={addItem}/>
      <FlatList data={items} 
      renderItem={({item})=>
        <ListItem item={item}
        deleteItem={deleteItem}
        />
      }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop:60
    // justifyContent:"center",
    // alignItems:"center"
  },
  // text:{
  //   fontSize:30,
  //   color:'darkslateblue'
  // },
  // img:{
  //   width:100,
  //   height:100,
  //   borderRadius:100/2
  // }
})

export default App
