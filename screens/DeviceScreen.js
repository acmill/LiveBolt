//  Author: Tony Miller
//  Homepage of the application,

import * as WebBrowser from "expo-web-browser";
import React, { Component, useEffect } from "react";
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
export default class DeviceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doorState: [],
      loading: false,
      deviceName: "",
      deviceID: "",
      lastSeen: "",
      current:""
    };

    this.updateStatus = this.updateStatus.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });

    //  from device list props passed in, device name and id
    const given = this.props.route;

    console.log(given);

    const id = given.params["deviceID"];
    const name = given.params["deviceName"];
    const seen = given.params["lastSeen"];

    console.log(id);
    console.log(name);
    console.log(seen);

    this.setState({ deviceID: id });
    this.setState({ deviceName: name });
    this.setState({ lastSeen: seen });
    setInterval(this.updateStatus, 5000);
  }

  updateStatus() {
    dbh
      .collection("Devices")
      .doc(this.state.deviceID) //props.deviceID
      .onSnapshot((doc) => {
        // console.log("Current data: ", doc.data());
        let res = doc.data()["StatusChanges"].reverse();
        let check = this.state.doorState;
        if (res !== check) {
          this.setState({ doorState: res });
          this.setState({ current: res[0] });
          // console.log(res);
          console.log("something changed..");
        }

        // console.log(this.doorState);
      });
    this.setState({ loading: false });
    
  }
  FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View
        style={{ height: 0.5, width: "100%", backgroundColor: "#C8C8C8" }}
      />
    );
  };

  render() {
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
          <Text style={styles.title}>{this.state.deviceName}</Text>
            {(this.state.current.charAt(0) === 'O')
            ? (<Text style={styles.getStartedText}>Open</Text>)
            :(<Text style={styles.getStartedText}>Closed</Text>)}
          <Text style={styles.getStartedText}>
            Last Seen: {this.state.lastSeen}
          </Text>
        </View>
        <View style={{}}>
          {this.state.loading ? (
            <ActivityIndicator size="small" color="#0a0a0a" />
          ) : (
            <FlatList
              data={this.state.doorState}
              ItemSeparatorComponent={this.FlatListItemSeparator}
              renderItem={({ item, index }) => (
                <View style={styles.statusLine}>
                <Text style={styles.statusText} key={index}>
                  {item}
                </Text>
                </View>
              )}
            />
          )}
        </View>

        <View style={styles.helpContainer}>
          <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
            <Text style={styles.helpLinkText}>
              Help, it didn’t automatically reload!
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.helpContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Root', { screen: 'Settings' })}
            style={styles.backButton}
          >
            <Text
              style={styles.backText}
            >Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

DeviceScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return <Text style={styles.developmentModeText}></Text>;
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/versions/latest/workflow/development-mode/"
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change"
  );
}

const styles = StyleSheet.create({
  statusLine: {
    width: "100%",
    backgroundColor: "grey",
    height: 26,
    marginBottom: 8,
    marginTop: 8,
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    width: "50%",
    backgroundColor: "#4840ee",
    height: 28,
    marginBottom: 8,
    marginTop: 8,
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius:25
  },

  statusText:{
    fontWeight:'bold',
    fontSize:16,
    color:'white'
  },
  backText: {
    color:'white',
  
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 20,
  },
  
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    fontSize: 14,
    color: "#0a0a0a",
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
