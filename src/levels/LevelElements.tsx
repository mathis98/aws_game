import * as React from 'react';
import IconElement from 'components/IconElement';
import AWSPaletteItem from 'components/dnd/AWSPaletteItem';

export type IconLevelElement = "cam" | "bnd" | "camera" | "documents" | "shop" | "customer" |
                               "users" | "gameserver";

// the decorative level elements without functionality
export const allIcons: Record<IconLevelElement, JSX.Element> = {
  cam: <IconElement image={require('../../assets/img/Cam.svg')} description="Kamera" />,
  bnd: <IconElement image={require('../../assets/img/BND.svg')} description="BND" />,
  camera: <IconElement image={require('../../assets/img/camera.svg')} description="Kamera" />,
  documents: <IconElement image={require('../../assets/img/documents.svg')} description="Kundendaten" />,
  shop: <IconElement image={require('../../assets/img/shop.svg')} description="Shop" />,
  customer: <IconElement image={require('../../assets/img/customer.svg')} description="Kunde" />,
  users: <IconElement image={require('../../assets/img/users.svg')} description="Benutzer" />,
  gameserver: <IconElement image={require('../../assets/img/gameserver.svg')} description="Gameserver" />,
}

export type AWSProductLevelElement = "s3" | "dynamodb" | "iam" | "shield";

export const allAWSProducts: Record<AWSProductLevelElement, JSX.Element> = {
  s3: <AWSPaletteItem id="s3" icon="S3" text="S3" key="s3_paletteItem" />,
  dynamodb: <AWSPaletteItem id="dynamodb" icon="DynamoDB" text="DynamoDB" key="dynamodb_paletteItem" />,
  iam: <AWSPaletteItem id="iam" icon="iam" text="IAM" key="iam_paletteItem" />,
  shield: <AWSPaletteItem id="shield" icon="shield" text="Shield" key="shield_paletteItem" />,
}
