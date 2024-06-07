import { StyleSheet } from "react-native";
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 24,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginTop: 40,
  },
  name: {
    fontSize: 18,
    color: "#111111",
    marginTop: 8,
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#B0B0B0",
    marginVertical: 27,
  },

  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 14,
  },
  listText: {
    fontSize: 18,
    fontWeight: "400",
    color: "#1d3557ba",
    marginLeft: 16,
  },
});
