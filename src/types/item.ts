export interface Item {
  id: string;
  type: 'lost' | 'found';
  name: string;
  description: string;
  location: string;
  date: string;
  contactName: string;
  contactPhone?: string;
  contactEmail?: string;
  category: string;
  createdAt: string;
}

export interface ItemFormData {
  type: 'lost' | 'found';
  name: string;
  description: string;
  location: string;
  date: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  category: string;
}