// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './screens/HomeScreen';
import LogoTitle from './components/LogoTitle';
import colors from './GlobalStyles';
import ChildDashboard from './screens/ChildDashboard';
// import UserProvider from './providers/UserProvider';
// import ParentLogin from './screens/ParentLogin';
import ChildLogin from './screens/ChildLogin';
import ChildProvider from './providers/ChildProvider';

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
	App: {
		flex: 1,
		backgroundColor: colors.primary,
	},
	logoutButton: {
		color: colors['primary-light'],
		fontSize: 18,
	},
});

const App = () => {
	const logout = (nav) => {
		console.log('..Log user out please');
		AsyncStorage.removeItem('ito_child');
		nav.navigate('Login');
	};
	return (
		// <UserProvider>
		<NativeBaseProvider>
			<View style={styles.App}>
				<NavigationContainer>
					<ChildProvider>
						<Stack.Navigator
							screenOptions={{
								headerTitle: (props) => (
									<LogoTitle {...props} />
								),
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
								options={({ navigation }) => ({
									headerLeft: () => <View />,
									headerRight: () => (
										<TouchableOpacity
											onPress={() => {
												logout(navigation);
											}}
										>
											<Text style={styles.logoutButton}>
												Logout
											</Text>
										</TouchableOpacity>
									),
								})}
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
					</ChildProvider>
				</NavigationContainer>
			</View>
		</NativeBaseProvider>
		// </UserProvider>
	);
};

export default App;
