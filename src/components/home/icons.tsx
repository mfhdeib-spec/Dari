import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & {
  title?: string;
};

export function SearchIcon({ title = "Search", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <title>{title}</title>
      <path
        d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M16.2 16.2 21 21"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CartIcon({ title = "Cart", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <title>{title}</title>
      <path
        d="M6.5 7.5h15l-1.6 8.1a2 2 0 0 1-2 1.6H9.1a2 2 0 0 1-2-1.6L5.3 4.5H3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 21a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4ZM18 21a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function UserIcon({ title = "Account", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <title>{title}</title>
      <path
        d="M12 12a4.2 4.2 0 1 0 0-8.4A4.2 4.2 0 0 0 12 12Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M4.5 20.4c1.9-3.7 5-5.4 7.5-5.4s5.6 1.7 7.5 5.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HeartIcon({ title = "Favorite", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <title>{title}</title>
      <path
        d="M12 20.5s-7-4.4-9.3-8.7C.9 8.3 2.6 5.5 5.8 5.2c1.6-.2 3.1.6 4 1.8.8-1.2 2.3-2 4-1.8 3.2.3 4.9 3.1 3.1 6.6C19 16.1 12 20.5 12 20.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

