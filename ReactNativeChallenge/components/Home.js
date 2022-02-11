import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Text, View, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import imagen from "../assets/fondoalbum.png"
import axios from "axios";
import { albumsData } from "../Redux/02-actions";

export default function Home() {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const data = useSelector((state) => state.albumsData)

    if (data.length === 0) {

        axios.get("https://jsonplaceholder.typicode.com/albums")
            .then((response) => {
                dispatch(albumsData(response.data));
                console.log("se descargo")
            }).catch(error => console.log(error))


    }


    return (
        < View >
            <Text>Album List</Text>
            <FlatList
                data={data}
                keyExtractor={({ id }) => id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('PhotosAlbum', { id: item.id })}>
                        <Text >{item.title}</Text>
                        <Image source={require(`../assets/fondoalbum.png`)} />
                    </TouchableOpacity>
                )
                } />
        </View >
    );


}