import React from 'react';
import { AsyncStorage } from "react-native";
import { Permissions, Notifications } from "expo";
import { Container, Input, Button, Text, Content, Item, Header, ListItem, Body, Toast } from 'native-base';

class MainScene extends React.Component {

    state = {
        myToken: null,
        error: null,
        input: '',
        friends: []
    };

    async prepare() {
        const myName = await AsyncStorage.getItem('name');
        if (!myName) {
            return this.props.navigation.push('Name');
        }
        this.setState({ myName });

        const fstr = await AsyncStorage.getItem('friends');
        const friends = fstr != null ? JSON.parse(fstr) : [];
        this.setState({ friends });

        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        if (status !== 'granted') {
            return this.setState({ error: "Grant notification permissions to receive Woofs"});
        }
        const expoToken = await Notifications.getExpoPushTokenAsync();
        const match = expoToken.match(/ExponentPushToken\[([0-9A-Za-z]*)\]/);
        const myToken = match[1];

        this.setState({ myToken });
    }

    componentDidMount() {
        this.prepare();
    }

    onChangeInput = input => this.setState({ input });

    woof = async code => {
        let {  myName } = this.state;
        if (!myName) {
            myName = await AsyncStorage.getItem('name');
            this.setState({ myName });
        }
        const result = await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                to: `ExponentPushToken[${code}]`,
                title: `Woof from ${myName}`
            })
        });

        const json = await result.json();
        console.log(json);
        if (json.data.status === 'ok') {
            const alreadyFriends = this.state.friends.indexOf(code) !== -1;
            if (alreadyFriends) return;
            const friends = [code, ...this.state.friends];
            this.setState({ friends, input: ''});
            return AsyncStorage.setItem('friends', JSON.stringify(friends));
        } else {
            Toast.show({ text: 'Friend not found :c' });
        }
    }
    // BC0RrkG8tYVEvc0XrRm22f

    render() {
        return (
            <Container>
                <Header>

                </Header>
                <Content>
                    <Text>{this.state.myToken || this.state.error}</Text>
                    <Item>
                        <Input 
                            placeholder="Woof someone!" 
                            value={this.state.input}
                            onChangeText={this.onChangeInput}
                        />
                    </Item>
                    <Button disabled={!this.state.input} onPress={() => this.woof(this.state.input)}>
                        <Text>Woof</Text>
                    </Button>
                    <Text>Friends: </Text>
                    {this.state.friends.map(friend =>
                        <ListItem key={friend} onPress={() => this.woof(friend)}>
                            <Body>
                                <Text>{friend}</Text>
                            </Body>
                        </ListItem>    
                    )}
                </Content>
            </Container>
        );
    }
}

export default MainScene;