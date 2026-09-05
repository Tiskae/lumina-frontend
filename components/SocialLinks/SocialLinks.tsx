import styles from "./SocialLinks.module.scss";

interface SocialLink {
  platform: "facebook" | "instagram" | "x" | "youtube" | "tiktok";
  href: string;
}

const ICON_MAP: Record<SocialLink["platform"], string> = {
  facebook: "icon-Facebook",
  instagram: "icon-Instagram",
  x: "icon-X",
  youtube: "icon-Youtube",
  tiktok: "icon-Tiktok",
};

interface SocialLinksProps {
  links: SocialLink[];
  style?: "default" | "black" | "bordered";
  size?: number;
}

export default function SocialLinks({
  links,
  style = "default",
  size,
}: SocialLinksProps) {
  const classes = [
    styles.wgSocial,
    style === "black" ? styles.styleBlack : "",
    style === "bordered" ? styles.styleBordered : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      {links.map(({ platform, href }) => (
        <a
          key={platform}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={platform}
          style={size ? { fontSize: size } : undefined}
        >
          <i className={ICON_MAP[platform]} />
        </a>
      ))}
    </div>
  );
}
