import { StyleSheet } from "react-native";
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#092325",
    padding: 24,
  },
  title: {
    marginTop: "50%",
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  subTitle: {
    fontSize: 13,
    color: "#D7D7D7",
    fontWeight: "400",
  },
  cell: {
    width: "18%",
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ffffff99",
    borderRadius: 5,
  },
  cellText: {
    fontSize: 45,
    color: "#FFFFFF",
    fontWeight: "400",
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
