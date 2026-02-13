import partnerData from "@/data/partner.json";

export interface PartnerConfig {
  name: string;
  nickname: string;
  birthday: string;
  message: string;
  signature: string;
}

// ✅ explicit typing = no TS error
export const partnerConfig: PartnerConfig = {
  name: partnerData.name,
  nickname: partnerData.nickname,
  birthday: partnerData.birthday,
  message: partnerData.message,
  signature: partnerData.signature,
};
