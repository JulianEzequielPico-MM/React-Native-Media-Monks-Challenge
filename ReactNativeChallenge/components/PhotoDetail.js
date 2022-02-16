import React from "react";
import { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, Modal, Pressable, TextInput, ScrollView } from 'react-native';
import MyAppText from "./MyAppText";
import MyAppHeaderText from "./MyAppHeaderText"
import axios from "axios";
import { MaterialIcons, Fontisto, Entypo, AntDesign } from '@expo/vector-icons';


const { width, height } = Dimensions.get("window")

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height * 0.4,
        justifyContent: "space-evenly",
        marginLeft: 10,

    },
    textInput: {
        borderColor: "#000000",
        borderBottomWidth: 1,

    }

});

export default function PhotoDetail({ route }) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <ScrollView >
            <Pressable onPress={() => { setModalVisible(!modalVisible) }}><Image style={{ height: height * 0.4, width: width }} source={{ uri: `${route.params.img}.png` }} /></Pressable>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            ><Image style={{ height: height, width: width }} source={{ uri: `${route.params.img}.png` }} />
            </Modal>
            <View style={styles.container}>
                <MyAppHeaderText >Details</MyAppHeaderText>
                <MaterialIcons name="title" size={24} color="black"> <MyAppText  >{route.params.title}</MyAppText></MaterialIcons>
                <Fontisto name="date" size={24} color="black"> <MyAppText style={{ fontStyle: "italic" }}>{route.params.date ? route.params.date :" -"}</MyAppText></Fontisto>
                <Entypo name="text" size={24} color="black" > <MyAppText>{route.params.description ? route.params.description : <View><TextInput placeholder="Add a description..." style={styles.textInput}></TextInput></View>}</MyAppText> </Entypo>
            </View>
        </ScrollView>

    )

}

