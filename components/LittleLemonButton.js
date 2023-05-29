import * as React from "react";
import {Text, Pressable, StyleSheet} from "react-native";

const LittleLemonButton = ({onPress, text, textColor, fontSize, color, disabled, buttonStyle}) => {
    return (  <Pressable
        onPress={onPress}
        style={[styles.pressable, {backgroundColor: color||'#F4CE14'},  buttonStyle]}
        disabled={disabled}
      >
        <Text style={{fontFamily: "Karla-Regular", fontSize: fontSize, color: textColor}}>{text}</Text>
      </Pressable>)
}


const styles = StyleSheet.create({
      pressable: {
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
      },
  });
export default LittleLemonButton;