import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import AccountNavigator from "./AccountNavigator";
import AppNavigator from "./AppNavigator";


export const Navigation = () => {
    const { isAuthenticated } = useContext(AuthContext);
  
    return (
      <NavigationContainer>
        {isAuthenticated ? <AppNavigator /> : <AccountNavigator />}
      </NavigationContainer>
    );
  };