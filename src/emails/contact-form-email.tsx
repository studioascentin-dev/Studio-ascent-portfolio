
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface ContactFormEmailProps {
  name: string;
  email: string;
  service: string;
  message: string;
}

export const ContactFormEmail: React.FC<Readonly<ContactFormEmailProps>> = ({
  name,
  email,
  service,
  message,
}) => (
  <Html>
    <Head />
    <Preview>New Contact Form Submission from {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>New Message from your Website</Heading>
        <Section style={section}>
          <Text style={paragraph}>You've received a new submission from your contact form.</Text>
          <Hr style={hr} />
          <Text style={label}>Name:</Text>
          <Text style={value}>{name}</Text>
          <Text style={label}>Email:</Text>
          <Text style={value}>{email}</Text>
          <Text style={label}>Service of Interest:</Text>
          <Text style={value}>{service}</Text>
          <Text style={label}>Message:</Text>
          <Text style={messageStyle}>{message}</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  border: '1px solid #f0f0f0',
  borderRadius: '4px',
};

const heading = {
  fontSize: '24px',
  letterSpacing: '-0.5px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#484848',
  padding: '0 20px',
};

const section = {
  padding: '0 20px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#525f7f',
};

const label = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#8898aa',
    margin: '0 0 4px 0',
}

const value = {
    fontSize: '16px',
    color: '#525f7f',
    margin: '0 0 16px 0',
}

const messageStyle = {
    fontSize: '16px',
    lineHeight: '24px',
    color: '#525f7f',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    padding: '12px',
    backgroundColor: '#fafafa'
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};
