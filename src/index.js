const { createElement, } = wp.element
const { registerBlockType } = wp.blocks
const { InnerBlocks } = wp.editor

import './scss/styles.scss'
import 'slick-carousel'

import './Slide'
import SliderEdit from './SliderEdit'


registerBlockType("matiere-noir/slider", {
  title: "Slider",
  description: "Slider",
  icon: "images-alt2",
  category: "common",
  supports : { align: true, alignWide: true },

  attributes: {
    dataSlick: {
      type: 'string',
      source: 'attribute',
      selector: 'div',
      attribute: 'data-slick',
      default: '{}'
    }
  },

  edit: SliderEdit,

  save: ( {className, attributes }) => {
    return(
      <div className={ [className, 'mn-slider'].join(' ') } data-slick={ attributes.dataSlick }>
        <InnerBlocks.Content />
      </div>
    )
  }
})