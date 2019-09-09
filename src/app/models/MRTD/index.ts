export default interface MRTD {
  _id?: string;
  type: string;
  secondaryID: string;
  primaryID: string;
  documentType: string;
  documentNumber: number;
  sex?: string;
  nationality?: string;
  dateOfBirth?: Date;
  dateOfExpiry?: Date;
  rawMRZString: string;
  fullDocumentImageBase64?: string;
}