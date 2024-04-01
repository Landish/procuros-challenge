import { PartnerCategory } from '@/modules/partners';

export function getPartnerCategories() {
  return [
    { value: PartnerCategory.FMCG, label: 'FMCG' },
    { value: PartnerCategory.Retail, label: 'Retail' },
    { value: PartnerCategory.DIY, label: 'DIY' },
    { value: PartnerCategory.Pharma, label: 'Pharma' },
    { value: PartnerCategory.Drugstore, label: 'Drugstore' },
    { value: PartnerCategory.Manufacturing, label: 'Manufacturing' },
    { value: PartnerCategory.Logistics, label: 'Logistics' },
    { value: PartnerCategory.SupplierPortals, label: 'Supplier Portals' },
    { value: PartnerCategory.QuickCommerce, label: 'Quick Commerce' },
    { value: PartnerCategory.ECommerce, label: 'E-commerce' },
  ];
}
