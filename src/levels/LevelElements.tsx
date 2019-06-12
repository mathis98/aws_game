import * as React from 'react';
import IconElement from 'components/IconElement';
import Draggable from 'components/dnd/Draggable';
import AWSProduct from 'components/dnd/AWSProduct';
import AWSPaletteItem from 'components/dnd/AWSPaletteItem';

export type IconLevelElement = "cam" | "bnd" | "camera" | "documents" | "shop" | "customer";

// the decorative level elements without functionality
export const allIcons: Record<IconLevelElement, JSX.Element> = {
  cam: <IconElement image={require('../../assets/img/cam.svg')} description="Kamera" />,
  bnd: <IconElement image={require('../../assets/img/bnd.svg')} description="BND" />,
  camera: <IconElement image={require('../../assets/img/camera.svg')} description="Kamera" />,
  documents: <IconElement image={require('../../assets/img/documents.svg')} description="Kundendaten" />,
  shop: <IconElement image={require('../../assets/img/shop.svg')} description="Shop" />,
  customer: <IconElement image={require('../../assets/img/customer.svg')} description="Kunde" />
}

export type AWSProductLevelElement = "s3" | "dynamodb";

export const allAWSProducts: Record<AWSProductLevelElement, JSX.Element> = {
  s3: <AWSPaletteItem id="s3" icon="s3" text="S3" key="s3_paletteItem" />,
  dynamodb: <AWSPaletteItem id="dynamodb" icon="dynamodb" text="DynamoDB" key="dynamodb_paletteItem" />,
}
