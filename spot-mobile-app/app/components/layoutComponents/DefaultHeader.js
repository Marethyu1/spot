import {Body, Header, Left, Right, Title} from "native-base";
import React from "react";

const DefaultHeader = () => {
    return (
        <Header>
            <Left/>
            <Body>
            <Title>Spot</Title>
            </Body>
            <Right />
        </Header>
    )
}

export default DefaultHeader
