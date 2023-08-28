import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Colors from '../../components/Colors';
import CustomButton from '../../components/Button';
import { ListItem } from '../../store/connect/listConnect';

interface FooterProps {
    item?: ListItem;
    onSubmit: (text: string) => void;
}

function Footer({ item, onSubmit }: FooterProps) {
    const isUpdate = !!item;
    const buttonText = isUpdate ? 'UPDATE' : 'ADD';
    const textRef = React.useRef<TextInput>(null);
    const [text, updateText] = React.useState<string>();

    const pressButton = () => {
        if (!text) {
            return;
        }

        onSubmit(text);
        updateText('');
        textRef.current?.blur();
    }

    React.useEffect(() => {
        if (item) {
            updateText(item.text);
            textRef.current?.focus();
        }
    }, [item]);

    return (
        <View style={styles.wrapper}>
            <TextInput ref={textRef} style={styles.input} placeholder={'Enter here'}
                value={text} onChangeText={updateText} />
            <CustomButton text={buttonText} press={pressButton} />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'white',
        padding: 10,
        paddingLeft: 20,
        borderRadius: 20,
        flexDirection: 'row',
    },
    input: {
        flex: 1,
        fontSize: 18,
        borderBottomColor: Colors.background,
    },
});

export default Footer;
