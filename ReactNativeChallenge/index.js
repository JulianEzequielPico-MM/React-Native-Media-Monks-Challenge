import { registerRootComponent } from "expo";
import { Text } from "react-native"
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import { store, persistor } from './Redux/01-store';


Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

import App from './App';



const index = () => {


    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App></App>
            </PersistGate>
        </Provider>
    )
}




// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(index);
