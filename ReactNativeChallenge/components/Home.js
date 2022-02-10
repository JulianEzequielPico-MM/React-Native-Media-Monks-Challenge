import React from "react";
import { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import imagen from "../assets/fondoalbum.png"
import axios from "axios";

export default function Home() {
    const navigation = useNavigation();

    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/albums")
            .then((response) => {
                setData(response.data);
            }).catch(error => console.log(error))
    }, []);



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