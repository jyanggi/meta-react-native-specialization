
import { useEffect, useState, useCallback, useMemo, useContext } from 'react';
import { Image, StyleSheet, Text,  View, SafeAreaView,  useWindowDimensions, FlatList, Pressable, Alert} from "react-native";
import {  Separator } from "react-native-btr";
import {getProfile, getInitials, useUpdateEffect} from "../utils";
import Avatar from "../components/Avatar";
import MenuItem from "../components/MenuItem";
import CategoryList from "../components/CategoryList";
import debounce from 'lodash.debounce';
import { Searchbar } from 'react-native-paper';
import { LoggedInContext } from "../context";
import {
  getMenuItems,
  filterByQueryAndCategories
} from '../database';


const sections = ['Starters', 'Mains', 'Desserts', 'Drinks', 'Specials'];

const Home = ({navigation})=>{
    const {state} = useContext(LoggedInContext);
    const {height, width} = useWindowDimensions();
    const [menu, setMenu] = useState([]);
    const [filterSelections, setFilterSelections] = useState(
      sections.map(() => false)
    );
    const [query, setQuery] = useState('');
    const [searchBarText, setSearchBarText] = useState('');

    const lookup = useCallback((q) => {
      setQuery(q);
    }, []);

    const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

    const handleFiltersChange = async (index) => {
      const arrayCopy = [...filterSelections];
      arrayCopy[index] = !filterSelections[index];
      setFilterSelections(arrayCopy);
    };


    const handleSearchChange = (text) => {
      setSearchBarText(text);
      debouncedLookup(text);
    };


  useEffect(()=>{
    const fetchData = async ()=>{
       let dbMenuItems = await getMenuItems();
       setMenu(dbMenuItems);
    }
    fetchData();
  },[])


  useUpdateEffect(() => {
    (async () => {
      const activeCategories = sections.filter((s, i) => {
        // If all filters are deselected, all categories are active
        if (filterSelections.every((item) => item === false)) {
          return true;
        }
        return filterSelections[i];
      });
      try {
        const menuItems = await filterByQueryAndCategories(
          query,
          activeCategories
        );
        setMenu(menuItems);
      } catch (e) {
        Alert.alert(e.message);
      }
    })();
  }, [filterSelections, query]);

    return (state.profile && <SafeAreaView style={[styles.container]}>
    <View style={{width: width, minHeight: height *.6}}>
    <View style={[styles.header, {marginBottom: height * .01, paddingTop: height *.1}]} >
    <Image resizeMode= "contain" style={{width: width *.8, height: height * .05}} source={require('../assets/Logo.png')} />
    <Pressable onPress={()=> navigation.navigate("Profile")}>
    <Avatar size={height * .05} width={width * .2} placeholder={getInitials(state.profile)}  url={state.profile.image}/>
    </Pressable>
    </View>
    <View style={[styles.hero]}>
        <Text style={styles.heroTitle}>Little Lemon</Text>
        <View style= {styles.heroSubSection}>
          <View style={{flexDirection: "column", width: width* .6}}>
          <Text style={styles.heroSubTitle}>Chicago</Text>
          <Text style={styles.heroDescription}>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</Text>
      </View>
        <Image resizeMode= "contain" style={{width: width* .32, height: width* .4, borderRadius: 16}} source={require('../assets/Hero_image.png')} />
    </View>
    <Searchbar
        onChangeText={handleSearchChange}
        value={searchBarText}
        style={styles.searchBar}
        iconColor="#495E57"
        inputStyle={{ color: '#333333' }}
        elevation={0}
      />
    </View>
    <Text style={[styles.title,{ padding: 10, fontWeight: "bold"}]}>
    ORDER FOR DELIVERY!
    </Text>
    <CategoryList
        selections={filterSelections}
        onChange={handleFiltersChange}
        sections={sections}
      />
    <Separator/>
    </View>
    <View style={{width: width, height: height*.4}}>
      <FlatList
        data={menu}
        ItemSeparatorComponent={Separator}
        keyExtractor={(item) => item.name}
        renderItem={({item})=>  <MenuItem {...item} />}></FlatList>
    </View>
</SafeAreaView>);

}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "white",
    },
    header:{
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    },
    label:{
      color: "grey",
      fontSize: 15,
      marginLeft: 10
    },
    title: {
      color: "#333333",
      fontSize: 18,
      fontFamily: 'Karla-Regular',
    },

    input: {
      height: 35,
      marginVertical: 15,
      borderRadius: 8,
      borderWidth: 1,
      padding: 8,
      fontSize: 16,
      borderColor: "#495E57",
    },
    error:{
      color: "#EE9972",
      fontSize: 14,
      paddingBottom: 15
    },
    hero:{
        backgroundColor: "#495E57",
        flexDirection: "column",
        padding: 25,
    },
    heroTitle:{
        fontSize: 40,
        color: "#F4CE14",
        fontFamily: 'MarkaziText-Regular',
    },
    heroSubTitle:{
        fontSize: 30,
        color: "#EDEFEE",
        fontFamily: 'MarkaziText-Regular',
    },
    heroDescription:{
        fontSize: 15,
        color: "#EDEFEE",
        fontFamily: 'Karla-Regular',
        paddingRight:8
    },
    heroSubSection:{
        flexDirection: "row",
        justifyContent:'space-between',
    },
    searchBar: {
      marginTop: 25,
      fontSize: 16,
      fontFamily: 'Karla-Regular',
      backgroundColor: '#EDEFEE',

    },
});
export default Home;