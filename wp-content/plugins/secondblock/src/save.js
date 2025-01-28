import { useBlockProps } from "@wordpress/block-editor";

export default function save(){
  const props = useBlockProps.save();
  return <p {...props}>second block save</p>;
};