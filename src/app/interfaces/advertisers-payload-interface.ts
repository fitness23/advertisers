export interface AdvertisersPayload {
    "@context": string
    "@id": string
    "@type": string
    "hydra:member": HydraMember[]
    "hydra:totalItems": number
    "hydra:view": HydraView
  }
  
  export interface HydraMember {
    "@id": string
    "@type": string
    id: number
    name: string
    orgurl: string
    firstName: string
    lastName: string
    email: string
    telephone: string
    updatedTs: string
    address: string
  }
  
  export interface HydraView {
    "@id": string
    "@type": string
  }
  