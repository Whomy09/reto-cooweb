import type Medicine from "@/interfaces/Medicine"

const validationMedicineForm = (medicine: Medicine) => {
  if (!medicine.name) return false;
  if (!medicine.description) return false;
  if (medicine.qty <= 0 || !medicine.qty) return false;
  if (!medicine.provider) return false;
  if (!medicine.doctorSignature) return false;
  return true;
}

export default validationMedicineForm;