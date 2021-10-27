// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import HomeScreen from './screens/HomeScreen';
import LogoTitle from './components/LogoTitle';
import colors from './GlobalStyles';
import ChildDashboard from './screens/ChildDashboard';
// import UserProvider from './providers/UserProvider';
// import ParentLogin from './screens/ParentLogin';
import ChildLogin from './screens/ChildLogin';

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
	App: {
		flex: 1,
		backgroundColor: colors.primary,
	},
});

const App = () => {
	return (
		// <UserProvider>
		<NativeBaseProvider>
			<View style={styles.App}>
				<NavigationContainer>
					<Stack.Navigator
						screenOptions={{
							headerTitle: (props) => <LogoTitle {...props} />,
							headerTintColor: colors.white,
							headerStyle: {
								backgroundColor: colors.primary,
								paddingVertical: 40,
							},
						}}
					>
						<Stack.Screen
							options={{ headerShown: false }}
							name="Login"
							component={HomeScreen}
						/>
						<Stack.Screen
							options={{ headerShown: false }}
							name="ChildDashboard"
							component={ChildDashboard}
						/>
						{/* <Stack.Screen
							name="ParentLogin"
							component={ParentLogin}
						/> */}
						<Stack.Screen
							name="ChildLogin"
							component={ChildLogin}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</View>
		</NativeBaseProvider>
		// </UserProvider>
	);
};

export default App;
