import {
	useRef,
	useState,
	useEffect
} from '@wordpress/element'

import {
	useBlockProps,
	RichText,
	MediaPlaceholder,
	BlockControls,
	MediaReplaceFlow,
	InspectorControls
} from '@wordpress/block-editor';
import {__} from '@wordpress/i18n';
import {isBlobURL} from "@wordpress/blob"
import {
	Spinner,
	withNotices,
	ToolbarButton,
	PanelBody,
	TextareaControl,
	Icon,
	Tooltip,
	TextControl,
	Button
} from "@wordpress/components";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"
import {usePrevious} from '@wordpress/compose';
import {DndContext, useSensor, useSensors, PointerSensor} from "@dnd-kit/core";
import {
	SortableContext,
	horizontalListSortingStrategy,
	arrayMove,
} from "@dnd-kit/sortable";

import SortableItem from "./sortable-item";

function Edit({
								attributes,
								setAttributes,
								noticeUI,
								noticeOperations,
								isSelected
							}) {

	const {name, bio, alt, url, id, socialLinks} = attributes;
	const titleRef = useRef();

	const [selectedLink, setSelectedLink] = useState();

	const prevURL = usePrevious(url);
	const prevIsSelected = usePrevious(isSelected);
	const sensors = useSensors(useSensor(PointerSensor,{
		activationConstraint:{distance:5},
	}))


	const onChangeName = (newName) => {
		setAttributes({name: newName})
	}
	const onChangeBio = (newBio) => {
		setAttributes({bio: newBio})
	}

	const onSelectImage = (image) => {
		if (!image || !image.url) {
			setAttributes({url: undefined, alt: undefined, id: undefined})
			return;
		}
		setAttributes({url: image.url, alt: image.alt, id: image.id})
	}

	const onChangeAlt = (newAlt) => {
		setAttributes({alt: newAlt})
	}
	const onSelectURL = (newURL) => {
		setAttributes({
			url: newURL,
			id: undefined,
			alt: '',
		})
	}

	const onUploadError = (message) => {
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice(message);
	}
	const removeImage = () => {
		setAttributes({
			url: undefined,
			alt: '',
			id: undefined,
		})
	}

	const addNewSocialItem = () => {
		setAttributes({
			socialLinks: [...socialLinks, {icon: 'wordpress', link: ''},
			],
		});
		setSelectedLink(socialLinks.length);
	}

	const updateSocialItem = (type, value) => {
		const socialLinksCopy = [...socialLinks];
		socialLinksCopy[selectedLink][type] = value
		setAttributes({
			socialLinks: socialLinksCopy
		})
	}

	const removeSocialItem = () => {
		setAttributes({
			socialLinks: [
				...socialLinks.slice(0, selectedLink),
				...socialLinks.slice(selectedLink + 1),

			],
		})
		setSelectedLink();
	};

	const handleDragEnd = (event) => {
		const{active,over}= event

		if(active && over && active.id !== over.id){
			const oldIndex = socialLinks.findIndex((i) => active.id === `${i.icon}-${i.link}`);
			const newIndex = socialLinks.findIndex((i) => over.id === `${i.icon}-${i.link}`);
			setAttributes({
				socialLinks: arrayMove(socialLinks,oldIndex,newIndex)
			})
			setSelectedLink(newIndex)
		}
	}

	useEffect(() => {
		if (url && !prevURL) {
			titleRef.current.focus();
		}
	}, [url, prevURL]);

	useEffect(() => {
		if (prevIsSelected && !isSelected) {
			setSelectedLink();
		}
	}, [isSelected, prevIsSelected]);

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Image Settings', 'Team-members')}
				>
					{url &&
						<TextareaControl
							label={__('Alt Text', 'Team-members')}
							value={alt}
							onChange={onChangeAlt}
							help={__('alternative Text describes your image')}
						/>
					}
				</PanelBody>
			</InspectorControls>
			{url &&
				<BlockControls group="inline">
					<MediaReplaceFlow
						name={__('Replace Image', 'team-members')}
						onSelect={onSelectImage}
						onSelectURL={onSelectURL}
						onError={onUploadError}
						accept="image/*"
						allowedTypes={['image']}
						mediaId={id}
						mediaURL={url}
					/>
					<ToolbarButton onClick={removeImage}>
						{__('Remove Image', 'team-members')}
					</ToolbarButton>
				</BlockControls>
			}
			<div {...useBlockProps()}>
				{url &&
					<div
						className={`wp-block-block-course-team-members-img${isBlobURL(url) ? ` is-loading` : ''}`}>
						<img src={url} alt={alt}/>
						{isBlobURL(url) && <Spinner/>}
					</div>}
				<MediaPlaceholder
					icon="admin-users"
					onSelect={onSelectImage}
					onSelectURL={onSelectURL}
					onError={onUploadError}
					accept="image/*"
					allowedTypes={['image']}
					disableMediaButtons={url}
					notices={noticeUI}
				/>
				<RichText
					ref={titleRef}
					placeholder={__("Member name:", 'team-member')}
					tagName="h4"
					onChange={onChangeName}
					value={name}
					allowedFormats={[]}
				/>
				<RichText
					placeholder={__("Member Bio:", 'team-member')}
					tagName="p"
					onChange={onChangeBio}
					value={bio}
					allowedFormats={[]}
				/>
				<div className='wp-block-block-course-team-members-social-links'>
					<ul>
						<DndContext
							sensors={sensors}
							onDragEnd={handleDragEnd}
							modifiers={[restrictToHorizontalAxis]}
						>
							<SortableContext items={socialLinks.map(
								(item) =>
									`${item.icon}-${item.link}`
							)}
															 strategy={horizontalListSortingStrategy}
							>
								{socialLinks.map((item,index) => {
									return (
										<SortableItem
											key={`${item.icon}-${item.link}`}
											id={`${item.icon}-${item.link}`}
											index={index}
											selectedLink={selectedLink}
											setSelectedLink={setSelectedLink}
											icon={item.icon}

										/>
									)
								})}
							</SortableContext>
						</DndContext>

						{isSelected &&
							<li className='wp-block-block-course-team-members-add-icon-li'>
								<Tooltip text={__(
									'Add Social Link',
									'team-members'
								)}>
									<button aria-label={__(
										'Add Social Link',
										'team-members'
									)}
													onClick={addNewSocialItem}
									>
										<Icon icon="plus"/>
									</button>
								</Tooltip>
							</li>
						}
					</ul>
				</div>
				{selectedLink !== undefined &&
					<div className='wp-block-block-course-team-members-link-form'>
						<TextControl
							label={__('Icon', 'text-members')}
							value={socialLinks[selectedLink].icon}
							onChange={(icon) => {
								updateSocialItem('icon', icon);
							}}
						/>
						<TextControl
							label={__('URL', 'text-members')}
							value={socialLinks[selectedLink].link}
							onChange={(link) => {
								updateSocialItem('link', link);
							}}
						/>

						<Button isDestructive
										onClick={removeSocialItem}>{__('Remove Link', 'text-members')}</Button>
					</div>
				}
			</div>
		</>
	);
};

export default withNotices(Edit);
