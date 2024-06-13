import { StyleSheet } from "react-native";
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  orderCont: {
    height: 130,
    backgroundColor: "#F0F5F5",
    borderRadius: 8,
    padding: 8,
    marginVertical: 12,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111111",
  },
  location: {
    fontSize: 14,
    color: "#111111",
    marginLeft: 8,
  },
  iconTextCont: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  empty: {
    fontSize: 15,
    color: "#111111",
    textAlign: "center",
    marginVertical: 20,
  },
});
