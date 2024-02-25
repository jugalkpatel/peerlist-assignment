import { jobApplicationStatus } from "@/utils/constants";

export type CandidateContact = {
  email: string;
  phone: string;
};

export type CandidateReferredBy = {
  profilePicture: string;
  name: string;
  id: string;
};

export type JobApplicationStatus = keyof typeof jobApplicationStatus;

export type JobApplicationProgressUpdatedBy = CandidateReferredBy;

export type CandidateJobApplicationProgress = {
  status: JobApplicationStatus;
  updatedBy: JobApplicationProgressUpdatedBy;
  updatedOn: Date;
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
  jobApplicationProgress: CandidateJobApplicationProgress;
};

type CommonCardProps = {
  id: Candidate["id"];
  appliedOn: Candidate["appliedOn"];
  profilePicture: Candidate["profilePicture"];
  name: Candidate["name"];
  isVerified: Candidate["isVerified"];
  bio: Candidate["bio"];
  jobApplicationProgress: Candidate["jobApplicationProgress"];
};

export type RejectedCardProps = {
  variant: (typeof jobApplicationStatus)["REJECTED"];
} & CommonCardProps;

export type AppliedCardProps = CommonCardProps & {
  variant: (typeof jobApplicationStatus)["APPLIED"];
  experience: Candidate["experience"];
  isHoldingOffer: Candidate["isHoldingOffer"];
  noticePeriod: Candidate["noticePeriod"];
  contact: Candidate["contact"];
};

export type ShortlistedCardProps = CommonCardProps &
  Pick<AppliedCardProps, "isHoldingOffer" | "experience" | "noticePeriod"> & {
    variant: (typeof jobApplicationStatus)["SHORTLISTED"];
  };

export type ExternalCardProps = {
  resume: string;
} & Pick<AppliedCardProps, "noticePeriod" | "name" | "appliedOn"> & {
    variant: (typeof jobApplicationStatus)["EXTERNAL"];
  } & Pick<CommonCardProps, "id">;
