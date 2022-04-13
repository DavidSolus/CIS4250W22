// React
import { StyleSheet, TouchableOpacity, Text, View, Button, Image, SafeAreaView, ScrollView, Modal, TextInput, DateTimePicker } from 'react-native';
import * as Google from 'expo-google-app-auth';
// import { StatusBar } from 'expo-status-bar';
import React, {useContext} from 'react';
import * as MailComposer from 'expo-mail-composer';
import { JobStatusContext } from '../contexts/JobStatusContext';
import DateFilter from '../features/DateFilter';
import { AntDesign } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker'
 
 
function EmailScreen({ navigation }) {
  const [accessToken, setAccessToken] = React.useState();
  const [userInfo, setUserInfo] = React.useState();
  const [userEmailList, setUserEmailList] = React.useState();
  const [userEmail, setUserEmail] = React.useState();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [sendTo, setSendTo] = React.useState();
  const [sendSubject, setSendSubject] = React.useState();
  const [sendBody, setSendBody] = React.useState();

  //set flag
  const [flag, setFlag] = React.useState(false)

  const onPressImportant = ()=>{
    if(flag === true){
      setFlag(false)
    }else{
      setFlag(true)
    }
    //console.log("from func :" +flag)
  }
 
  const [emailType, setEmailType] = React.useState(1); //change the type of mailbox the user sees
  const [filterEmail, setFilterEmail] = React.useState(); //filter emails by text (sender, subject, or body keyword)
 
  var arrayEmails = [];
  const {jobDoc} = useContext(JobStatusContext); //Al infor from JobStatus page (meant for relevant job email info)

  // date filter variabals 
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [isDatePickerVisibleEnd, setDatePickerVisibilityEnd] = React.useState(false);
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  
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
 
  function showFilters() {
    if(userEmail) {
      switch(emailType) { //checks specific json headers for from and subject values
        case 1:
          var type = "Inbox"
          break;
        case 2:
          var type = "Application Inbox"
          break;
        case 3:
          var type = "Sent"
          break;
        default:
          var type = "Inbox"
          break;
      }
      return(
        <>
          <View style={styles.mailboxButtons}>
            <Button title={"Inbox"} onPress={() => setEmailType(1)}/>
            <Button title={"Application Inbox"} onPress={() => setEmailType(2)}/>
            <Button title={"Sent"} onPress={() => setEmailType(3)}/>
          </View>
          <TextInput value={filterEmail} onChangeText={(filterEmail) => setFilterEmail(filterEmail)} placeholder={'Filter by...'} style={styles.input} />
          {showDateFilters()}
          <Text style={{fontWeight:'bold', fontSize:16, padding:10}}>Mailbox: {type}</Text>
        </>
      );
    }
  }

  function showDateFilters() { //Date Picker function END
    //Start Date Picker
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleConfirm = date => {
        setStartDate(date);
        hideDatePicker();
    };
    //End Date Picker
    const showDatePickerEnd = () => {
        setDatePickerVisibilityEnd(true);
    };
    const hideDatePickerEnd = () => {
        setDatePickerVisibilityEnd(false);
    };
    const handleConfirmEnd = date => {
        setEndDate(date);
        hideDatePickerEnd();
    };

    return(
      <>
        <View style={styles.dateFilterContainer}>
          <View style={styles.dateInput}>
            <TouchableOpacity onPress={()=>{showDatePicker()}}>
              <TextInput mode="outlined" label="Resume" uppercase= "false" autoCapitalize='none' value={startDate.toLocaleDateString()} editable={false} pointerEvents="none" />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              date={startDate}
              display='default'
            />
          </View>
          <View style={styles.dateInput}>
            <TouchableOpacity onPress={()=>{showDatePickerEnd()}}>
              <TextInput mode="outlined" label="Resume" uppercase= "false" autoCapitalize='none' value={endDate.toLocaleDateString()} editable={false} pointerEvents="none" />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisibleEnd}
              mode="date"
              onConfirm={handleConfirmEnd}
              onCancel={hideDatePickerEnd}
              date={endDate}
              display='default'
            />
          </View>
        </View>
      </>
    )
  }
  //Date Picker function END

  function removeTime(date) { //used to remove time from date fields
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
  }
 
  function showUserEmails() {
    if(userInfo) {
      if(userEmail) {
        //loop through all email data and pick out important info
        for(var i = 0; i < userEmail.length; i++) {
          var checkInInbox = false;
          for(var j = 0; j < userEmail[i].labelIds.length; j++) { //checks to see if the mail item is in the inbox mailbox
            if(emailType == 1 || emailType == 2) {
              if(userEmail[i].labelIds[j] == "INBOX")
                checkInInbox = true;
            } else if(emailType == 3) {
              if(userEmail[i].labelIds[j] == "SENT")
                checkInInbox = true;
            }
          }
          if(checkInInbox) { //only post email if it is in the correct mailbox
            var tempFrom;
            var tempDate;
            var tempSubject;
            for(var j = 0; j < userEmail[i].payload.headers.length; j++) {
              switch(userEmail[i].payload.headers[j].name) { //checks specific json headers for from and subject values
                case "From":
                  tempFrom = userEmail[i].payload.headers[j].value;
                  break;
                case "Date":
                  tempDate = userEmail[i].payload.headers[j].value;
                  break;
                case "Subject":
                  tempSubject = userEmail[i].payload.headers[j].value;
                  break;
                default:
                  break;
              }
            }
            
 
            //create second check if statement depending on user preferences (dates and keyword searches) here
            const tempJSON = { //create temp json to add to entire array
              "id":i,
              "from":tempFrom,
              "date":tempDate,
              "subject":tempSubject,
              "body":userEmail[i].snippet.replace('&#39;','\'')
            }
            arrayEmails.push(tempJSON);
          }
        }
      }
      
      const getEmails = arrayEmails => {
        let content = [];
        for (let i = 0; i < arrayEmails.length; i++) {
          const item = arrayEmails[i];

          var tempDateStart = removeTime(startDate); //temp user select start date for comparing
          var tempDateEnd = removeTime(endDate); //temp user select end date for comparing
          var tempEmailDate = removeTime(new Date(item.date)); //temp date for comparing
         
          //Loop through all emails and set up each email message on the screen with all info
          if(filterEmail == undefined || filterEmail.length == 0 && tempDateEnd - tempDateStart == 0) { //filter by all emails
            if(emailType == 2 || emailType == 3) { //if this is the application or sent mailbox (auto parse important stuff) (important info comes from an application company and position)
              for(var j = 0; j < jobDoc.length; j++) {
                if(item.from.toLowerCase().includes(jobDoc[j].companyName.toLowerCase()) || item.subject.toLowerCase().includes(jobDoc[j].companyName.toLowerCase()) || item.body.toLowerCase().includes(jobDoc[j].companyName.toLowerCase())) //if the company name exists in the email
                  content.push(<>
                    <TouchableOpacity
                      onPress={()=>onPressImportant()}>{flag && console.log("after : " + flag)}{!flag ? <Text><AntDesign name="staro" size={24} color="black" /></Text> : <Text><AntDesign name="star" size={24} color="red" /></Text>}
                    </TouchableOpacity>
                    <Text key={item.id} style={styles.emailHeader}>Date:</Text><Text>{item.date}</Text><Text style={styles.emailHeader}>From:</Text><Text>{item.from}</Text><Text style={styles.emailHeader}>Subject:</Text><Text>{item.subject}</Text><Text style={styles.emailHeader}>Message:</Text><Text>{item.body}</Text><View style={styles.replyButtons}><Button title={"Reply"} onPress={() => {setSendTo(getReplyEmailAddress(item.from)); setModalVisible(true)}} /><Button title={"Forward"} onPress={() => {setSendSubject("FW: " + item.subject); setSendBody(item.body); setModalVisible(true)}} /></View><Text style={{paddingTop:10, paddingBottom:15}}>_____________________________________________</Text></>
                  );
                else if(item.from.toLowerCase().includes(jobDoc[j].position.toLowerCase()) || item.subject.toLowerCase().includes(jobDoc[j].position.toLowerCase()) || item.body.toLowerCase().includes(jobDoc[j].position.toLowerCase())) //if the position exists in the email
                  content.push(<>
                    <TouchableOpacity
                      onPress={()=>onPressImportant()}>{flag && console.log("after : " + flag)}{!flag ? <Text><AntDesign name="staro" size={24} color="black" /></Text> : <Text><AntDesign name="star" size={24} color="red" /></Text>}
                    </TouchableOpacity>
                    <Text key={item.id} style={styles.emailHeader}>Date:</Text><Text>{item.date}</Text><Text style={styles.emailHeader}>From:</Text><Text>{item.from}</Text><Text style={styles.emailHeader}>Subject:</Text><Text>{item.subject}</Text><Text style={styles.emailHeader}>Message:</Text><Text>{item.body}</Text><View style={styles.replyButtons}><Button title={"Reply"} onPress={() => {setSendTo(getReplyEmailAddress(item.from)); setModalVisible(true)}} /><Button title={"Forward"} onPress={() => {setSendSubject("FW: " + item.subject); setSendBody(item.body); setModalVisible(true)}} /></View><Text style={{paddingTop:10, paddingBottom:15}}>_____________________________________________</Text></>
                  );
              }
            } else { //inbox mailbox (all emails)
              content.push(<>
                <TouchableOpacity
                  onPress={()=>onPressImportant()}>{flag && console.log("after : " + flag)}{!flag ? <Text><AntDesign name="staro" size={24} color="black" /></Text> : <Text><AntDesign name="star" size={24} color="red" /></Text>}
                </TouchableOpacity>
                <Text key={item.id} style={styles.emailHeader}>Date:</Text><Text>{item.date}</Text><Text style={styles.emailHeader}>From:</Text><Text>{item.from}</Text><Text style={styles.emailHeader}>Subject:</Text><Text>{item.subject}</Text><Text style={styles.emailHeader}>Message:</Text><Text>{item.body}</Text><View style={styles.replyButtons}><Button title={"Reply"} onPress={() => {setSendTo(getReplyEmailAddress(item.from)); setModalVisible(true)}} /><Button title={"Forward"} onPress={() => {setSendSubject("FW: " + item.subject); setSendBody(item.body); setModalVisible(true)}} /></View><Text style={{paddingTop:10, paddingBottom:15}}>_____________________________________________</Text></>
              );
            }
          } else { //filter by keyword and/or date
            //loop through substring (no alpha caps letters) of from, subject, and body to search for keyword and use email if found
            var checkFilter = false;
            var checkDateFilter = false;
            var tempFilterEmail = filterEmail.toLowerCase();
            var tempCompareFilter = "";
            for(var j = 0; j < 3; j++) { //'filter by' from, subject, and body
              if(j == 0)
                tempCompareFilter = item.from.toLowerCase();
              else if(j == 1)
                tempCompareFilter = item.subject.toLowerCase();
              else if(j == 2)
                tempCompareFilter = item.body.toLowerCase();
 
              if(tempCompareFilter.includes(tempFilterEmail)) //if 'filter by' is included in email
                checkFilter = true;
            }

            if(tempDateStart - tempEmailDate <= 0 && tempDateEnd - tempEmailDate >= 0) //'filter by' start date to end date (within)
              checkDateFilter = true;
            else if(tempDateEnd - tempDateStart == 0) //'filter by' all dates (no date filtering)
              checkDateFilter = true;

            if(checkFilter && checkDateFilter) { //if passes the filter check
              if(emailType == 2 || emailType == 3) { //if this is the application or sent mailbox (auto parse important stuff) (important info comes from an application company and position)
                for(var j = 0; j < jobDoc.length; j++) {
                  if(item.from.toLowerCase().includes(jobDoc[j].companyName.toLowerCase()) || item.subject.toLowerCase().includes(jobDoc[j].companyName.toLowerCase()) || item.body.toLowerCase().includes(jobDoc[j].companyName.toLowerCase())) //if the company name exists in the email
                    content.push(<>
                      <TouchableOpacity
                        onPress={()=>onPressImportant()}>{flag && console.log("after : " + flag)}{!flag ? <Text><AntDesign name="staro" size={24} color="black" /></Text> : <Text><AntDesign name="star" size={24} color="red" /></Text>}
                      </TouchableOpacity>
                      <Text key={item.id} style={styles.emailHeader}>Date:</Text><Text>{item.date}</Text><Text style={styles.emailHeader}>From:</Text><Text>{item.from}</Text><Text style={styles.emailHeader}>Subject:</Text><Text>{item.subject}</Text><Text style={styles.emailHeader}>Message:</Text><Text>{item.body}</Text><View style={styles.replyButtons}><Button title={"Reply"} onPress={() => {setSendTo(getReplyEmailAddress(item.from)); setModalVisible(true)}} /><Button title={"Forward"} onPress={() => {setSendSubject("FW: " + item.subject); setSendBody(item.body); setModalVisible(true)}} /></View><Text style={{paddingTop:10, paddingBottom:15}}>_____________________________________________</Text></>
                    );
                  else if(item.from.toLowerCase().includes(jobDoc[j].position.toLowerCase()) || item.subject.toLowerCase().includes(jobDoc[j].position.toLowerCase()) || item.body.toLowerCase().includes(jobDoc[j].position.toLowerCase())) //if the position exists in the email
                    content.push(<>
                      <TouchableOpacity
                        onPress={()=>onPressImportant()}>{flag && console.log("after : " + flag)}{!flag ? <Text><AntDesign name="staro" size={24} color="black" /></Text> : <Text><AntDesign name="star" size={24} color="red" /></Text>}
                      </TouchableOpacity>
                      <Text key={item.id} style={styles.emailHeader}>Date:</Text><Text>{item.date}</Text><Text style={styles.emailHeader}>From:</Text><Text>{item.from}</Text><Text style={styles.emailHeader}>Subject:</Text><Text>{item.subject}</Text><Text style={styles.emailHeader}>Message:</Text><Text>{item.body}</Text><View style={styles.replyButtons}><Button title={"Reply"} onPress={() => {setSendTo(getReplyEmailAddress(item.from)); setModalVisible(true)}} /><Button title={"Forward"} onPress={() => {setSendSubject("FW: " + item.subject); setSendBody(item.body); setModalVisible(true)}} /></View><Text style={{paddingTop:10, paddingBottom:15}}>_____________________________________________</Text></>
                    );
                }
              } else { //inbox mailbox (all emails)
                content.push(<>
                  <TouchableOpacity
                    onPress={()=>onPressImportant()}>{flag && console.log("after : " + flag)}{!flag ? <Text><AntDesign name="staro" size={24} color="black" /></Text> : <Text><AntDesign name="star" size={24} color="red" /></Text>}
                  </TouchableOpacity>
                  <Text key={item.id} style={styles.emailHeader}>Date:</Text><Text>{item.date}</Text><Text style={styles.emailHeader}>From:</Text><Text>{item.from}</Text><Text style={styles.emailHeader}>Subject:</Text><Text>{item.subject}</Text><Text style={styles.emailHeader}>Message:</Text><Text>{item.body}</Text><View style={styles.replyButtons}><Button title={"Reply"} onPress={() => {setSendTo(getReplyEmailAddress(item.from)); setModalVisible(true)}} /><Button title={"Forward"} onPress={() => {setSendSubject("FW: " + item.subject); setSendBody(item.body); setModalVisible(true)}} /></View><Text style={{paddingTop:10, paddingBottom:15}}>_____________________________________________</Text></>
                );
              }
            }
          }
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
        {showFilters()}
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
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
  mailboxButtons: {
    paddingBottom: 10,
    width: 'auto',
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  replyButtons: {
    paddingTop: 20,
    width: 'auto',
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
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
  dateInput: {
    padding: 5,
    backgroundColor: '#e8e8e8',
    margin:10,
    width:160
  },
  dateFilterContainer: {
    flexDirection:'row',
    alignContent:'space-between',
    paddingBottom:20
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