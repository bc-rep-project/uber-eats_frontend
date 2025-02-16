export interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'debit_card' | 'paypal' | 'gift_card';
  isDefault: boolean;
  lastUsed?: Date;
}

export interface CreditCard extends PaymentMethod {
  type: 'credit_card';
  brand: string;
  lastFourDigits: string;
  expiryMonth: string;
  expiryYear: string;
  cardholderName: string;
  billingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export interface GiftCard extends PaymentMethod {
  type: 'gift_card';
  code: string;
  balance: number;
  expiryDate?: Date;
  isRedeemable: boolean;
}

export interface PaymentTransaction {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethodId: string;
  orderId?: string;
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, any>;
} 