import { useStoredValue } from '@/shared/hooks/useStoredValue';

export const SEX_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

const profileSeed = {
  fullName: 'Alex Morgan',
  birthDate: '1988-04-12',
  sex: 'male',
  bloodType: 'A+',
  insuranceNumber: 'EHIC 80-4471-2290-18',
  heightCm: 178,
  country: 'Portugal',
};

export function useProfile() {
  const { value, isLoading, save } = useStoredValue('profile', profileSeed);
  return { profile: value, isLoading, saveProfile: save };
}
