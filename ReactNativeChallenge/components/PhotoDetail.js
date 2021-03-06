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
        flexShrink:1,
        marginLeft: 10,
    },
    textInput: {
        borderColor: "#000000",
        borderBottomWidth: 1,

    },
    subContainer: {
        flexDirection: "row",

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
            ><Pressable onPress={() => setModalVisible(!modalVisible)}><Image style={{ height: height, width: width }} source={{ uri: `${route.params.img}.png` }} /></Pressable>
            </Modal>
            <View style={styles.container}>
                <MyAppHeaderText>Details</MyAppHeaderText>
                <View style={styles.subContainer}>
                    <MaterialIcons style={{ alignSelf: "center" }} name="title" size={24} color="black"></MaterialIcons>
                    <MyAppText style={{ margin: 10, flexShrink: 1}}>{route.params.title}</MyAppText>
                </View>
                <View style={styles.subContainer}>
                    <Fontisto name="date" size={24} color="black"></Fontisto>
                    <MyAppText style={{ fontStyle: "italic" }}>{route.params.date ? route.params.date : "  -"}</MyAppText>
                </View>
                <View style={styles.subContainer}>
                    <Entypo style={{ alignSelf: "center" }} name="text" size={24} color="black" > </Entypo>
                    {route.params.description ? <MyAppText style={{ margin:10,flexShrink: 1 }} >{route.params.description}</MyAppText> : <TextInput placeholder="Add a description..." style={styles.textInput}></TextInput>}
                </View>
            </View>
        </ScrollView>

    )

}

