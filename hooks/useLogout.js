import AsyncStorage from '@react-native-async-storage/async-storage';

const useLogout = () => {
    const logout = async () => {
        try {
            await AsyncStorage.removeItem('data');
            await AsyncStorage.removeItem('haveSeen');
        }
        catch (error) {
            console.log("Logout Error", error);
        }
    };

    return logout;
}

export default useLogout