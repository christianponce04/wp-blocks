import { registerBlockType} from "@wordpress/blocks";
import "./style.scss"
import edit from "./edit";
import save from "./save";

registerBlockType("block/second",{
  edit: edit,
  save: save,
});
