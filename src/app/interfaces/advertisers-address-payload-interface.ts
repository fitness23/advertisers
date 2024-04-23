export interface AdvertisersAddressPayload {
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
  address: string
  city: string
  postcode: string
  updatedTs: string
}

export interface HydraView {
  "@id": string
  "@type": string
}
