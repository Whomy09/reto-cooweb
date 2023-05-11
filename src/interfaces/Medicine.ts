interface Medicine {
  name: string,
  description: string,
  qty: number,
  provider: string,
  doctorSignature: string,
  createdAt?: string
}

export default Medicine;