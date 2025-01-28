import { registerBlockType } from  "@wordpress/blocks";
import "./style.scss"
import Edit from "./edit";
import Save from "./save";

registerBlockType("block/firstblock",{
  edit: Edit,
  save: Save,
});

