import { Text } from "react-native"

export default props => <Text {...props} style={[{fontFamily: 'NotoSans'},{fontSize:15},props.style]}></Text>