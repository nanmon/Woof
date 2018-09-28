import React from 'react';
import { AsyncStorage } from "react-native";
import { Container, Content, Item, Label, Input, Button, Text, Header } from 'native-base';

class NameScene extends React.Component {

    state = {
        name: ''
    }

    onChangeName = name => this.setState({ name });

    setName = async () => {
        await AsyncStorage.setItem('name', this.state.name);
        this.props.navigation.pop();
    };

    render() {
        return (
            <Container>
                <Header>

                </Header>
                <Content>
                    <Item stackedLabel>
                        <Label>Set your name so your friends recognize your Woofs!</Label>
                        <Input value={this.state.name} onChangeText={this.onChangeName}/>
                    </Item>
                    <Button onPress={this.setName} disabled={!this.state.name}>
                        <Text>Set</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

export default NameScene;