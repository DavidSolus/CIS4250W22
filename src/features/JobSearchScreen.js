// PLAN/TODO: 
// Be able to search google for jobs
// Be able to search other job API
// 1. be able to search anything on google
// 2. be able to search for key words on google (dropdown buttons etc)
// 3. Be able to use the dropdown buttons to search other sites

import React, { useCallback, useState, setState } from "react";
import { Alert, Button, Linking, StyleSheet, View, TextInput } from "react-native";

// Test Values
const supportedURL = "https://google.com";
const unsupportedURL = "slack://open?team=123456";
const googleSearchURL = "http://google.com/search?q=";
const indeedSearchURL = "https://ca.indeed.com/jobs?q=";
const linkedInSearchURL = "https://www.linkedin.com/jobs/search?=keywords";

const google = "google";
const indeed = "indeed";
const linkedin = "linkedin";
const titlePlaceHolder = "   Job Title   "; //Spaces are deliberate
const cityPlaceHolder = "   City   "; //Spaces are deliberate

const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} />;
};

const SearchGoogleButton = ({}) => {
  const [textInputValue, setTextInputValue] = useState("");
  const [cityInputValue, setCityInputValue] = useState("");

  const onPressThing = async (website)  => {
    let url = "";
    switch (website) {
      case google:
        url = googleSearchURL+textInputValue+" jobs";
        if (cityInputValue != "") {
          url += " near " + cityInputValue;
        }
        break;
      case indeed:
        url = indeedSearchURL+textInputValue;
        if (cityInputValue != "") {
          url += "&l=" + cityInputValue;
        }
        break;
      case linkedin:
        url = linkedInSearchURL+textInputValue;
    }
    console.log("......... TEST: " + website);
    alert("Opening " + url);
    await Linking.openURL(url);
  }

  // On Change
  const onChangeTextTitle = (text) => {
    setTextInputValue(text);
  }
  const onChangeTextCity = (text) => {
    setCityInputValue(text);
  }

  // On Press
  const onPressGoogle = async () => {
    onPressThing(google);
  }
  const onPressIndeed = async () => {
    onPressThing(indeed);
  }
  const onPressLinkedIn = async () => {
    onPressThing(linkedin);
  }

  return (
    <View>
      <Button
        onPress={onPressGoogle}
        title={"Search Google"}
      />
      <Button
        onPress={onPressIndeed}
        title={"Search Indeed"}
      />
      {/* <Button
        onPress={onPressLinkedIn}
        title={"Search LinkedIn"}
      /> */}
      <TextInput
        style={{borderWidth:1}}
        onChangeText={onChangeTextTitle}
        value={textInputValue}
        placeholder={titlePlaceHolder}
      />
      <TextInput
        style={{borderWidth:1}}
        onChangeText={onChangeTextCity}
        value={cityInputValue}
        placeholder={cityPlaceHolder}
      />
    </View>
  );
}

const JobSearchScreen = () => {


  return (
    <View style={styles.container}>
      <SearchGoogleButton/>
      <></>
      {/* <OpenURLButton url={supportedURL}>Open Supported URL</OpenURLButton>
      <OpenURLButton url={unsupportedURL}>Open Unsupported URL</OpenURLButton> */}
    </View>
  );
};

// const styles = StyleSheet.create({})
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default JobSearchScreen;