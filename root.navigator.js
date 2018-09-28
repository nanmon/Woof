import {createStackNavigator } from "react-navigation";
import Name from "./scenes/name/NameScene";
import Main from './scenes/main/MainScene';

// const LoggedOutStack = createStackNavigator({
//     Login: LoginScene,
//     // Signup: SignupScene
// }, {
//     initialRouteName: 'Login',
//     headerMode: 'none'
// });

export default createStackNavigator({
    //Splash:SplashScene,
    Main,
    Name
}, {
    initialRouteName: 'Main',
    headerMode: 'none'
});