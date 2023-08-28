import { useEffect, useState } from 'react';
import { AppState } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export default function useAuth() {
    const [isLoadingComplete, setLoadingComplete] = useState(false);
    const [securityLevel, setSecurityLevel] = useState<LocalAuthentication.SecurityLevel>(0);

    useEffect(() => {
        async function firstLoad() {
            await getEnrolled()
            setLoadingComplete(true);
        }

        firstLoad();

        // Added a listener for the case when the user leaves the app to set the security code, and gets back to the app for login
        const listener = AppState.addEventListener('change', async (nextState) => {
            if (nextState === 'active') {
                await getEnrolled();
            }
        });

        return () => {
            listener.remove();
        };
    }, []);

    const getEnrolled = async () => {
        const securityLevel = await LocalAuthentication.getEnrolledLevelAsync();
        setSecurityLevel(securityLevel)
    }

    return { isLoadingComplete, hasSecurity: securityLevel !== LocalAuthentication.SecurityLevel.NONE };
}
