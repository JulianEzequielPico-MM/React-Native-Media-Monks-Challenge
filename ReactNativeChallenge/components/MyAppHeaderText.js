
import { Text } from "react-native"
import MyAppText from "./MyAppText";

export default props => <MyAppText style={[{ fontSize: 20 },props.style]}> <Text {...props} ></Text></MyAppText>

