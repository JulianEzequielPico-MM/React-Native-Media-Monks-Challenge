import { Text } from "react-native"

export default props => <Text {...props} style={[{ fontFamily: 'Roboto' }, { fontSize: 15 }, props.style]}></Text>