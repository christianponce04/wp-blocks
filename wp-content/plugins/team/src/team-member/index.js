import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

registerBlockType('block-course/team-member',{
		title:__("Team Member","team-member"),
		description: __("A team member item","team-member"),
		icon:"admin-users",
		parent:["block-course/team-members"],
		edit: () => <p> Edit</p>,
		save: () => <p> save</p>,
})
