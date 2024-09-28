import { TextInput, StyleSheet } from "react-native";
import { Input } from "tamagui";

export default function InputField({ store = "", update, placeholder, secureTextEntry=false, id="" }) {
    return (
        <Input
            value={store}
            placeholder={placeholder}
            onChangeText={(text) => update(text)}
            secureTextEntry={secureTextEntry}
            id={id}
            borderColor={"$black5"}
        />
    );
}