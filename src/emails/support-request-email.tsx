
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
  Row,
  Column,
} from '@react-email/components';
import * as React from 'react';

interface SupportRequestEmailProps {
  name: string;
  email: string;
  whatsapp?: string;
  paymentId: string;
  productName: string;
  message: string;
}

export const SupportRequestEmail: React.FC<Readonly<SupportRequestEmailProps>> = ({
  name,
  email,
  whatsapp,
  paymentId,
  productName,
  message,
}) => (
  <Html>
    <Head />
    <Preview>Payment Support Request for {productName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>New Payment Support Request</Heading>
        <Section style={section}>
          <Text style={paragraph}>
            A customer has submitted a support request regarding a payment issue.
          </Text>
          <Hr style={hr} />

          <Row style={row}>
            <Column style={label}>Product:</Column>
            <Column style={value}>{productName}</Column>
          </Row>
          <Row style={row}>
            <Column style={label}>Payment ID:</Column>
            <Column style={valueStrong}>{paymentId}</Column>
          </Row>

          <Hr style={hr} />

          <Text style={subHeading}>Customer Information</Text>
          <Row style={row}>
            <Column style={label}>Name:</Column>
            <Column style={value}>{name}</Column>
          </Row>
          <Row style={row}>
            <Column style={label}>Email:</Column>
            <Column style={value}>{email}</Column>
          </Row>
          {whatsapp && (
            <Row style={row}>
              <Column style={label}>WhatsApp:</Column>
              <Column style={value}>{whatsapp}</Column>
            </Row>
          )}

          <Hr style={hr} />

          <Text style={subHeading}>Customer's Message</Text>
          <Text style={messageStyle}>{message}</Text>
          
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#f0f2f5',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  border: '1px solid #e6ebf1',
  borderRadius: '8px',
  maxWidth: '600px',
};

const heading = {
  fontSize: '24px',
  letterSpacing: '-0.5px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#484848',
  padding: '0 30px',
};

const subHeading = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#484848',
    margin: '20px 0 10px 0',
}

const section = {
  padding: '0 30px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#525f7f',
};

const row = {
    marginBottom: '8px',
}

const label = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#8898aa',
    width: '120px',
}

const value = {
    fontSize: '14px',
    color: '#525f7f',
}

const valueStrong = {
    ...value,
    fontWeight: '700',
    fontFamily: 'monospace, "Courier New", Courier',
}

const messageStyle = {
    fontSize: '14px',
    lineHeight: '22px',
    color: '#525f7f',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    padding: '12px',
    backgroundColor: '#fafafa'
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '24px 0',
};
