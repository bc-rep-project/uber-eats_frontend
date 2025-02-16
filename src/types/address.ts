export interface Address {
  id: string;
  label: string; // e.g., "Home", "Work", "Other"
  street: string;
  unit?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  instructions?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface DeliveryLocation extends Address {
  deliveryNotes?: string;
  gateCode?: string;
  isAccessible: boolean;
  contactPreference: 'call' | 'text' | 'none';
}