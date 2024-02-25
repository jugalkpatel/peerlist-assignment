import Image, { StaticImageData } from "next/image";
import peerlistLogo from "@/public/images/peerlist.svg";
import {
  ChevronDown,
  Pencil,
  Share2,
  ArrowUpRightFromSquareIcon,
  MoreVertical,
} from "lucide-react";
import { HTMLAttributes, SVGProps } from "react";
import { cn } from "@/utils/utils";
import { timeAgo } from "@/utils/date.utils";
import akash from "@/public/images/akash.svg";

export function Header() {
  return (
    <div className="bg-primaryBackground p-4 md:p-8 border-b border-border-primary">
      <div className="grid grid-cols-[40px,_1fr] sm:grid-cols-[56px,_1fr] grid-rows-1 gap-4">
        <div className="border border-border-primary rounded-xl p-2 grid place-items-center h-fit w-fit">
          <div className="h-7 w-7 sm:h-10 sm:w-10 relative">
            <Image src={peerlistLogo} alt="logo" fill={true} />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1 lg:gap-0">
            <div className="flex justify-between items-start flex-col gap-2 sm:flex-row">
              <div>
                <div className="flex gap-2 items-center">
                  <p className="text-md text-txt-primary font-semibold">
                    Software Engineer, Frontend
                  </p>
                  <ActionButton className="border-0 p-0">
                    <ChevronDown className="w-4 h-4" />
                  </ActionButton>
                </div>
                <JobDetails
                  company="Peerlist"
                  employmentType="Full Time"
                  location="Remote (United Stats, Canada)"
                />
              </div>
              <div className="flex gap-2">
                <ActionButton>
                  <ActionIcon Component={Pencil} />
                </ActionButton>
                <ActionButton>
                  <ActionIcon Component={Share2} />
                </ActionButton>
                <ActionButton>
                  <ActionIcon Component={ArrowUpRightFromSquareIcon} />
                </ActionButton>
                <ActionButton>
                  <ActionIcon Component={MoreVertical} />
                </ActionButton>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between md:gap-0">
            <div className="flex gap-4">
              <JobStatItem count={78} text="Candidates" />
              <JobStatItem count={68} text="Applied w/ Peerlist" />
              <JobStatItem count={2872} text="Views" />
            </div>
            <JobMetaData
              time="2024-02-25T00:00:00Z"
              profilePicture={akash}
              name="Akash Bhadange"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

type JobMetaDataProps = {
  time: string;
  profilePicture: StaticImageData;
  name: string;
};

function JobMetaData({ time, name, profilePicture }: JobMetaDataProps) {
  return (
    <div className="flex gap-1 flex-wrap items-center">
      <p className="text-xs">
        <span className="text-txt-secondary">Posted</span>{" "}
        <span className="font-semibold text-txt-primary">
          {timeAgo(new Date(time))} ago
        </span>
      </p>
      <div className="text-xs flex items-center gap-[3px]">
        <span className="text-txt-secondary">by</span>{" "}
        <Image
          src={profilePicture}
          height={16}
          width={16}
          alt="updater-profile"
          className="rounded-full"
        />
        <span className="font-semibold text-txt-primary">{name}</span>
      </div>
    </div>
  );
}

type JobStateItemProps = {
  count: number;
  text: string;
};

function JobStatItem({ count, text }: JobStateItemProps) {
  return (
    <p className="text-xs">
      <span className="font-semibold mr-[2px]">{count}</span>
      {text}
    </p>
  );
}

type JobDetailsProps = {
  company: string;
  employmentType: string;
  location: string;
};

function JobDetails({ company, employmentType, location }: JobDetailsProps) {
  return (
    <p className="text-txt-primary text-sm break-words">
      at {company} <DotBold /> {employmentType} <DotBold /> {location}
    </p>
  );
}

export function ActionButton(props: HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "p-1 border border-actionBorder rounded-full",
        props.className
      )}
    >
      {props.children}
    </button>
  );
}

export function ActionIcon({
  Component,
  className,
  ...rest
}: SVGProps<SVGAElement> & {
  Component: React.ElementType;
}) {
  return (
    <Component
      className={cn("w-3.5 h-3.5 text-iconPrimary", className)}
      {...rest}
    />
  );
}

function DotBold() {
  return <span className="font-bold">•</span>;
}
