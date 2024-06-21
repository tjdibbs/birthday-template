import type { SVGProps } from "react";

export function UserTie(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={21}
      height={24}
      viewBox="0 0 448 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128m95.8 32.6L272 480l-32-136l32-56h-96l32 56l-32 136l-47.8-191.4C56.9 292 0 350.3 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-72.1-56.9-130.4-128.2-133.8"
      ></path>
    </svg>
  );
}

export function UpIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 48 48"
      {...props}
    >
      <path
        fill="none"
        stroke={props.color || "#000"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M13 30L25 18L37 30"
      ></path>
    </svg>
  );
}
