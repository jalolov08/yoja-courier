import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#092325",
    padding: 24,
  },
  title: {
    marginTop: "20%",
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  subTitle: {
    fontSize: 13,
    color: "#D7D7D7",
    fontWeight: "400",
  },
  selectCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  select: {
    width: 120,
    height: 120,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ffffff66",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  selectText: {
    fontSize: 13,
    color: "#FFFFFF",
  },
  selected: {
    backgroundColor: "#FFFFFF",
  },
  selectedText: {
    color: "#000000",
  },
  btnCont: {
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
    marginVertical: 40,
  },
  btnText: {
    fontSize: 15,
    fontWeight: "400",
    color: "#091425",
  },
});
