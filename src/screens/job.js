// React
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

function JobScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Jobs Screen</Text>
      <Button
        title="Go to Home Screen"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

export { JobScreen };