import React from 'react';

export default function EmailContent({ content }) {
  return (
    <div dangerouslySetInnerHTML={{ __html: content }} />
  );
}
