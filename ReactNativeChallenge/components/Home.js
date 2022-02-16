import React from "react";
import { useState } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { Text, View, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions, Pressable, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { albumsData } from "../Redux/02-actions";
import MyAppText from "./MyAppText";
import MyAppHeaderText from "./MyAppHeaderText"
import { Entypo } from '@expo/vector-icons';



let { width, height } = Dimensions.get("window")

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        width: "50%",
        height: "50%",
        padding: 10
    },
    imageContainer: {
        backgroundColor: "gray",
        borderRadius: 10,
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
        
    }
}

);


export default function Home() {


    const navigation = useNavigation();
    const dispatch = useDispatch();
    const data = useSelector((state) => state.albumsData)
    const [modalVisible, setModalVisible] = useState(false);

    React.useEffect(() => {
        navigation.setOptions({
            headerRight: () => (

                <Pressable onPress={() => { setModalVisible(!modalVisible) }}><Entypo name="dots-three-vertical" size={20} color="black" />
                </Pressable>


            ),
        });
    }, [modalVisible]);




    if (data.length === 0) {
        axios.get("https://jsonplaceholder.typicode.com/albums")
            .then((response) => {
                dispatch(albumsData(response.data.slice(0, 10)));
                console.log("se descargo")
            }).catch(error => console.log(error))
    }



    return (
        < View>
            <FlatList
                data={data}
                removeClippedSubviews={true}
                horizontal={false}
                numColumns={2}
                keyExtractor={({ id }) => id.toString()}
                renderItem={({ item }) => (

                    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('PhotosAlbum', { id: item.id, name: item.title })}>
                        <View style={styles.imageContainer}>
                            <Image style={{ height: width / 2.5, width: width / 2.5, }} source={require(`../assets/fondoalbum.png`)} />
                        </View>
                        <MyAppText style={{ fontStyle: "bold" }}>{item.title}</MyAppText>
                    </TouchableOpacity>



                )
                } />

            <Modal animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible)
                }} >
                <View style={[styles.shadow, { backgroundColor: "white", width: width * 0.7, height: height * 0.4, alignSelf: "flex-end"}]} >
                    <View style={{height:"100%",justifyContent: "space-around" ,margin:5}}>
                        <MyAppHeaderText>Create Album</MyAppHeaderText>
                        <MyAppHeaderText>Delete Album</MyAppHeaderText>
                        <MyAppHeaderText>Delete Album</MyAppHeaderText>
                    </View>
                </View>

            </Modal>


        </View >
    );


}

