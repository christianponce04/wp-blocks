import {useBlockProps,RichText} from "@wordpress/block-editor";
import "./editor.scss"

export default function edit({attributes,setAttributes}){
  const  {headingText} = attributes
  const blockProps =useBlockProps();
  return <RichText {...blockProps }
    onChange = { text => setAttributes({
      "headingText": text
    }) }
    value = {headingText}
    placeholder="Hello this is placeholder"
    tagName="h4"
  />
};