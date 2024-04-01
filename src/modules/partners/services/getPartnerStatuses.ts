import { PartnerStatus } from '@/modules/partners';

export function getPartnerStatuses() {
  return [
    { value: PartnerStatus.Connected, label: 'Connected to you' },
    { value: PartnerStatus.Pending, label: 'Pending' },
    { value: PartnerStatus.NotConnected, label: 'Available to connect' },
  ];
}
