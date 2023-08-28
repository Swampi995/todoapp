import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../components/Colors';
import { ListItem } from '../../store/connect/listConnect';

interface ItemProps {
    item: ListItem;
    removeItem: (id: string) => void;
    selectItem: (item: ListItem) => void;
}

function Item({ item, removeItem, selectItem }: ItemProps) {
    const remove = () => {
        removeItem(item.id);
    }

    const press = () => {
        selectItem(item);
    }

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity style={styles.textContainer} onPress={press}>
                <View style={styles.bullet} />
                <Text>{item?.text}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={remove}>
                <Text>REMOVE</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'white',
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: 15,
    },
    button: {
        padding: 15,
    },
    bullet: {
        height: 20,
        width: 20,
        borderRadius: 20,
        backgroundColor: Colors.primary,
    }
});

export default Item;
