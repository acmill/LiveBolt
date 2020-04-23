//  Author: Tony Miller
//  Homepage of the application, showing all devices on the server

import * as WebBrowser from "expo-web-browser";
import React, { Component, useState, useEffect } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList,
  Vibration,
  YellowBox,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { MonoText } from "../components/StyledText";
import dbh from "../constants/fb_config";

YellowBox.ignoreWarnings([
  "VirtualizedLists should never be nested", // TODO: Remove when fixed
]);

//props:
//  deviceID
//  device
export default function DeviceListScreen({navigation}) {
  const [devices, setDevices] = useState([]);
  const [isLoading, setLoading] = useState([]);
  
    async function getDevices() {
        const snapshot = await dbh.collection("Devices").onSnapshot( (collec) => {
            return collec.docs
        })
        return snapshot
    };



  useEffect(() => {

//     setDevices( [
//         {
//             deviceID:"FRONT-DOOR-HOME",
//             deviceName:"Front Door - Home",
//             lastSeen:'8 days ago'
//         },

//         {
//             deviceID:"Uq7l7erCCK7l73By",
//             deviceName:"Apartment Door",
//             lastSeen:'two weeks ago'

//         },

//         {
//             deviceID:"niWe4GtaV0N5xxhX",
//             deviceName:"Back Door - Home",
//             lastSeen: "two weeks ago"

//         },

//         {
//             deviceID:"rDhzW3pXq4yUbIZL",
//             deviceName:"Office Door",
//             lastSeen:'12 Days ago'

//         },


//     ] );
    setLoading(false);

  }, []);


  const FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View style={{height: 4, width: '100%', backgroundColor: '#C8C8C8'}}/>
    );
  };



  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Image
          source={
            __DEV__
              ? require("../assets/images/livebolt-logo.png")
              : require("../assets/images/livebolt-logo.png")
          }
          style={styles.welcomeImage}
        />
      </View>
      <View style={styles.item}>
        <Text style={styles.title}>Your Devices</Text>
      </View>
      <View style={{ }}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#0a0a0a" />
        ) : (
          <FlatList
            data={devices}
            ItemSeparatorComponent={FlatListItemSeparator}
            renderItem={({ item, index }) => (
              <View style={{display:'flex', flexWrap:'nowrap', textAlign:'center', justifyContent:'center', alignItems:'center'}}>
                <TouchableOpacity
            
                  title="device"
                  style={styles.deviceButton}
                  onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    navigation.push("Device", {
                      deviceID: item.deviceID,
                      deviceName: item.deviceName,
                      lastSeen: item.lastSeen,
                    });
                  }}
                >
                    <Text style={styles.nameText}>
                        {item.deviceName}
                    </Text>
                    <Text style={styles.lastText}>
                        Last seen {item.lastSeen}
                    </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  nameText: {
  color:'white',

    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
},
lastText: {
  color:'white',
  textAlign: 'center',
  fontStyle: 'italic',
  fontSize: 20,
},
  deviceButton:{
      justifyContent:'center',
      alignItems:'center',
    width:"100%",
backgroundColor:"#4845ee",
    height:62,
    marginBottom:8,
    marginTop:8,
    display:'flex',
    borderTopWidth:4,
    borderBottomWidth:4,
    borderColor:'grey'
    
    
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center",
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)",
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center",
  },
  item: {
    backgroundColor: "#0000",
    padding: 2,
    marginVertical: 8,
    marginHorizontal: 4,
  },
  title: {
    fontSize: 32,
    textAlign: "center",
  },

  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center",
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
