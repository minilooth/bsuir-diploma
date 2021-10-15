import React, {ReactNode} from 'react';
import Head from 'next/head'

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export const CommonLayout: React.FC<LayoutProps> = ({children, title = 'Next App'}) => {
  return (
    <>
      <Head>
        <meta name="description" content="Here is a precise description of my awesome webpage."/>
        <meta name="robots" content="theme, follow"/>
        <title>{title ? `${title} | Next JS` : title}</title>
      </Head>
      {children}
    </>
  )
}
