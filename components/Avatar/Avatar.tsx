import Image from "next/image";
import styles from "./Avatar.module.scss";

interface AvatarProps {
  name: string;
  role?: string;
  image: string;
  showOnline?: boolean;
}

export default function Avatar({
  name,
  role,
  image,
  showOnline = false,
}: AvatarProps) {
  return (
    <div className={styles.wgAvatar}>
      <div className={styles.image}>
        <Image src={image} alt={name} fill style={{ objectFit: "cover" }} />
      </div>

      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        {role && (
          <div className={styles.sub}>
            {showOnline && (
              <div className={styles.dot}>
                <span className={styles.wave} />
                <span className={styles.wave} />
                <span className={styles.wave} />
              </div>
            )}
            <span className={styles.role}>{role}</span>
          </div>
        )}
      </div>
    </div>
  );
}
