import {
  useBlockProps,
  RichText,
  BlockControls,
  AlignmentToolbar
} from "@wordpress/block-editor";
import "./editor.scss"

export default function edit({attributes,setAttributes}){
  const  {headingText,textAlignment} = attributes

  const onChangeAlignment = newAlignment => setAttributes({
    "textAlignment":newAlignment
  })

  const onChangeText = newText => setAttributes({
      "headingText": newText
  })

  const blockProps =useBlockProps({
    className:`firstblock-text-align-${textAlignment}`,
  });
  return <>

    <BlockControls>
      <AlignmentToolbar
        onChange={onChangeAlignment}
        value ={textAlignment}
      />
    </BlockControls>

        <RichText {...blockProps }
                  onChange = {onChangeText}
                  value = {headingText}
                  placeholder="Hello this is placeholder"
                  tagName="h4"
                  allowedFormats={[]}
        />
    </>
};