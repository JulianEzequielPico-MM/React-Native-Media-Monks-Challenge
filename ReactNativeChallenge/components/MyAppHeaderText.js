
import { Text } from "react-native"
import MyAppText from "./MyAppText";

export default props => <MyAppText> <Text style={{ fontSize: 20 }}>{props.children}</Text></MyAppText>

