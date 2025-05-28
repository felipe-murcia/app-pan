

import { StyleSheet } from "react-native";
import { borderColorTable } from "../constant/color";

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  flexCenter:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
},
borderBottom: {
    borderBottomWidth: 1, borderBottomColor: '#eee', marginVertical:10
},
labelCard:{ fontFamily: 'PoppinsLight', fontSize: 14 },
cell:{
  flex: 1, borderWidth: 1, borderColor: borderColorTable, alignContent: "center", justifyContent: "center",  alignItems: "center", 
  padding:2
}
});

export default globalStyles;
