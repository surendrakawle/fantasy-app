export interface MasterConfigDTO {
    key: string;
  
    websiteName?: string;
    websiteUrl?: string;
  
    support?: {
      helpEmail?: string;
      whatsappNumber?: string;
      contactNumber?: string;
    };
  
    depositSupport?: {
      whatsapp?: string;
      email?: string;
    };
  
    withdrawalSupport?: {
      whatsapp?: string;
      email?: string;
    };
  
    socialLinks?: {
      telegram?: string;
      instagram?: string;
      twitter?: string;
      youtube?: string;
    };
  
    features?: {
      enableDeposit: boolean;
      enableWithdrawal: boolean;
      enablePrediction: boolean;
      enableMatchContest: boolean;
      enableReferral: boolean;
    };
  
    maintenance?: {
      enabled: boolean;
      message?: {
        en?: string;
        hi?: string;
      };
    };
  }
  