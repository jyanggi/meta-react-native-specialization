import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';

const CategoryList = ({ onChange, selections, sections }) => {
  return (
    <ScrollView horizontal={true} >
      {sections.map((section, index) => (
       <TouchableOpacity
            onPress={() => {
                onChange(index);
            }}
          key= {section}
          style={[styles.category, {backgroundColor: selections[index] ? "#495E57": "#EDEFEE"}]}>
          <View>
            <Text style={{ color: selections[index] ? 'white' : '#333333' }}>
              {section}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
      category: {
         fontFamily: 'Karla-Regular',
         fontWeight: "bold",
         margin: 8,
         borderRadius: 16,
         flexDirection: 'row',
         justifyContent: 'center',
         padding: 10,
      },
  });

export default CategoryList;
