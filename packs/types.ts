export interface Success {
  success: boolean;
  message?: string;
}

export interface SubmitContactFormProps {
  country?: string;
  serialNumber?: string;
  subject?: string;
  message?: string;
  personName?: string;
  personSurname?: string;
  personEmail?: string;
  personPhone?: string;
}
