import React from 'react';
import { Asset, AppLoading, Font } from 'expo';
import {Root, StyleProvider} from "native-base";
// import Sentry from 'sentry-expo';

import RootNavigator from "./root.navigator";
import getTheme from "./native-base-theme/components";
import commonColor from "./native-base-theme/variables/commonColor";

// Sentry.config('https://21252bec33e848c09b6ac17ab6fbdc4a@sentry.io/1272604').install();

export default class App extends React.Component {
    state = {
        ready: false,
    };
    cacheResourcesAsync = async () => {
        const images = [
        ];
        const fonts = Font.loadAsync({
            Barlow: require('./assets/BarlowSemiCondensed-Regular.ttf'),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
        });

        // const remove = AsyncStorage.removeItem('session')

        let promises = images.map((image) => {
            return Asset.fromModule(image).downloadAsync();
        });
        promises = [fonts, ...promises];
        return Promise.all(promises)
    };

    render() {
        if (!this.state.ready) {
            return (
                <AppLoading
                    startAsync={this.cacheResourcesAsync}
                    onFinish={() => this.setState({ready: true})}
                    onError={console.warn}
                />
            );
        }
        return (
            <Root>
                <StyleProvider style={getTheme(commonColor)}>
                    <RootNavigator/>
                </StyleProvider>
            </Root>
        );
    }
}
