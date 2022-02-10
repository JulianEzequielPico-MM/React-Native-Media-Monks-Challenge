import React from "react";
import { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";

export default function PhotosAlbum({ route }) {

    const [data, setData] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/albums/${route.params.id}/photos`)
            .then((response) => {
                console.log(data)
                setData(response.data);
            }).catch(error => {console.log(error)
            throw error})
    }, []);

    return (
        <View>
            <FlatList
                data={data}
                removeClippedSubviews={true}
                initialNumToRender={7}
                keyExtractor={({ id }) => id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('PhotoDetail', { title:item.title,img:item.url})} >                      
                        <Image style={{ height: 200, width: 200 }} source={{ uri: `${item.url}.png` }} testID={`${item.id}`} />
                    </TouchableOpacity>
                )
                }
            />

        </View>

    );

}