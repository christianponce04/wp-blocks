import {RichText, useBlockProps} from "@wordpress/block-editor";

export default function save({attributes}){
  const {headingText,textAlignment,backgroundColor,textColor} = attributes;
  const blockProps = useBlockProps.save(
    {
      className:`firstblock-text-align-${textAlignment}`,
      style:{
        backgroundColor,
        color: textColor
      }
    }
  );
  return <RichText.Content {...blockProps}
      value = {headingText}
      tagName="h4"
  />
};
