import React from "react";
import { useState } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { Text, View, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions, Pressable, Modal, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { albumsData, filterAlbums } from "../Redux/02-actions";
import MyAppText from "./MyAppText";
import MyAppHeaderText from "./MyAppHeaderText"
import { Entypo } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

let { width, height } = Dimensions.get("window")


export default function Home() {


    const dataRedux = useSelector(state => state.albumsReducer.albumsData)
    const albumFiltered = useSelector(state => state.albumsReducer.filterAlbums)
    const headerHeight = useHeaderHeight()
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [searchData, setSearchData] = useState([]);


    function handleSearch(text) {
        const filteredData = dataRedux.filter((el) => el.title.toLowerCase().includes(text.toLowerCase()));
        setSearchData(filteredData)
 
    }

    if (dataRedux.length === 0) {
        axios.get("https://jsonplaceholder.typicode.com/albums")
            .then((response) => {
                dispatch(albumsData(response.data.slice(0, 10)));
                setSearchData(response.data.slice(0, 10));
            }).catch(error => console.log(error))
    };



    React.useLayoutEffect(() => {

        navigation.setOptions({
            headerTitleAlign: "center",
            headerSearchBarOptions: {
                onChangeText: (event) => handleSearch(event.nativeEvent.text)
            },

            headerRight: () => (

                <Entypo name="dots-three-vertical" size={20} color="white" />
            )
        });
        navigation.addListener('focus', () => {
            setSearchData(dataRedux)

        });
    }, [searchData]);







    const styles = StyleSheet.create({
        view: {
            marginTop: (Platform.OS === 'ios') ? headerHeight * 2 : 0
        },
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
    }

    );



    return (
        < View style={styles.view}>
            <FlatList
                data={searchData}
                removeClippedSubviews={true}
                horizontal={false}
                numColumns={2}
                keyExtractor={({ id }) => id.toString()}
                renderItem={({ item }) => (

                    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('PhotosAlbum', { id: item.id, name: item.title })}>
                        <View style={styles.imageContainer}>
                            <Image style={{ height: width / 2.5, width: width / 2.5, }} source={require(`../assets/fondoalbum.png`)} />
                        </View>
                        <MyAppText >{item.title}</MyAppText>
                    </TouchableOpacity>



                )
                } />

        </View >

    );


}






