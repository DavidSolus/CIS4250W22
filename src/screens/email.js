// React
import { StyleSheet, Text, View, Button, Image, SafeAreaView, ScrollView, Modal, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as Google from 'expo-google-app-auth';
// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import * as MailComposer from 'expo-mail-composer';


function EmailScreen({ navigation }) {
  const [accessToken, setAccessToken] = React.useState();
  const [userInfo, setUserInfo] = React.useState();
  const [userEmailList, setUserEmailList] = React.useState();
  const [userEmail, setUserEmail] = React.useState();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [sendTo, setSendTo] = React.useState();
  const [sendSubject, setSendSubject] = React.useState();
  const [sendBody, setSendBody] = React.useState();


  //var arrayEmails = [{"id":"1","from":"ajshields@rogers.com","subject":"test","body":"this is the first email with lots of writing to see if itll go off page"},{"id":"2","from":"ashiel01@uoguelph.ca","subject":"test2","body":"this is the second email, sent from school email"},{"id":"3","from":"ajshields@rogers.com","subject":"hello","body":"hello world, i am alive"}];
  var arrayEmails = [];

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync ({
        androidClientId: "313332122751-ollluipvbg60kumi9engkerqv553045n.apps.googleusercontent.com",
        iosClientId: "313332122751-5gqn8c5ha4fivukqge8lrqr1ro1vh1dj.apps.googleusercontent.com",
        scopes: ["https://mail.google.com/ https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.readonly "]
      });

      if(result.type === "success") {
        setAccessToken(result.accessToken);
      } else {
        console.log("Permissions denied");
      }
    } catch (error) {
      console.log(error);
    }
  }

  //Get all user data including profile and email api calls
  async function getUserData() {
    //Get user profile data
    let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}`}
    });
    userInfoResponse.json().then(data => {
      setUserInfo(data);
    });

    //Get user email list data
    let userEmailListResponse = await fetch("https://gmail.googleapis.com/gmail/v1/users/"+userInfo.email+"/messages", {
      headers: { Authorization: `Bearer ${accessToken}`}
    });
    var tempEmailList = [];
    userEmailListResponse.json().then(data => {
      for(var i = 0; i < data.messages.length; i++) {
        tempEmailList.push(data.messages[i].id);
      }
      setUserEmailList(tempEmailList);
    });

    //Get user email info
    var tempEmail = [];
    for(var i = 0; i < userEmailList.length; i++) {
      let userEmailResponse = await fetch("https://gmail.googleapis.com/gmail/v1/users/"+userInfo.email+"/messages/"+userEmailList[i], {
        headers: { Authorization: `Bearer ${accessToken}`}
      });
      userEmailResponse.json().then(data => {
          tempEmail.push(data);
      });
    }
    setUserEmail(tempEmail);
  }

  function showUserInfo() {
    if(userInfo) {
      return (
        <View style={styles.userInfo}>
          <Image source={{ uri: userInfo.picture }} style={styles.profilePic} />
          <Text>Welcome {userInfo.name}</Text>
          <Text>{userInfo.email}</Text>
        </View>
      );
    }
  }

  //console.log(jsonArray);

  function showUserEmails() {
    if(userInfo) {
      if(userEmail) {
        //loop through all email data and pick out important info
        for(var i = 0; i < userEmail.length; i++) {
          var checkInInbox = false;
          for(var j = 0; j < userEmail[i].labelIds.length; j++) { //checks to see if the mail item is in the inbox mailbox
            if(userEmail[i].labelIds[j] == "INBOX")
              checkInInbox = true
          }
          if(checkInInbox) { //only post email if it is in the inbox mailbox
            var tempFrom;
            var tempSubject;
            for(var j = 0; j < userEmail[i].payload.headers.length; j++) {
              switch(userEmail[i].payload.headers[j].name) { //checks specific json headers for from and subject values
                case "From":
                  tempFrom = userEmail[i].payload.headers[j].value;
                  break;
                case "Subject":
                  tempSubject = userEmail[i].payload.headers[j].value;
                  break;
                default:
                  break;
              }
            }

            const tempJSON = { //create temp json to add to entire array
              "id":i,
              "from":tempFrom,
              "subject":tempSubject,
              "body":userEmail[i].snippet.replace('&#39;','\'')
            }
            arrayEmails.push(tempJSON);
          }
        }
      }

      //Loop through all emails and set up each email message on the screen with all info
      const getEmails = arrayEmails => {
        let content = [];
        for (let i = 0; i < arrayEmails.length; i++) {
          const item = arrayEmails[i];
          content.push(<><Text key={item.id} style={styles.emailHeader}>From:</Text><Text>{item.from}</Text><Text style={styles.emailHeader}>Subject:</Text><Text>{item.subject}</Text><Text style={styles.emailHeader}>Message:</Text><Text>{item.body}</Text><View style={styles.replyButtons}><Button title={"Reply"} onPress={() => {setSendTo(getReplyEmailAddress(item.from)); setModalVisible(true)}} /></View><Text style={{paddingTop:10, paddingBottom:15}}>_____________________________________________</Text></>);
        }
        return content;
      };
      return <View style={styles.emailInfo}>{getEmails(arrayEmails)}</View>;
    }
  }

  //Used to isolate the email adress from the sender header
  function getReplyEmailAddress(email) {
    for(var j = 0; j < email.length; j++) {
      if(email[j] == '<')
          var start = j+1;
        if(email[j] == '>')
          var end = j;
    }
    var replyEmail = email.substring(start, end);
    return replyEmail;
  }

  function sendEmailButton() {
    if(accessToken) {
      return(
         <Button title={"Send Mail"} onPress={() => setModalVisible(true)} />
      );
    }
  }

  //Send email functionality
  async function sendEmailAsync() {
    let result = await MailComposer.composeAsync({
      recipients: [sendTo],
      subject: sendSubject,
      body: sendBody,
    });
  
    alert(result.status);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {showUserInfo()}
        <Modal animationType='slide' visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modal}>
            <TextInput value={sendTo} onChangeText={(sendTo) => setSendTo(sendTo)} placeholder={'TO'} style={styles.textInput} />
            <TextInput value={sendSubject} onChangeText={(sendSubject) => setSendSubject(sendSubject)} placeholder={'SUBJECT'} style={styles.textInput} />
            <TextInput multiline value={sendBody} onChangeText={(sendBody) => setSendBody(sendBody)} placeholder={'COMPOSE EMAIL'} style={styles.textInput}/>
            <Text>{'\n'}</Text>
            <Button title={"Send"} onPress={sendEmailAsync} />
            <Text>{'\n'}</Text>
            <Button title={"Hide"} onPress={() => {setModalVisible(false); setSendTo(''); setSendSubject(''); setSendBody('')}} />
          </View>
        </Modal>
        <View style={styles.buttons}>
          <Button title={accessToken ? "View Inbox" : "Sign in with Google"} onPress={accessToken ? getUserData : signInWithGoogleAsync} />
          {sendEmailButton()}
        </View>
        {showUserEmails()}
        <Text>{'\n'}</Text>
        {/* <StatusBar style="auto" />  */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollView: {
    backgroundColor: '#fff',
    marginHorizontal: 20
  },
  modal: {
    backgroundColor: '#fff',
    margin: 50,
    padding: 40,
    borderRadius: 10,
    flex: 1
  },
  buttons: {
    paddingTop: 40,
    paddingBottom: 40,
    width: 'auto',
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  replyButtons: {
    paddingTop: 20
  },
  userInfo: {
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#e8e8e8'
  },
  emailInfo: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20
  },
  emailHeader: {
    marginTop: 10,
    fontWeight: 'bold'
  },
  profilePic: {
    width: 50,
    height: 50
  }
});

export { EmailScreen };