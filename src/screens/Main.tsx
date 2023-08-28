import React from 'react';
import { StyleSheet, Text, Platform, FlatList, View, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { RootStackScreenProps } from '../navigation/types';
import Colors from '../components/Colors';
import { ListProps, listConnect, ListItem } from '../store/connect/listConnect';
import useLoadStore from '../hooks/useLoadStore';
import Footer from './list/Footer';
import Item from './list/Item';

interface MainScreenProps extends RootStackScreenProps<'Main'>, ListProps {

}

function MainScreen({ addItem, removeItem, updateItem, items }: MainScreenProps) {
    const isLoaded = useLoadStore();
    const [selectedItem, setSelected] = React.useState<ListItem>();

    // if an item is selected, the submit button should update the item
    // and if there is no item selected, this action should add a new item to the list
    const submitItem = (text: string) => {
        if (!selectedItem) {
            addItem(text);
        }

        if (selectedItem) {
            updateItem(selectedItem.id, text);
            setSelected(undefined);
        }
    }

    // we use flat list to display the items due to performance reasons
    // until the list is loaded, we will show a spinner to let user know that is loading
    return (
        <View style={styles.wrapper}>
            <Text style={styles.title}>TODO:</Text>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
                <FlatList data={items}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    keyExtractor={(item) => item.id}
                    renderItem={(listInfo) => <Item item={listInfo.item} selectItem={setSelected} removeItem={removeItem} />}
                />
                {!isLoaded && <ActivityIndicator style={styles.loader} size={'large'} />}
                <Footer item={selectedItem} onSubmit={submitItem} />
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        padding: 10,
        backgroundColor: Colors.background,
    },
    loader: {
        flex: 1,
    },
    title: {
        marginVertical: 20,
        fontSize: 20,
        fontWeight: '800',
        color: Colors.primary,
    },
    container: {
        flex: 1,
    },
    separator: {
        height: 10,
    }
});

export default listConnect(MainScreen);
