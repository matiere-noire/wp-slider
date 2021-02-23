const { createElement, Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const {
  InnerBlocks,
  MediaPlaceholder,
  MediaUpload,
  MediaUploadCheck,
  BlockControls,
  InspectorControls,
} = wp.editor;
const {
  IconButton,
  Toolbar,
  PanelBody,
  PanelRow,
  ToggleControl,
  TextControl,
} = wp.components;

registerBlockType("matiere-noir/slide", {
  title: "Slide",
  description: "Slide",
  category: "common",
  attributes: {
    url: {
      type: "string",
    },
    id: {
      type: "number",
    },
    alt: {
      type: "string",
    },
    withLink: {
      type: "boolean",
      default: false,
    },
    href: {
      type: "string",
      default: "",
    },
  },

  edit: ({ className, attributes, setAttributes }) => {
    const { url, id, alt } = attributes;

    const onSelectMedia = (media) => {
      if (!media || !media.url) {
        setAttributes({ url: undefined, id: undefined, alt: undefined });
        return;
      }

      setAttributes({
        url: media.url,
        id: media.id,
        alt: media.alt,
      });
    };

    const linkPanel = (
      <InspectorControls>
        <PanelBody title="Link Settings" initialOpen={true}>
          <PanelRow>
            <ToggleControl
              label="Avec lien"
              checked={attributes.withLink}
              onChange={() => setAttributes({ withLink: !attributes.withLink })}
            />
          </PanelRow>
          {attributes.withLink ? (
            <PanelRow>
              <TextControl
                label="URL"
                value={attributes.href || ""}
                onChange={(value) => setAttributes({ href: value })}
              />
            </PanelRow>
          ) : null}
        </PanelBody>
      </InspectorControls>
    );

    const controls = (
      <Fragment>
        <BlockControls>
          {!!url && (
            <Fragment>
              <MediaUploadCheck>
                <Toolbar>
                  <MediaUpload
                    onSelect={onSelectMedia}
                    allowedTypes="image"
                    value={id}
                    render={({ open }) => (
                      <IconButton
                        className="components-toolbar__control"
                        label="Edit media"
                        icon="edit"
                        onClick={open}
                      />
                    )}
                  />
                </Toolbar>
              </MediaUploadCheck>
            </Fragment>
          )}
        </BlockControls>
      </Fragment>
    );

    if (!url) {
      return (
        <Fragment>
          {linkPanel}
          <MediaPlaceholder
            labels={{
              title: "Images",
              instructions:
                "Choisissez une image de slide et deploser la directement ici",
            }}
            onSelect={onSelectMedia}
            accept="image/*"
            allowedTypes="image"
            //notices={ noticeUI }
            //onError={ noticeOperations.createErrorNotice }
          />
        </Fragment>
      );
    }

    return (
      <Fragment>
        {linkPanel}
        <div className={[className, "mn-slider__slide"].join(" ")}>
          {controls}
          <img src={url} className="mn-slider__slide-image" alt={alt} />
          <div className="mn-slider__content">
            <InnerBlocks />
          </div>
        </div>
      </Fragment>
    );
  },

  save: ({ className, attributes }) => {
    let mainContent = (
      <div className={[className, "mn-slider__slide"].join(" ")}>
        <img
          src={attributes.url}
          className="mn-slider__slide-image"
          alt={attributes.alt}
        />
        <div className="mn-slider__content">
          <InnerBlocks.Content />
        </div>
      </div>
    );

    return attributes.withLink && attributes.href ? (
      <a className="mn-slider__link" href={attributes.href}>
        {mainContent}
      </a>
    ) : (
      mainContent
    );
  },
});
