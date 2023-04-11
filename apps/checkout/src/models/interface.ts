import { Product } from '@checkout-stripe/interface';
import type { ChangeEvent, FormEvent } from 'react';
import Stripe from 'stripe';

export type OnSubmit = (evt: FormEvent<HTMLFormElement>) => void;

export type OnInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => void;

export type StateProduct = {
  product: Product | null;
  setProduct: React.Dispatch<React.SetStateAction<Product | null>>;
};

export type SubscriptionState = {
  status: false | string;
  customer: string;
};

export type UserData = {
  name: string;
  email: string;
};

export type SubscriptionType = 'freeTrial' | 'noTrial';
