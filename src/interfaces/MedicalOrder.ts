import type Medicine from "./Medicine"

interface MedicalOrder {
  name: string,
  lastName: string,
  idNumber: string,
  eps: string,
  medicines: Medicine[],
  doctorSignature: string,
  createdAt?: string
}

export default MedicalOrder;