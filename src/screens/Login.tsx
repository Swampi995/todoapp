import React from 'react';
import { StyleSheet, Text, Platform, Linking, View, ActivityIndicator } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { AppProps, appConnect } from '../store/connect/appConnect';
import { AuthScreenProps } from '../navigation/types';
import Colors from '../components/Colors';
import CustomButton from '../components/Button';
import useAuth from '../hooks/useAuth';

interface LoginScreenProps extends AuthScreenProps<'Login'>, AppProps {

}

function LoginScreen({ setAuthenticated }: LoginScreenProps) {
    // This is a custom hook, that gets the security level and if it is loaded
    const { isLoadingComplete, hasSecurity } = useAuth();

    // if there is a security method set, the user should login
    const pressButton = async () => {
        if (!hasSecurity) {
            goToSettings();
        } else {
            const auth = await LocalAuthentication.authenticateAsync({ promptMessage: 'Please authenticate' });
            setAuthenticated(auth.success);
        }
    }

    // this action should get user to device settings, depending on the platform
    const goToSettings = () => {
        if (Platform.OS === 'ios') {
            Linking.openURL('App-Prefs:root=TOUCHID_PASSCODE')
        } else {
            Linking.sendIntent("android.settings.SECURITY_SETTINGS")
        }
    }

    if (!isLoadingComplete) {
        return <ActivityIndicator style={styles.loader} size={'large'} />
    }

    // if there is a security method set, the user should see different labels
    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <Text style={styles.title}>{hasSecurity ? 'Authenticate to Proceed' : 'Set Authentication to Proceed'}</Text>
                <CustomButton text={hasSecurity ? 'Login' : 'Go to Settings'} press={pressButton} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    loader: {
        flex: 1,
    },
    wrapper: {
        flex: 1,
        padding: 10,
        justifyContent: 'flex-end',
        backgroundColor: Colors.background,
    },
    container: {
        gap: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
    },
});

export default appConnect(LoginScreen);
