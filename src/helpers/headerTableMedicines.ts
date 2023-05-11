import type BaseColumn from "@/interfaces/BaseColumn"
import { ref } from 'vue'

const headerTableMedicines = () => {
  const colums = ref<BaseColumn[]>([
    {
      field: 'name',
      label: 'Nombre'
    },
    {
      field: 'qty',
      label: 'Cantidad'
    },
    {
      field: 'provider',
      label: 'Provedor'
    },
    {
      field: 'doctorSignature',
      label: 'Firma'
    },
    {
      field: 'description',
      label: 'Descripcion'
    }
  ])
  return colums
}

export default headerTableMedicines;