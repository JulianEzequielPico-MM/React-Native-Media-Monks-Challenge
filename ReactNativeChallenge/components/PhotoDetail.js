import React from "react";
import { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';
import axios from "axios";


export default function PhotoDetail({ route }) {


    return(
        <View>
            <Text>{route.params.title}</Text>
            <Image style={{ height: 200, width: 200 }} source={{ uri: `${route.params.img}.png` }}  />
        </View>

    )

}