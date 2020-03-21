import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';

export default ({ document, filename }) => (
  <div>
    <PDFDownloadLink document={document} fileName={filename}>
      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
    </PDFDownloadLink>
  </div>
)