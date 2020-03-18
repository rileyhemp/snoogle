import * as React from "react";
import { SafeAreaView, StyleSheet, StatusBar, Dimensions, View } from "react-native";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./Redux/Reducers";
import Search from "./Containers/Search";
import Results from "./Containers/Results";
import theme from "./theme";
import moment from "moment";

const store = createStore(rootReducer);
const initialLayout = { width: Dimensions.get("window").width };
const App: () => React$Node = () => {
	return (
		<>
			<Provider store={store}>
				<StatusBar barStyle="dark-content" />
				<SafeAreaView style={styles.body}>
					<Search />
					<Results />
				</SafeAreaView>
			</Provider>
		</>
	);
};

const styles = StyleSheet.create({
	body: {
		backgroundColor: theme.background,
		height: "100%"
	},
	tab: {
		flex: 1
	}
});

export default App;
