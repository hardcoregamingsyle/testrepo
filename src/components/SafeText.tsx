import parse, { DOMNode, Element } from 'html-react-parser';

const ALLOWED_TAGS = ['p', 'b', 'i', 'strong', 'em', 'span'];

export const SafeText = ({ content }: { content: string }) => {
  const options = {
    replace: (domNode: DOMNode) => {
      if (domNode instanceof Element && !ALLOWED_TAGS.includes(domNode.name)) {
        return <></>;
      }
    }
  };
  return <div className="prose">{parse(content, options)}</div>;
};