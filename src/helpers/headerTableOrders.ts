import type BaseColumn from "@/interfaces/BaseColumn";
import { ref } from 'vue'

const headerTableOrders = () => {
  const colums = ref<BaseColumn[]>([
    {
      field: 'name',
      label: 'name'
    },
    {
      field: 'lastName',
      label: 'lastName'
    },
    {
      field: 'idNumber',
      label: 'Identification'
    },
    {
      field: 'eps',
      label: 'EPS'
    },
    {
      field: 'comentarios',
      label: 'comment'
    },
    {
      field: 'doctorSignature',
      label: 'doctorSignature'
    },
    {
      field: 'medicines',
      label: 'Medicamentes'
    }
  ])
  return colums;
}

export default headerTableOrders;