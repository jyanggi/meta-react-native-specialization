
import * as React from "react";
import { Image, StyleSheet, Text, View} from "react-native";

const Avatar = ({url, placeholder, size})=>{
    return <View style={styles.container}>
      {url ? <Image source={{ uri: url }} style={{ width: size, height: size, borderRadius: size/2 }} /> :
      <View style={{alignSelf: "center", flex: 1,  justifyContent: 'center', alignItems: "center", width: size, height: size, borderRadius: size/2, backgroundColor: "#EE9972" }}>
        <Text style={{ alignSelf: "center", color:"white", fontSize: size/2}}>{placeholder}</Text>
        </View>}
    </View>;

}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignSelf: "center",
      alignItems: "center"
    },
});
export default Avatar;