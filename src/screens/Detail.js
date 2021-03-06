import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  LogBox,
  Alert,
  ImageBackground,
  Modal,
  Button,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import DropShadow from "react-native-drop-shadow";
import { firebase_db } from "../firebaseConfig";
import * as Application from "expo-application";
import { FontAwesome } from '@expo/vector-icons';

export default function Detail({ navigation, route }) {
  LogBox.ignoreAllLogs();

  const [prevdata, setPrevdata] = useState(); //route로 받아온 데이터 저장용

 

  useEffect(() => {
    const { idx } = route.params;
    firebase_db
      .ref("/perfume/" + idx)
      .once("value")
      .then((snapshot) => {
        let data = snapshot.val();
        setPrevdata(data);
      });
  }, []);

 

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      {Platform.OS == "ios" ? (
        <DropShadow style={styles.shadowProp}>
          <View style={styles.img_box}>
          {prevdata !== undefined ? 
            <ImageBackground
            source={{uri : prevdata.img_link}}
            style={{ resizeMode: "contain", flex: 1 }}
            imageStyle={{
              borderBottomRightRadius: 70,
              borderBottomLeftRadius: 70,
            }}
          />
          :<View></View>
          
          }
          </View>
          <View style={styles.Text_box}>
            <View
              style={{
                marginHorizontal: 10,
                flex: 1,
                flexDirection: "row",
              }}
            >
              <View style={{ flex: 1, justifyContent: "center" }}>
              {prevdata !== undefined ? (
                        <Text style={{ fontSize: 28 }} numberOfLines={2}>
                    {prevdata.title}
                  </Text>
                ) : undefined}
              </View>

            </View>

            <View style={{ marginHorizontal: 10, flex: 2 }}>
            {prevdata !== undefined ? (
                <Text style={{ color: "black" }} numberOfLines={3}>
                  {prevdata.explain}
                </Text>
              ) : undefined}
            </View>
          </View>

          <TouchableOpacity onPress={() => {}} style={styles.Button_box}>
            <Text style={styles.Button_box_text}>바로가기</Text>
          </TouchableOpacity>
        </DropShadow>
      ) : (
        <>
          <View style={styles.img_box}>
          {prevdata !== undefined ? 
            <ImageBackground
            source={{uri : prevdata.img_link}}
            style={{ resizeMode: "contain", flex: 1 }}
            imageStyle={{
              borderBottomRightRadius: 70,
              borderBottomLeftRadius: 70,
            }}
          />
          :<View></View>
          
          }
          </View>
          <View
            style={{
              ...styles.Text_box,
              elevation: 10,
              shadowColor: "#141414",
            }}
          >
            <View
              style={{
                marginHorizontal: 10,
                flex: 1,
                flexDirection: "row",
              }}
            >
              <View style={{ flex: 2, justifyContent: "center" }}>
                {prevdata !== undefined ? (
                  <Text style={{ fontSize: 28 }} numberOfLines={2}>
                    {prevdata.title}
                  </Text>
                ) : undefined}
              </View>

            </View>

            <View style={{ marginHorizontal: 10, flex: 2 }}>
              {prevdata !== undefined ? (
                <Text style={{ color: "black" }} numberOfLines={3}>
                  {prevdata.explain}
                </Text>
              ) : undefined}
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {}}
            style={{
              ...styles.Button_box,
              elevation: 10,
              shadowColor: "#141414",
            }}
          >
            <Text style={styles.Button_box_text}>바로가기</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  img_box: {
    height: Dimensions.get("window").height * 0.55,
    marginTop : '10%',    backgroundColor: "white",
    borderBottomRightRadius: 70,
    borderBottomLeftRadius: 70,
  },
  Text_box: {
    marginHorizontal: 10,
    marginTop: 10,
    height: Dimensions.get("window").height * 0.23,
    backgroundColor: "white",
    borderWidth: 3,
    borderRadius: 20,
  },
  Button_box: {
    marginHorizontal: 10,
    marginTop: 10,
    borderWidth: 3,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: "5%",
    marginHorizontal: "2%",
  },
  Button_box_text: {
    fontSize: 18,
    fontWeight: "700",
  },

  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
});
