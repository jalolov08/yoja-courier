import { StyleSheet } from "react-native";
export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  instructions: {
    fontSize: 12,
    color: "#4F4F4F",
    marginVertical: 20,
  },
  btnCont: {
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#091425",
    borderRadius: 2,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#091425",
  },
  btnText: {
    fontSize: 15,
    fontWeight: "400",
    color: "#FFFFFF",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    borderWidth: 1,
    alignSelf: "center",
    marginBottom: 10,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  modalItemFirst: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    color: "#333333",
  },
  modalCancel: {
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: "#092325",
  },
  modalCancelText: {
    fontSize: 16,
    textAlign: "center",
    color: "#FFFFFF",
  },
});
