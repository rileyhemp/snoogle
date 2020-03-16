import * as React from "react";
import { SafeAreaView, StyleSheet, StatusBar, Dimensions, View } from "react-native";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { TabView, SceneMap } from "react-native-tab-view";
import rootReducer from "./Redux/Reducers";
import Search from "./Containers/Search";
import Results from "./Containers/Results";
import Favorites from "./Containers/Favorites";
import theme from "./theme";
import moment from "moment";

const store = createStore(rootReducer);
const initialLayout = { width: Dimensions.get("window").width };
const App: () => React$Node = () => {
	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{ key: "first", title: "Search" },
		{ key: "second", title: "Favorites" }
	]);
	const MainPage = () => {
		return (
			<View style={styles.tab}>
				<Search />
				<Results />
			</View>
		);
	};
	const renderScene = SceneMap({
		first: MainPage,
		second: Favorites
	});
	return (
		<>
			<Provider store={store}>
				<StatusBar barStyle="dark-content" />
				<SafeAreaView style={styles.body}>
					<TabView navigationState={{ index, routes }} renderScene={renderScene} onIndexChange={setIndex} initialLayout={initialLayout} />
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
