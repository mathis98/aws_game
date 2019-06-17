import * as React from 'react';
import IconElement from 'components/IconElement';
import AWSPaletteItem from 'components/dnd/AWSPaletteItem';

export type IconLevelElement = "cam" | "bpol" | "camera" | "documents" | "shop" | "customer" |
                               "users" | "gameserver";

// the decorative level elements without functionality
export const allIcons: Record<IconLevelElement, JSX.Element> = {
  cam: <IconElement image={require('../../assets/img/cam.svg')} description="Kamera" />,
  bpol: <IconElement image={require('../../assets/img/bpol.svg')} description="Bundespolizei" />,
  camera: <IconElement image={require('../../assets/img/camera.svg')} description="Kamera" />,
  documents: <IconElement image={require('../../assets/img/documents.svg')} description="Kundendaten" />,
  shop: <IconElement image={require('../../assets/img/shop.svg')} description="Shop" />,
  customer: <IconElement image={require('../../assets/img/customer.svg')} description="Kunde" />,
  users: <IconElement image={require('../../assets/img/users.svg')} description="Benutzer" />,
  gameserver: <IconElement image={require('../../assets/img/gameserver.svg')} description="Gameserver" />,
}

export type AWSProductLevelElement = "s3" | "dynamodb" | "iam" | "shield";

export const allAWSProducts: Record<AWSProductLevelElement, JSX.Element> = {
  s3: <AWSPaletteItem id="s3" icon="s3" text="S3" color="#3F8624" key="s3_paletteItem" />,
  dynamodb: <AWSPaletteItem id="dynamodb" icon="dynamodb" text="DynamoDB" color="#3B48CC" key="dynamodb_paletteItem" />,
  iam: <AWSPaletteItem id="iam" icon="iam" text="IAM" color="#D6242D" key="iam_paletteItem" />,
  shield: <AWSPaletteItem id="shield" icon="shield" text="AWS Shield" color="#D6242D" key="shield_paletteItem" />
}
