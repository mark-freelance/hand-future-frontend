import React, { Component } from 'react'
import { Stage, Layer, Rect, Text } from 'react-konva'


export const Canvas = () => {
  // Stage is a div container
  // Layer is actual canvas element (so you may have several canvases in the stage)
  // And then we have canvas shapes inside the Layer
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text text="Try click on rect"/>
        {/*<ColoredRect/>*/}
      </Layer>
    </Stage>
  )
}

export default Canvas
