import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import Edit from "./edit"
import Save from "./save"

registerBlockType('block-course/team-member',{
		title:__("Team Member","team-member"),
		description: __("A team member item","team-member"),
		icon:"admin-users",
		parent:["block-course/team-members"],
		support: {
			reusable: false,
			html:false,
		},
		attributes:{
			name: {
				type:"string",
				source:"html",
				selector:"h4"
			},
			bio: {
				type:"string",
				source:"html",
				selector:"p"
			},
		},
		edit: Edit,
		save: Save,
})
