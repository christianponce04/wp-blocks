import {useBlockProps} from "@wordpress/block-editor";

export default function edit(){
  const props = useBlockProps();
  return <p {...props}>second block editor</p>;
  };