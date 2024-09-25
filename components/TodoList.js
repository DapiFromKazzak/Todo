import { StyleSheet, View, Text, TextInput, Button, Pressable, FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useEffect } from 'react'


async function save(key, value) {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (error) {
        console.log(error)
    }
}

async function getValueFor(key) {

    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            console.log(value);
            return value;
        }
    } catch (error) {
        // Error retrieving data
        console.log(error)
    }
}

let listaAlustettu = 0;

export default function TodoList() {
    const [lista, setLista] = useState([])
    const [itemToAdd, setItemToAdd] = useState('')

    useEffect(() => {
        if(listaAlustettu > 0){ // varmistetaan, ettei tallennusta pääse tapahtumaan ennen kuin muisti on tarkistettu
            save('lista', JSON.stringify(lista))
        }
    }, [lista])

    // Haetaan muistissa oleva lista, kun ohjelma käynnistyy ensimmäisen kerran
    useEffect(() => {
        async function getListFromStorage () {
            let haettuLista = await AsyncStorage.getItem('lista')
            haettuLista = JSON.parse(haettuLista)
            setLista(haettuLista)
            listaAlustettu = 1
        }
        getListFromStorage()
    }, []) 

    const tallenna = () => {
        let newLista = { id: lista.length+1, item: itemToAdd, done: 'false' }

        if (lista.length > 0) {
            setLista(lista => [...lista, newLista])
        } else {
            setLista([newLista])
        }
        setItemToAdd('')
    }

    const renderItem = ({ item }) => {
        let style = "textDecoration:"
        if(item.done == "true"){
            style += 'line-through;'
        } else {
            style += 'line-through;'
        }
        return (
            <Pressable
                onPress={() => {setTaskDone(item.id)}}
                hitSlop={10}
            >
                <Text style={item.done=="true" ? styles.taskDone : styles.taskNotDone}>{item.item}</Text>
            </Pressable>
        )
    }

    const setTaskDone = (id) => {
        
        let newLista = [];
        for(let i = 0; i < lista.length; i++){
            newLista[i] = lista[i]
            if(lista[i].id == id){
                if(lista[i].done == 'false'){
                    newLista[i].done = 'true'
                    console.log("Setting task " + id + " as done")
                } else {
                    newLista[i].done = 'false'
                    console.log("Setting task " + id + " as not done")
                }
            }
        }
        setLista(newLista)
    }

    const clearList = async () => {
        setLista([])
        await AsyncStorage.clear()
    }
//const itemDone = {textDecorationLine: 'line-through', textDecorationStyle: 'solid'}
    return (
        <View  style={styles.container}>
            <TextInput
                placeholder='Add Item to the List'
                style={styles.textInput}
                value={itemToAdd}
                onChangeText={newText => setItemToAdd(newText)}
            >
            </TextInput>
            <Pressable
                style={styles.saveButton}
                onPress={tallenna}
            >
                <Text style={styles.saveButtonText}>Save</Text>
            </Pressable>
            <FlatList
                data={lista}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            >
            </FlatList>
            <Button title="Clear list" onPress={clearList} style={styles.clearButton} />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textInput: {
        padding: 5,
        borderWidth: 1,
        width: '100%'
    },
    saveButton: {
        position: 'absolute',
        alignSelf: 'center',
        right: 0,
        paddingRight: 20,
        paddingTop: 2
    },
    saveButtonText: {
        color: 'blue',
        fontSize: 24
    },
    listItem: {
        padding: 5
    },
    lista: {
        marginTop: 10
    },
    taskDone: {
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        fontSize:20,
        margin:10
    },
    taskNotDone: {
        textDecorationLine: 'none',
        textDecorationStyle: 'solid',
        fontSize:20,
        margin:10
    },
    clearButton: {
        position: 'absolute',
        bottom:0,
        left:0,
    }
}); 