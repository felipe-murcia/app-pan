import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Label from "../Label/Label";
import { colorPrimaryDark } from "../../constant/color";

type Option = {
  value: string;
  label: string;
};

type RadioButtonProps = {
  name: string;
  options: Option[];
  selectedKey: string;
  onChange: (key: string) => void;
};

const RadioButton: React.FC<RadioButtonProps> = ({
  name,
  options,
  selectedKey,
  onChange,
}) => (
  <View>
    <Label label="Tipo de unidad" />
    {options.map((option) => (
      <TouchableOpacity
        key={option.value}
        onPress={() => onChange(option.value)}
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
      >
        <View
          style={{
            height: 22,
            width: 22,
            borderRadius: 20,
            borderWidth: 2,
            borderColor: colorPrimaryDark,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 8,
          }}
        >
          {selectedKey === option.value && (
            <View
              style={{
                height: 11,
                width: 11,
                borderRadius: 5,
                backgroundColor: colorPrimaryDark,
              }}
            />
          )}
        </View>
        <Text style={styles.label}>
          {option.label} ({option.value}.)
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    marginLeft: 5,
    color: "#333",
    fontFamily: "PoppinsLight",
  },
  input: {
    //height: 40,
    borderColor: "#ebebeb",
    borderWidth: 1,
    borderRadius: 50,
    fontSize: 14,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    fontFamily: "PoppinsLight",
    shadowOpacity: 0.1,
  },
});

export default RadioButton;
