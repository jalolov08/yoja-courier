import { StyleSheet } from "react-native";
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  pointContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  pointText: {
    color: "#111111",
    fontSize: 14,
    fontWeight: "400",
    marginLeft: 16,
  },
  pointTitle: {
    fontSize: 22,
    color: "#111111",
    fontWeight: "500",
    marginVertical: 20,
  },
  label: {
    fontSize: 12,
    color: "#77869E",
  },
  text: {
    fontSize: 15,
    color: "#111111",
  },
  sellerCont: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  sellerImage: {
    width: 40,
    height: 40,
    resizeMode: "cover",
    borderRadius: 5,
  },
  sellerName: {
    fontSize: 18,
    color: "#0C341F",
    fontWeight: "500",
    marginLeft: 12,
  },
  productCont: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: "#545454",
    borderBottomWidth: 1,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  productName: {
    fontSize: 16,
    color: "#111111",
    fontWeight: "500",
    marginLeft: 12,
  },
  productQuantity: {
    fontSize: 14,
    color: "#545454",
    fontWeight: "bold",
    marginLeft: 12,
  },
  mapBtnCont: {
    paddingVertical: 14,
    paddingHorizontal: 52,
    backgroundColor: "#F0F5F5",
    position: "absolute",
    bottom: 20,
    left: '15%',
    borderRadius: 8,
  },
  mapBtnText:{
    fontSize:13,
    color:'#006970'
  },
  takeBtnCont: {
    paddingVertical: 14,
    paddingHorizontal: 52,
    backgroundColor: "#006970",
    position: "absolute",
    bottom: 20,
    right: '15%',
    borderRadius: 8,
  },
  takeBtnText:{
    fontSize:13,
    color:'#FFFFFF'
  }
});
