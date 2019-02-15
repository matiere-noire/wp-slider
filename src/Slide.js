const { createElement,Fragment } = wp.element
const { registerBlockType } = wp.blocks
const { InnerBlocks, MediaPlaceholder, MediaUpload, MediaUploadCheck, BlockControls } = wp.editor
const { IconButton, Toolbar } = wp.components

registerBlockType("matiere-noir/slide", {
  title: "Slide",
  description: "Slide",
  category: "common",
  attributes: {
    url: {
      type: 'string',
    },
    id: {
      type: 'number',
    }
  },

  edit: ( {className, attributes, setAttributes }) => {

    const { url, id } = attributes

    const onSelectMedia = ( media ) => {
      if ( ! media || ! media.url ) {
        setAttributes( { url: undefined, id: undefined } );
        return;
      }

      setAttributes( {
        url: media.url,
        id: media.id,
      } )
    }

    const controls = (
      <Fragment>
        <BlockControls>
          { !! url && (
            <Fragment>

              <MediaUploadCheck>
                <Toolbar>
                  <MediaUpload
                    onSelect={ onSelectMedia }
                    allowedTypes='image'
                    value={ id }
                    render={ ( { open } ) => (
                      <IconButton
                        className="components-toolbar__control"
                        label='Edit media'
                        icon="edit"
                        onClick={ open }
                      />
                    ) }
                  />
                </Toolbar>
              </MediaUploadCheck>
            </Fragment>
          ) }
        </BlockControls>
      </Fragment>
    );

    if ( ! url ) {

      return (
        <Fragment>
          <MediaPlaceholder
            labels={ {
              title: 'Images',
              instructions: 'Choisissez une image de slide et deploser la directement ici',
            } }
            onSelect={ onSelectMedia }
            accept="image/*"
            allowedTypes='image'
            //notices={ noticeUI }
            //onError={ noticeOperations.createErrorNotice }
          />
        </Fragment>
      );
    }

    return(
      <Fragment>
        <div
          className={ [className, 'mn-slider__slide'].join(' ') }
        >
          { controls }
          <img src={url} className='mn-slider__slide-image'/>
          <div className='mn-slider__content'>
            <InnerBlocks />
          </div>
        </div>
      </Fragment>
      )
  },

  save: ( {className, attributes}) => {
    return (
        <div className={ [className, 'mn-slider__slide'].join(' ') }>
          <img src={attributes.url} className='mn-slider__slide-image'/>
          <div className='mn-slider__content'>
            <InnerBlocks.Content />
          </div>
        </div>
      )
  }
})