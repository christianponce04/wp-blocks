import {RichText, useBlockProps} from "@wordpress/block-editor";

export default function save({attributes}){
  const {headingText,textAlignment} = attributes;
  const blockProps = useBlockProps.save(
    {
      className:`firstblock-text-align-${textAlignment}`,
    }
  );
  return <RichText.Content {...blockProps}
      value = {headingText}
      tagName="h4"
  />
};
