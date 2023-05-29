
import * as React from "react";
import { Image, StyleSheet, Text, View, useWindowDimensions} from "react-native";


const getImageUrl = (imageFileName) =>  `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${imageFileName}?raw=true`;

const MenuItem = ({name, price, description, image, category})=>{
    const {height, width} = useWindowDimensions();
    return (
    <View style={styles.menuContainer}>
    <View style={[styles.menuInfo, {width: width*.6}]}>
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.description}>{description}</Text>
    <Text style={styles.price}>${price}</Text>
    </View>
    <Image resizeMode= "contain" style={{width: width *.4, height: width *.4}} source={{ uri: getImageUrl(image),  cache: 'only-if-cached'}} />
    </View>);
}


const styles = StyleSheet.create({
    menuContainer:{
        flex: 1,
        flexDirection: "row",
        padding: 25
    },
    menuInfo:{
        flexDirection: "column",
        flex: 1
    },
    name: {
        color: "black",
        fontSize: 20,
        fontFamily: 'Karla-Regular',
        fontWeight: "bold",
        marginBottom: 10
      },
      description: {
        color: "#333333",
        fontSize: 14,
        fontFamily: 'Karla-Regular',
        marginBottom: 10
      },
      price: {
        color: "#495E57",
        fontSize: 16,
        fontFamily: 'Karla-Regular',
        fontWeight: "bold",
      },
});

export default MenuItem;