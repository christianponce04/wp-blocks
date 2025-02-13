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
} from "@wordpress/components"
import {usePrevious} from '@wordpress/compose'

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
						{socialLinks.map((item, index) => {
							return (
								<li key={index}
										className={selectedLink === index ? 'is-selected' : null}>
									<button aria-label={__('Edit Social Link', 'team-members')}
													onClick={() => {
														setSelectedLink(index)
													}}
									>
										<Icon icon={item.icon}/>
									</button>
								</li>
							)
						})}
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
					<TextControl label={__('Icon', 'text-members')}/>
					<TextControl label={__('URL', 'text-members')}/>

					<Button isDestructive>{__('Remove Link', 'text-members')}</Button>
				</div>
				}
			</div>
		</>
	);
};

export default withNotices(Edit);
