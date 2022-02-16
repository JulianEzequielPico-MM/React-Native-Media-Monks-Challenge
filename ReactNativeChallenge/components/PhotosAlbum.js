import React from "react";
import { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, Modal, Pressable, TextInput, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { photosData } from "../Redux/02-actions";
import * as Animatable from "react-native-animatable";
import { AntDesign } from '@expo/vector-icons';
import MyAppHeaderText from "./MyAppHeaderText"


let { width, height } = Dimensions.get("window")

const styles = StyleSheet.create({

    centerView: {
        flex: 1,
        backgroundColor: "white"
    },

    modalView: {
        flex: 1,
        justifyContent: "space-around",


    },
    textInput: {
        height: 40,
        borderColor: "#000000",
        borderBottomWidth: 1,
        marginLeft:10
        
    }
}

);



export default function PhotosAlbum({ route }) {

    dispatch = useDispatch();
    const data = useSelector((state) => state.photosData[route.params.id]);
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);


    React.useEffect(() => {
        navigation.setOptions({
            headerRight: () => (

                <Pressable onPress={() => { setModalVisible(!modalVisible) }}><AntDesign name="edit" size={20} color="black" />
                </Pressable>


            ),
        });
    }, [modalVisible]);



    if (data === undefined) {
        axios.get(`https://jsonplaceholder.typicode.com/albums/${route.params.id}/photos`)
            .then((response) => {
                dispatch(photosData([response.data, route.params.id]))
            }).catch(error => {
                console.log(error)
                throw error
            })
    }

    return (
        <View>
            <FlatList
                horizontal={false}
                numColumns={2}
                data={data}
                removeClippedSubviews={true}
                keyExtractor={({ id }) => id.toString()}
                initialNumToRender={10}
                renderItem={({ item }) => (
                    <Animatable.View
                        style={{ flex: 1, alignItems: "center" }}
                        animation="zoomIn"
                        delay={item.id * 150}
                    >
                        <TouchableOpacity style={{ flex: 1, alignItems: "center" }} onPress={() => navigation.navigate('PhotoDetail', { title: item.title, img: item.url })} >
                            <Image style={{ height: width / 2, width: width / 2, borderColor: "white", borderWidth: 2 }} source={{ uri: `${item.url}.png` }} testID={`${item.id}`} />
                        </TouchableOpacity>
                    </Animatable.View>
                )
                }
            />
            <Modal animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible)
                }} >
                <View style={styles.centerView}>
                    <View style={styles.modalView}>
                        <MyAppHeaderText style={{ fontSize: 36 }} >Rename Album</MyAppHeaderText>
                        <TextInput placeholder="Type here..." style={styles.textInput}></TextInput>
                        <Pressable style={{alignSelf:"center"}}><AntDesign name="checkcircleo" size={35} color="blue" /></Pressable>
                    </View>

                </View>


            </Modal>

        </View>

    );

}