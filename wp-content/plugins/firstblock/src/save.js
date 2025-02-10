import {RichText, useBlockProps,getColorClassName} from "@wordpress/block-editor";
import classnames from "classnames"

export default function save({attributes}){

  const {headingText,textAlignment,backgroundColor,textColor,customBackgroundColor,customTextColor} = attributes;

  const backgroundClass = getColorClassName("background-color",backgroundColor)
  const textClass = getColorClassName("color",textColor)

  const classes = classnames( `firstblock-text-align-${textAlignment}`,{
      [backgroundClass]:backgroundColor,
      [textClass]:textColor
  });

  const blockProps = useBlockProps.save(
    {
      className:classes,
      style:{
        backgroundColor: backgroundClass ? undefined : customBackgroundColor,
        color: backgroundColor ? undefined : customTextColor
      }
    }
  );
  return <RichText.Content {...blockProps}
      value = {headingText}
      tagName="h4"
  />
};
