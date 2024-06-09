import { StyleSheet } from "react-native";
export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
  },
  error: {
    fontSize: 20,
    color: "#111111",
    textAlign: "center",
    marginTop: 100,
  },
  btnCont: {
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#091425",
    borderRadius: 2,
  },
  btnText: {
    fontSize: 15,
    fontWeight: "400",
    color: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    marginVertical: 12,
    fontWeight: "500",
    color: "#111111",
  },
  orderCont: {
    marginVertical: 15,
    height: 120,
    backgroundColor: "#0866340f",
    borderRadius: 8,
    padding: 8,
  },
  location: {
    fontSize: 16,
    color: "#111111",
    fontWeight: "500",
    marginLeft: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: "400",
    color: "#0000000",
    marginLeft: 8,
  },
  price: {
    fontSize: 24,
    color: "#000",
    fontWeight: "500",
    marginTop: 12,
    marginLeft: "auto",
  },
  navigate: {
    width: 30,
    height: 30,
    backgroundColor: "#006970",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  },
  getOrder: {
    height: 30,
    paddingHorizontal: 12,
    backgroundColor: "#006970",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    marginLeft: 10,
  },
  getText: {
    color: "#fff",
  },
});
