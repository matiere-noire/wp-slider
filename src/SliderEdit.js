const { createElement, Fragment } = wp.element
const { compose } = wp.compose
const { createBlock } = wp.blocks
const { InspectorControls, InnerBlocks } = wp.editor
const { PanelBody, PanelRow, Button, ToggleControl } = wp.components
const { withDispatch, withSelect } = wp.data

const SliderEdit = props => {
  const { insertBlock, removeBlock, getBlock, clientId, className, attributes, setAttributes } = props
  const addSlide = () => {
    const block = createBlock('matiere-noir/slide')
    insertBlock(block, undefined, clientId)
  }
  const removeSlide = () => {
    const sliderBlock = getBlock(clientId)
    if (sliderBlock.innerBlocks.length > 0) {
      const [lastSlide] = sliderBlock.innerBlocks.slice(-1)
      removeBlock(lastSlide.clientId)
    }
  }

  const dataSlick = JSON.parse(attributes.dataSlick)

  const updateDataSlick = dataSlickElem => {
    const updatedDataSlick = { ...dataSlick, ...dataSlickElem, autoplay: true }
    setAttributes({ dataSlick: JSON.stringify(updatedDataSlick) })
  }

  console.log(dataSlick)
  return (
    <Fragment>
      <InspectorControls>
        <PanelBody title="Slider Settings" initialOpen={true}>
          <PanelRow>
            <Button onClick={() => addSlide()}>Add slide</Button>
            <Button onClick={() => removeSlide()}>remove slide</Button>
          </PanelRow>
          <PanelRow>
            <ToggleControl
              label="Avec pagination"
              help={dataSlick.dots ? 'Affiche une pagination' : 'Pas de pagination'}
              checked={dataSlick.dots}
              onChange={() => updateDataSlick({ dots: !dataSlick.dots })}
            />
          </PanelRow>
          <PanelRow>
            <ToggleControl
              label="Avec navigation"
              help={dataSlick.arrows ? 'Affiche les flèches de navigation' : 'Pas de navigation'}
              checked={dataSlick.arrows}
              onChange={() => updateDataSlick({ arrows: !dataSlick.arrows })}
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>
      <div className={className}>
        {typeof props.insertBlocksAfter !== 'undefined' ? (
          <InnerBlocks allowedBlocks={['matiere-noir/slide']} templateInsertUpdatesSelection={false} />
        ) : (
          <div />
        )}
      </div>
    </Fragment>
  )
}

export default compose([
  withDispatch(dispatch => ({
    insertBlock: dispatch('core/editor').insertBlock,
    removeBlock: dispatch('core/editor').removeBlock
  })),
  withSelect(select => ({
    getBlock: select('core/editor').getBlock
  }))
])(SliderEdit)
