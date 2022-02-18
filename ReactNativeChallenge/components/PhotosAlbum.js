import React from "react";
import { useState } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, Pressable, TextInput, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { albumsData, photosData } from "../Redux/02-actions";
import * as Animatable from "react-native-animatable";
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import MyAppHeaderText from "./MyAppHeaderText";
import { renameAlbum } from "../Redux/02-actions";



let { width, height } = Dimensions.get("window")



export default function PhotosAlbum({ route }) {

    const dispatch = useDispatch();
    const data = useSelector((state) => state.albumsReducer.photosData[route.params.id]);
    var dataAlbums = useSelector((state) => state.albumsReducer.albumsData)
    const index = dataAlbums.findIndex(el => el.id = route.params.id)


    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [title, setTitle] = useState("")

    // function handleRename() {
    //     const updateData = dataAlbums[index];
    //     updateData.title = title
    //     dispatch(renameAlbum([updateData, id = route.params.id]))
    //     setModalVisible2(!modalVisible2)
    // }



    React.useEffect(() => {
        if (data === undefined) {
            console.log(route.params.id)
            axios.get(`https://jsonplaceholder.typicode.com/albums/${route.params.id}/photos`)
                .then((response) => {
                    dispatch(photosData([response.data, route.params.id]))
                    console.log("se descargo")
                }).catch(error => {
                    console.log(error)
                    throw error
                })
        }
        navigation.setOptions({

            headerRight: () => (
                <Pressable onPress={() => { setModalVisible(!modalVisible) }}><Entypo name="dots-three-vertical" size={20} color="black" />
                </Pressable>


            ),
        });
    }, []);




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
                }}
            >

                <Pressable style={{ flex: 1 }} onPress={() => {
                    setModalVisible(!modalVisible)
                }} >
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <View style={[styles.shadow, styles.optionsContainer]} >
                            <View style={{ height: "100%", justifyContent: "space-around", margin: 5 }}>
                                <Pressable style={styles.container} onPress={() => {
                                    setModalVisible(!modalVisible)
                                    setModalVisible2(!modalVisible2)
                                }}>
                                    <AntDesign name="edit" size={20} color="black" />
                                    <MyAppHeaderText>Rename Album</MyAppHeaderText>
                                </Pressable>
                                <Pressable style={styles.container}>
                                    <AntDesign name="delete" size={20} color="black" />
                                    <MyAppHeaderText>Delete Album</MyAppHeaderText>
                                </Pressable>
                            </View>
                        </View>


                    </View>
                </Pressable>






            </Modal >


            <Modal animationType="fade"
                transparent={true}
                visible={modalVisible2}
                onRequestClose={() => {
                    setModalVisible2(!modalVisible2)
                }} >
                <View onStartShouldSetResponder={() => true} style={styles.modalView}>
                    <Pressable onPress={() => setModalVisible2(!modalVisible2)} ><Ionicons name="arrow-back-circle-sharp" size={35} color="black" /></Pressable>
                    <MyAppHeaderText style={{ fontSize: 36 }} >Rename Album</MyAppHeaderText>
                    <TextInput onChangeText={setTitle} placeholder="Type here..." style={styles.textInput}></TextInput>
                    <Pressable onPress={()=>{}} style={{ alignSelf: "center" }}><AntDesign name="checkcircleo" size={35} color="blue" /></Pressable>

                </View>

            </Modal>

        </View >

    );

}

const styles = StyleSheet.create({

    optionsContainer: {
        backgroundColor: "white",
        width: width * 0.7,
        height: height * 0.3,
        alignSelf: "center",
    },

    modalView: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "space-around",
    },

    textInput: {
        height: 40,
        borderColor: "#000000",
        borderBottomWidth: 1,
        marginLeft: 10

    },
    shadow: {

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,

    },
    container: {
        flexDirection: "row",

    }
}

);
