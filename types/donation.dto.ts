export interface CreateDonationDto {
  name: string;
  description: string;
  quality: number;
  files: image[];
  categoryId: number;
  donorId: number; // from donor
}

export interface image {
  uri: string;
  name: string;
  type: string;
}
