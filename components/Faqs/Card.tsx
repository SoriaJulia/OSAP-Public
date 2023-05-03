import { PortableText } from '@portabletext/react';
import React from 'react';

const FaqCard = ({ title, content }: { title: string; content: any }) => {
  return (
    <details className="group">
      <summary className="title group-open:no-underline">{title}</summary>
      <div className="content">
        <PortableText value={content} />
      </div>
    </details>
  );
};

export default FaqCard;
