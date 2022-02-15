import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, View,FlatList, Image, TouchableOpacity, StyleSheet, Dimensions, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { albumsData } from "../Redux/02-actions";
import MyAppText from "./MyAppText";
import { Entypo } from '@expo/vector-icons';


let { width: screenWidth, height: screenHeight } = Dimensions.get("window")


export default function Home() {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const data = useSelector((state) => state.albumsData)

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View >
                    <Entypo name="dots-three-vertical" size={20} color="black" />

                </View>
            ),
        });
    }, [navigation]);




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
                            <Image style={{ height: screenWidth / 2.5, width: screenWidth / 2.5, }} source={require(`../assets/fondoalbum.png`)} />
                        </View>
                        <MyAppText style={{}}>{item.title}</MyAppText>
                    </TouchableOpacity>



                )
                } />
        </View >
    );


}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        width: "50%",
        height: "50%",
        padding: 10
    },
    imageContainer: {
        backgroundColor: "red",
        borderRadius: 10,
    }

});