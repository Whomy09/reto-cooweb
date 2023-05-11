import type MedicalOrder from "@/interfaces/MedicalOrder";

const validationOrdersForm = (order: MedicalOrder) => {
  if (!order.name) return false;
  if (!order.lastName) return false;
  if (!order.idNumber) return false;
  if (!order.eps) return false;
  if (order.medicines.length === 0) return false;
  if (!order.doctorSignature) return false;
  if (!order.comentarios) return false;
  return true;
}

export default validationOrdersForm;