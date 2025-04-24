export interface CreateDonationDto {
  name: string;
  description: string;
  quality: number;
  files: string[];
  categoryId: number;
  donorId: number; // from donor
}
