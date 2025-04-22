import { Charity, Donor } from "@/types/allTypes";

export type Auth = {
  id: number;
  email: string;
  password: string;
  role: string;
  //   charity: Charity;
  //   donor: Donor;
  expoPushToken: string;
  accessToken: string;
};
