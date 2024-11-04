import { TextInput, StyleSheet } from "react-native";
import { Input } from "tamagui";

export default function InputField({ store = "", update, placeholder, secureTextEntry=false, id="" , props={}}) {
    return (
        <Input
            value={store}
            placeholder={placeholder}
            onChangeText={(text) => update(text)}
            secureTextEntry={secureTextEntry}
            id={id}
            {...props}
        />
    );
}