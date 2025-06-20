import React, {useState} from 'react';
import {Button, FlatList, Modal, Text, View} from 'react-native';

import BasicElement from "@/app/BasicElement";

export default function ContainerList({data}) {

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handlePress = (item) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    return (
        <View style={{flex: 1}}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                numColumns={3}
                renderItem={({item}) => <BasicElement item={item} onPress={handlePress}/>}
            />

            <Modal
                visible={modalVisible}
                transparent
                animationType={"fade"}
                onRequestClose={() => setModalVisible(false)}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                    }}
                >
                    <View
                        style={{
                            backgroundColor: 'white',
                            padding: 20,
                            borderRadius: 10,
                            minWidth: '70%',
                        }}
                    >
                        <Text style={{marginBottom: 20}}>
                            {selectedItem ? selectedItem.name : ''}
                        </Text>
                        <Button title="Close" onPress={() => setModalVisible(false)}/>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
