export type CandidateContact = {
  email: string;
  phone: string;
};

export type CandidateReferredBy = {
  profilePicture: string;
  name: string;
  id: string;
};

export type JobApplicationStatus =
  | "SHORTLISTED"
  | "REJECTED"
  | "APPLIED"
  | "EXTERNAL";

export type JobApplicationProgressUpdatedBy = CandidateReferredBy;

export type CandidateJobApplicationProgress = {
  status: JobApplicationStatus;
};

export type Candidate = {
  id: string;
  profilePicture: string;
  appliedOn: Date;
  experience: string;
  name: string;
  bio: string;
  isVerified: boolean;
  isHoldingOffer: boolean;
  noticePeriod: number;
  contact: CandidateContact;
  referredBy: CandidateReferredBy;
  resume: string;
  jobApplicationProgress: {
    status: JobApplicationStatus;
    updatedBy: JobApplicationProgressUpdatedBy;
    updatedOn: Date;
  };
};

type CommonCardProps = {
  appliedOn: Candidate["appliedOn"];
  profilePicture: Candidate["profilePicture"];
  name: Candidate["name"];
  isVerified: Candidate["isVerified"];
  bio: Candidate["bio"];
  jobApplicationProgress: Candidate["jobApplicationProgress"];
};

export type RejectedCardProps = CommonCardProps;

export type AppliedCardProps = CommonCardProps & {
  experience: Candidate["experience"];
  isHoldingOffer: Candidate["isHoldingOffer"];
  noticePeriod: Candidate["noticePeriod"];
  contact: Candidate["contact"];
};

export type ShortlistedCardProps = CommonCardProps &
  Pick<AppliedCardProps, "isHoldingOffer" | "experience" | "noticePeriod">;

export type ExternalCardProps = {
  resume: string;
} & Pick<AppliedCardProps, "noticePeriod" | "name" | "appliedOn">;
