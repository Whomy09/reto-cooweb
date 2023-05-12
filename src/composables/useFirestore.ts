import { DB } from '@/firebase/firebase'
import type Medicine from '@/interfaces/Medicine'

export const useFirestore = () => {
  const getReference = (type: 'collection' | 'document', path: string) => {
    if (type === 'collection') {
      return DB.collection(path)
    } else {
      return DB.doc(path)
    }
  }

  const getCollection = async (path: string) => {
    const reference = getReference('collection', path)

    const querySnapshot = await reference.get()

    const records: any[] = []

    querySnapshot.forEach((doc: any) => {
      const props = doc.data()

      records.push(props)
    })

    return records
  }

  const addDocument = async (path: string, document: Record<string, any>) => {
    const reference = getReference('collection', path)
    return await reference.add(document)
  }

  const deleteDocument = async (path: string, type: 'Medicine' | 'MedicalOrders', name: string) => {
    const reference = getReference('collection', path)

    if (type === 'Medicine') {
      const querySnapshot = await reference.where('name', '==', name).get()

      querySnapshot.forEach(async (doc: any) => {
        await reference.doc(doc.id).delete()
      })
    } else if (type === 'MedicalOrders') {
      const querySnapshot = await reference.where('idNumber', '==', name).get()

      querySnapshot.forEach(async (doc: any) => {
        await reference.doc(doc.id).delete()
      })
    }
  }

  const getIdDocument = async (path: string, type: 'Medicine' | 'MedicalOrders', name: string) => {
    const reference = getReference('collection', path)

    if (type === 'Medicine') {
      const querySnapshot = await reference.where('name', '==', name).get()

      if (!querySnapshot.empty) {
        const docSnapshot = querySnapshot.docs[0]

        return docSnapshot.id
      }
    } else {
      const querySnapshot = await reference.where('idNumber', '==', name).get()

      if (!querySnapshot.empty) {
        const docSnapshot = querySnapshot.docs[0]

        return docSnapshot.id
      }
    }
  }

  const getData = async (path: string, type: 'Medicine' | 'MedicalOrders', name: string) => {
    const reference = getReference('collection', path)

    if (type === 'Medicine') {
      const querySnapshot = await reference.where('name', '==', name).get()

      if (!querySnapshot.empty) {
        const docSnapshot = querySnapshot.docs[0]

        return docSnapshot.data()
      }
    } else {
      const querySnapshot = await reference.where('idNumber', '==', name).get()

      if (!querySnapshot.empty) {
        const docSnapshot = querySnapshot.docs[0]

        return docSnapshot.data()
      }
    }
  }

  const updateData = async (path: string, type: 'Medicine' | 'MedicalOrders', id: string, newData: any) => {
    const reference = getReference('collection', path)
    await reference.doc(id).update(newData)
  }

  return {
    getReference,
    getCollection,
    addDocument,
    deleteDocument,
    getIdDocument,
    getData,
    updateData
  }
}
