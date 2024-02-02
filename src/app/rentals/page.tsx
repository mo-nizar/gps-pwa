import React, { FC } from 'react';

interface PageProps {
}

const Page: FC<PageProps> = () => {
  const styles = {
    container: {
      display: 'flex',
      flex: 1,
      backgroundColor: 'red',
    }
  };

  return (
    <div style={styles.container}>
      rentals

      <div style={styles.container}>
        rentals
      </div>
    </div>
  );
}


export default Page;
