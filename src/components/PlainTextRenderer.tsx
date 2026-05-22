import React from 'react';

export const PlainTextRenderer = ({ content }: { content: string }) => {
  return <pre className="whitespace-pre-wrap">{content}</pre>;
};