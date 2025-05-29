import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import globalStyles from "../../../../styles/globalStyles";

interface ItemProps {
  label: string;
  value: string;
  valueBold?: boolean;
  labelBold?: boolean;
}

const ItemTable: React.FC<ItemProps> = ({ label, value, valueBold = false, labelBold = false }) => {

  return (
    <View style={{ width: "100%", flexDirection: "row" }}>
              <View style={globalStyles.cell}>
                <Text
                  style={[styles.textValue, { fontFamily: labelBold?"PoppinsMedium": "PoppinsLight" }]}
                >
                  {label}
                </Text>
              </View>
              <View style={globalStyles.cell}>
                <Text
                  style={[styles.textValue, { fontFamily: valueBold?"PoppinsMedium": "PoppinsLight" }]}
                >
                  {value }
                </Text>
              </View>

        </View>
  );
};

export default ItemTable;


const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    maxHeight: "70%",
  },
  title: {
    fontSize: 20,
    fontFamily: "PoppinsMedium",
  },
  textValue: {
    fontSize: 16,
    fontFamily: "PoppinsLight",
    color: "#333",
    marginBottom: 2,
  },
});
