import { useToast } from '@/hooks/useToast';

const { showToast } = useToast();

showToast(`Incident escalated in ${selectedZone}`);
