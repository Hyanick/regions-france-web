export interface User {
  id: number;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  placeOfBirth?: string;
  profilePicture?: string;
  address?: string;
  postalCode?: string;
  country?: string;
}
