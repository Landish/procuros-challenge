export interface Partner {
  id: string; // should be number, but mock data is string
  name: string;
  logo: string;
  createdAt: string;
  category: PartnerCategory; // enum
  status: PartnerStatus; // enum
}

export enum PartnerStatus {
  NotConnected = 'not_connected',
  Connected = 'connected',
  Pending = 'pending',
}

export enum PartnerCategory {
  FMCG = 'fmcg',
  Retail = 'retail',
  DIY = 'diy',
  Pharma = 'pharma',
  Drugstore = 'drug_store',
  Manufacturing = 'manufacturing',
  Logistics = 'logistics',
  SupplierPortals = 'supplier_portals',
  QuickCommerce = 'quick_commerce',
  ECommerce = 'ecommerce',
}
