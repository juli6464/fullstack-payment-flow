import { Container } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function MainLayout({
  children,
}: Props) {
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 4,
      }}
    >
      {children}
    </Container>
  );
}