import * as React from 'react';
import IconElement from 'components/IconElement';
import Draggable from 'components/dnd/Draggable';
import AWSProduct from 'components/dnd/AWSProduct';

export type IconLevelElement = "cam" | "bnd";

// the decorative level elements without functionality
export const allIcons: Record<IconLevelElement, JSX.Element> = {
  cam: <IconElement image={require('../../assets/img/Cam.svg')} description="Kamera" />,
  bnd: <IconElement image={require('../../assets/img/BND.svg')} description="BND" />
}

export type AWSProductLevelElement = "s3" | "dynamodb";

export const allAWSProducts: Record<AWSProductLevelElement, JSX.Element> = {
  s3: <Draggable component={<div><AWSProduct icon='S3' text='S3' /></div>} id="s3" key="s3" />,
  dynamodb: <Draggable component={<div><AWSProduct icon='DynamoDB' text='DynamoDB' /></div>} id="dynamodb" key="dynamodb" />
}
