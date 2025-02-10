import {
  useBlockProps,
  RichText,
  BlockControls,
  AlignmentToolbar,
  InspectorControls,
  PanelColorSettings, ContrastChecker,
  withColors,
} from "@wordpress/block-editor";
import "./editor.scss"
import {     __ } from	'@wordpress/i18n'

 function edit(props){
  const {attributes,setAttributes,backgroundColor,textColor,setBackgroundColor,setTextColor} = props
  const  {headingText,textAlignment} = attributes

  const onChangeAlignment = newAlignment => setAttributes({
    "textAlignment":newAlignment
  });

  const onChangeText = newText => setAttributes({
      "headingText": newText
  });

  const blockProps =useBlockProps({
    className:`firstblock-text-align-${textAlignment}`,
    style: {
      backgroundColor:backgroundColor.color,
      color:textColor.color,
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
            value: backgroundColor.color,
            onChange:setBackgroundColor,
            label:__("Background Color","text-box")
          },
          {
            value: textColor.colo,
            onChange: setTextColor,
            label:__("Text Color","text-box")
          },
        ]}
      >

        <ContrastChecker
          textColor={textColor.color}
          backgroundColor={backgroundColor.color}
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
export default withColors({
  backgroundColor: "backgroundColor",
  textColor:"color"
})(edit);