import { RejectedIcon, ShortlistedIcon, Verified } from "@/helpers/Svgs";
import {
  ShortlistedCardProps,
  AppliedCardProps,
  ExternalCardProps,
  RejectedCardProps,
  CandidateJobApplicationProgress,
  Candidate,
} from "@/types/common.types";
import { formatDate, getNoticePeriodText, timeAgo } from "@/utils/date.utils";
import { cn } from "@/utils/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { HTMLAttributes } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const textConfig = {
  "xx-small-text": "text-xxs leading-xxs",
} as const;

type CardProps =
  | ShortlistedCardProps
  | AppliedCardProps
  | ExternalCardProps
  | RejectedCardProps;

export default function Card(props: CardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.id,
    });
  const { variant, appliedOn, name } = props;

  const isShortListed = variant === "SHORTLISTED";

  const isApplied = variant === "APPLIED";

  const isExternal = variant === "EXTERNAL";

  const isRejected = variant === "REJECTED";

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="p-4 border border-border-primary rounded-lg bg-white flex flex-col gap-2"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <div className={`flex justify-between items-start`}>
        {isExternal ? (
          <CandidateName>{name}</CandidateName>
        ) : (
          <Image
            src={props.profilePicture}
            height={32}
            width={32}
            alt="profile"
            className="rounded-full"
          />
        )}
        <p className={`${textConfig["xx-small-text"]} text-txt-secondary`}>
          Applied {timeAgo(appliedOn)} ago
        </p>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          {!isExternal && <CandidateName>{name}</CandidateName>}
          {!isExternal && props.isVerified && <Verified />}
        </div>
        {!isExternal && <p className="text-xs text-txt-primary">{props.bio}</p>}
      </div>

      {(isApplied || isShortListed) && (
        <CandidateJobFit
          experience={props.experience}
          isHoldingOffer={props.isHoldingOffer}
          noticePeriod={props.noticePeriod}
        />
      )}

      {isApplied && <CandidateContact {...props.contact} />}

      {isExternal && (
        <CandidateResumeAndAvailability
          resume={props.resume}
          noticePeriod={props.noticePeriod}
          name={name}
        />
      )}

      {(isShortListed || isRejected) && (
        <ApplicationStatus {...props.jobApplicationProgress} />
      )}
    </div>
  );
}

function CandidateName(props: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5
      {...props}
      className={`text-txt-primary font-semibold text-sm ${props.className}`}
    >
      {props.children}
    </h5>
  );
}

function ApplicationStatus(props: CandidateJobApplicationProgress) {
  const { status, updatedBy, updatedOn } = props;
  // TODO: figure out why we need to pass explicit color values even
  // there are predefined values in icons
  const icon =
    status === "REJECTED" ? (
      <RejectedIcon />
    ) : status === "SHORTLISTED" ? (
      <ShortlistedIcon />
    ) : null;

  const statusText =
    status === "REJECTED"
      ? "Rejected"
      : status === "SHORTLISTED"
      ? "Shortlisted"
      : null;

  const textClasses = `${textConfig["xx-small-text"]} text-txt-secondary`;

  return (
    <div className="flex items-center gap-1">
      {icon}
      <p className={textClasses}>{statusText} by</p>
      <Image
        src={updatedBy.profilePicture}
        height={16}
        width={16}
        alt="updater-profile"
        className="rounded-full"
      />
      <p className={`${textClasses}`}>
        <span className="font-semibold">{updatedBy.name}</span> on{" "}
        {formatDate(updatedOn)}
      </p>
    </div>
  );
}

type CandidateJobFitProps = {
  experience: Candidate["experience"];
  isHoldingOffer: Candidate["isHoldingOffer"];
  noticePeriod: Candidate["noticePeriod"];
};

function CandidateDetailsLayout(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={cn("flex flex-col", props.className)}>
      {props.children}
    </div>
  );
}

const candidateJobFitLabel: HTMLAttributes<HTMLParagraphElement>["className"] = `${textConfig["xx-small-text"]} text-txt-secondary`;

const candidateJobFitValue: HTMLAttributes<HTMLParagraphElement>["className"] =
  "text-xs font-semibold text-txt-primary break-words";

function CandidateDetailsLabel(props: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p {...props} className={cn(candidateJobFitLabel, props.className)}>
      {props.children}
    </p>
  );
}

function CandidateDetailsValue(props: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p {...props} className={cn(candidateJobFitValue, props.className)}>
      {props.children}
    </p>
  );
}

function NoticePeriod({ noticePeriod }: { noticePeriod: string }) {
  return (
    <CandidateDetailsLayout>
      <CandidateDetailsLabel>Notice period</CandidateDetailsLabel>
      <CandidateDetailsValue>{noticePeriod}</CandidateDetailsValue>
    </CandidateDetailsLayout>
  );
}

function CandidateJobFit({
  experience,
  isHoldingOffer,
  noticePeriod,
}: CandidateJobFitProps) {
  const noticePeriodText = getNoticePeriodText(noticePeriod);
  return (
    <CandidateDetailsLayout className="gap-4 flex-row">
      <CandidateDetailsLayout>
        <CandidateDetailsLabel>Experience</CandidateDetailsLabel>
        <CandidateDetailsValue>{experience}</CandidateDetailsValue>
      </CandidateDetailsLayout>
      <CandidateDetailsLayout>
        <CandidateDetailsLabel>Holding Offer?</CandidateDetailsLabel>
        <CandidateDetailsValue>
          {isHoldingOffer ? "Yes" : "No"}
        </CandidateDetailsValue>
      </CandidateDetailsLayout>
      <NoticePeriod noticePeriod={noticePeriodText} />
    </CandidateDetailsLayout>
  );
}

function CandidateContact(props: Candidate["contact"]) {
  const { email, phone } = props;
  return (
    <CandidateDetailsLayout>
      <p className={candidateJobFitLabel}>Contact</p>
      <p className={candidateJobFitValue}>{email}</p>
      <p className={candidateJobFitValue}>{phone}</p>
    </CandidateDetailsLayout>
  );
}

type CandidateResumeAndAvailabilityProps = {
  resume: Candidate["resume"];
  noticePeriod: Candidate["noticePeriod"];
  name: Candidate["name"];
};

function CandidateResumeAndAvailability({
  resume,
  noticePeriod,
  name,
}: CandidateResumeAndAvailabilityProps) {
  const noticePeriodText = getNoticePeriodText(noticePeriod);
  return (
    <CandidateDetailsLayout className="flex-row gap-4">
      <CandidateDetailsLayout>
        <CandidateDetailsLabel>Resume</CandidateDetailsLabel>
        <CandidateDetailsValue>
          <a href={resume} target="_blank" rel="noreferrer">
            {name.replace(" ", "")}.pdf
            <ArrowUpRight className="w-4 h-4 inline mb-1" />
          </a>
        </CandidateDetailsValue>
      </CandidateDetailsLayout>
      <NoticePeriod noticePeriod={noticePeriodText} />
    </CandidateDetailsLayout>
  );
}
