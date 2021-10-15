import React from 'react';
import {Card, CardContent} from '@mui/material';

import styles from 'components/common/CenteredCard/CenteredCard.module.scss';

export const CenteredCard: React.FC = ({children}) => {
  return (
    <div className={styles.wrapper}>
      <Card>
        <CardContent className={styles.content}>
          {children}
        </CardContent>
      </Card>
    </div>
  )
}
