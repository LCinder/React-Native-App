import React from 'react';
import {Pressable, Text} from 'react-native';

export default function BasicElement({item, onPress}) {
    return (
        <Pressable
            style={{
                flex: 1 / 3,
                margin: 5,
                backgroundColor: '#ddd',
                height: 100,
                alignItems: 'center',
                justifyContent: 'center',
            }}
            onPress={() => onPress(item)}
        >
            <Text>{item.name}</Text>
        </Pressable>
    );
}

