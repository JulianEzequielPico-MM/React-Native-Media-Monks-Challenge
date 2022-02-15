import React from "react";
import { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { photosData } from "../Redux/02-actions";
import * as Animatable from "react-native-animatable";


let { width: screenWidth, height: screenHeight } = Dimensions.get("window")



export default function PhotosAlbum({ route }) {

    dispatch = useDispatch();
    const data = useSelector((state) => state.photosData[route.params.id]);
    const navigation = useNavigation();


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
                            <Image style={{ height: screenWidth / 2, width: screenWidth / 2 ,borderColor:"white",borderWidth:2}} source={{ uri: `${item.url}.png` }} testID={`${item.id}`} />
                        </TouchableOpacity>
                    </Animatable.View>
                )
                }
            />

        </View>

    );

}