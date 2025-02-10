import {
  useBlockProps,
  RichText,
  BlockControls,
  AlignmentToolbar,
  InspectorControls,
  PanelColorSettings, ContrastChecker
} from "@wordpress/block-editor";
import "./editor.scss"
import {     __ } from	'@wordpress/i18n'

export default function edit({attributes,setAttributes}){
  const  {headingText,textAlignment,backgroundColor,textColor} = attributes

  const onChangeAlignment = newAlignment => setAttributes({
    "textAlignment":newAlignment
  });

  const onChangeText = newText => setAttributes({
      "headingText": newText
  });

  const onChangeBackground = newBackground => setAttributes({
      "backgroundColor": newBackground
  });

  const onChangeTextColor = newTextColor => setAttributes({
      "textColor": newTextColor
  });

  const blockProps =useBlockProps({
    className:`firstblock-text-align-${textAlignment}`,
    style: {
      backgroundColor,
      color:textColor,
    }
  });
  return <>

    <InspectorControls>

      <PanelColorSettings
        title={__('Color Settings', 'text-box')}
        icon="admin-appearance"
        initialOpen
        disableCustomColors = { false }
        colorSettings ={ [
          {
            value: backgroundColor,
            onChange:onChangeBackground,
            label:__("Background Color","text-box")
          },
          {
            value: textColor,
            onChange: onChangeTextColor,
            label:__("Text Color","text-box")
          },
        ]}
      >

        <ContrastChecker
          textColor={textColor}
          backgroundColor={backgroundColor}
        />

      </PanelColorSettings>

    </InspectorControls>

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