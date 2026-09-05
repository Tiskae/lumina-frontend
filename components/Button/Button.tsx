"use client";

import Link from "next/link";
import { useRef } from "react";

type ButtonVariant = "primary" | "dark" | "white" | "border";
type ButtonSize = "default" | "sm" | "px-28" | "px-32";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  icon?: string;
  iconPosition?: "left" | "right";
}

const variantClass: Record<ButtonVariant, string> = {
  primary: "",
  dark: "btn-bg-1",
  white: "btn-bg-white",
  border: "btn-border",
};

const sizeClass: Record<ButtonSize, string> = {
  default: "",
  sm: "btn-px-12",
  "px-28": "btn-px-28",
  "px-32": "btn-px-32",
};

export default function Button({
  children,
  variant = "primary",
  size = "default",
  href,
  onClick,
  type = "button",
  className = "",
  icon,
  iconPosition = "left",
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;
    const bgEffect = el.querySelector(".bg-effect") as HTMLSpanElement | null;
    if (bgEffect) {
      bgEffect.style.top = `${relY}px`;
      bgEffect.style.left = `${relX}px`;
    }
    el.style.setProperty("--button-width", `${el.offsetWidth}px`);
  };

  const classes = [
    "tf-btn",
    variantClass[variant],
    sizeClass[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {icon && iconPosition === "left" && <i className={`icon ${icon}`} />}
      <span>{children}</span>
      {icon && iconPosition === "right" && <i className={`icon ${icon}`} />}
      <span className="bg-effect" />
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        onMouseEnter={handleMouseEnter}
        ref={buttonRef as React.Ref<HTMLAnchorElement>}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      ref={buttonRef as React.Ref<HTMLButtonElement>}
    >
      {content}
    </button>
  );
}
