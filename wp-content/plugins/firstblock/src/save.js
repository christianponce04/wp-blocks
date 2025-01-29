import {RichText, useBlockProps} from "@wordpress/block-editor";

export default function save({attributes}){
  const {headingText} = attributes;
  const blockProps = useBlockProps.save();
  return <RichText.Content {...blockProps}
      value = {headingText}
      tagName="h4"
  />
};
