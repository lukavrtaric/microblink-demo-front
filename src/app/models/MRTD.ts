export default class MRTD {
  _id?: String;
  type: String;
  secondaryID: String;
  primaryID: String;
  documentType: String;
  documentNumber: Number;
  sex?: String;
  nationality?: String;
  dateOfBirth?: Date;
  dateOfExpiry?: Date;
  rawMRZString: String;
  fullDocumentImageBase64?: String;
}