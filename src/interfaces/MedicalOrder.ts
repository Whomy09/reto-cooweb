interface MedicalOrder {
  name: string,
  lastName: string,
  idNumber: string,
  eps: string,
  medicines: string[],
  doctorSignature: string,
  comentarios: string,
  createdAt?: string
}

export default MedicalOrder