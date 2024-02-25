import { SVGProps } from "react";
import { X, Check, MinusCircle, Circle, CheckCircle2 } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { LucideProps } from "lucide-react";
import { cn } from "@/utils/utils";

export const fixedWidthHeightVariant: LucideProps["className"] = "w-3 h-3";

export const svgs = {
  verified: (props: SVGProps<SVGSVGElement> = {}) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="none"
        {...props}
      >
        <rect width={18} height={18} x={1} y={1} fill="#fff" rx={9} />
        <rect width={18} height={18} x={1} y={1} stroke="#fff" rx={9} />
        <rect width={18} height={18} x={1} y={1} fill="#fff" rx={9} />
        <rect width={18} height={18} x={1} y={1} stroke="#fff" rx={9} />
        <path
          fill="url(#a)"
          d="M8.477 2.802a1.846 1.846 0 0 1 3.046 0c.448.648 1.249.943 2.004.738 1.246-.338 2.446.68 2.333 1.98a1.884 1.884 0 0 0 1.066 1.87c1.17.551 1.442 2.111.529 3.034a1.896 1.896 0 0 0-.37 2.125c.545 1.183-.238 2.555-1.523 2.668a1.864 1.864 0 0 0-1.634 1.388c-.334 1.26-1.805 1.803-2.862 1.053a1.84 1.84 0 0 0-2.132 0c-1.057.75-2.528.208-2.862-1.053a1.864 1.864 0 0 0-1.634-1.388c-1.285-.113-2.068-1.485-1.522-2.668a1.896 1.896 0 0 0-.37-2.125c-.914-.923-.642-2.483.528-3.034A1.884 1.884 0 0 0 4.14 5.52c-.113-1.3 1.087-2.318 2.333-1.98a1.847 1.847 0 0 0 2.004-.738Z"
        />
        <g filter="url(#b)">
          <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m6.667 10.254 2 1.857 4.666-4.333"
            shapeRendering="crispEdges"
          />
        </g>
        <defs>
          <linearGradient
            id="a"
            x1={10}
            x2={10}
            y1={2}
            y2={18}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#27AE60" />
            <stop offset={1} stopColor="#1E874B" />
          </linearGradient>
          <filter
            id="b"
            width={9.867}
            height={7.533}
            x={5.067}
            y={7.178}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dy={1} />
            <feGaussianBlur stdDeviation={0.5} />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend
              in2="BackgroundImageFix"
              result="effect1_dropShadow_1_33089"
            />
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow_1_33089"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    );
  },
  rejectedIcon: (props: LucideProps = {}) => {
    return <X width={15} height={15} color="#EB5757" {...props} />;
  },
  shortlistedIcon: (props: LucideProps = {}) => {
    return <Check width={15} height={15} color="#00AA45" {...props} />;
  },
  rejectedContainerIcon: (props: LucideProps = {}) => {
    return <MinusCircle width={15} height={15} color="#EB5757" {...props} />;
  },
  appliedContainerIcon: (props: LucideProps = {}) => {
    return <Circle width={15} height={15} color="#0D0D0D" {...props} />;
  },
  shortlistedContainerIcon: (props: LucideProps = {}) => {
    return <CheckCircle2 width={15} height={15} color="#00AA45" {...props} />;
  },
} as const;

export const Verified = svgs["verified"];

export const RejectedIcon = svgs["rejectedIcon"];

export const ShortlistedIcon = svgs["shortlistedIcon"];

export const RejectedContainerIcon = svgs["rejectedContainerIcon"];

export const AppliedContainerIcon = svgs["appliedContainerIcon"];

export const ShortListedContainerIcon = svgs["shortlistedContainerIcon"];
