import React from "react";
import Link from "next/link";

import styles from "components/common/AnimatedLink/AnimatedLink.module.scss";

interface AnimatedLinkProps {
  href: string;
  title: string;
}

export const AnimatedLink: React.FC<AnimatedLinkProps> = ({href, title}) => {
  return (
    <Link href={href}>
      <a className={styles.link}>
        {title}
      </a>
    </Link>
  )
}
