

import { StyleSheet } from "react-native";
import { flexCenter } from "./flexCenterStyle";

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
labelCard:{ fontFamily: 'PoppinsLight', fontSize: 14 }
});

export default globalStyles;
