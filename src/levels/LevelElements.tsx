import * as React from 'react';
import IconElement from 'components/IconElement';
import AWSPaletteItem from 'components/dnd/AWSPaletteItem';

export type IconLevelElement = "cam" | "bpol" | "camera" | "documents" | "shop" | "customer" |
                               "users" | "gameserver" | "supportEmployee" | "weatherStation" |
                               "mobile";

function getIcon(filename: IconLevelElement) {
  return require(`../../assets/img/${filename}.svg`)
}

// the decorative level elements without functionality
export const allIcons: Record<IconLevelElement, JSX.Element> = {
  cam: <IconElement image={getIcon('cam')} description="Kamera" />,
  bpol: <IconElement image={getIcon('bpol')} description="Bundespolizei" />,
  camera: <IconElement image={getIcon('camera')} description="Kamera" />,
  documents: <IconElement image={getIcon('documents')} description="Kundendaten" />,
  shop: <IconElement image={getIcon('shop')} description="Shop" />,
  customer: <IconElement image={getIcon('customer')} description="Kunde" />,
  users: <IconElement image={getIcon('users')} description="Benutzer" />,
  gameserver: <IconElement image={getIcon('gameserver')} description="Gameserver" />,
  supportEmployee: <IconElement image={getIcon('supportEmployee')} description="Support-Mitarbeiter" color="#CD912D"/>,
  weatherStation: <IconElement image={getIcon('weatherStation')} description="Wetterstation" color="#1498C3"/>,
  mobile: <IconElement image={getIcon('mobile')} description="mobile Client"/>
};


export type AWSProductLevelElement = "s3" | "dynamodb" | "iam" | "shield" | "ses" | "lambda" | "lambdaTensorflow" |
                                     "lambda_image_metadata" | "kinesis" | "cognito" | "lakeFormation" | "redshift" |
                                     "forecast";

export const allAWSProducts: Record<AWSProductLevelElement, JSX.Element> = {
  s3: <AWSPaletteItem id="s3" icon="s3" text="S3" color="#3F8624" key="s3_paletteItem" />,
  dynamodb: <AWSPaletteItem id="dynamodb" icon="dynamodb" text="DynamoDB" color="#3B48CC" key="dynamodb_paletteItem" />,
  iam: <AWSPaletteItem id="iam" icon="iam" text="IAM" color="#D6242D" key="iam_paletteItem" />,
  shield: <AWSPaletteItem id="shield" icon="shield" text="AWS Shield" color="#D6242D" key="shield_paletteItem" />,
  cognito: <AWSPaletteItem id="cognito" icon="cognito" text="cognito" color="#D6242D" key="cognito_paletteItem" />,
  ses: <AWSPaletteItem id="ses" icon="ses" text="SES" color="#445EE0" key="ses_paletteItem" />,
  lambda: <AWSPaletteItem id="lambda" icon="lambda" text="Lambda" color="#D86613" key="lambda_paletteItem" />,
  lambdaTensorflow: <AWSPaletteItem id="lambdaTensorflow" icon="lambdaTensorflow" text="Lambda für Tensorflow" color="#DC710E" key="lambdaTensorflow_paletteItem" />,
  lambda_image_metadata: <AWSPaletteItem id="lambda_image_metadata" icon="lambda" text="Lambda" color="#D86613" key="lambda_paletteItem" />,
  kinesis: <AWSPaletteItem id="kinesis" icon="kinesis" text="Kinesis" color="#7A48D6" key="kinesis_paletteItem" />,
  lakeFormation: <AWSPaletteItem id="lakeFormation" icon="lakeFormation" text="Lake Formation" color="#693CC5" key="lakeFormation_paletteItem" />,
  redshift: <AWSPaletteItem id="redshift" icon="redshift" text="Redshift" color="#693CC5" key="redshift_paletteItem" />,
  forecast: <AWSPaletteItem id="forecast" icon="forecast" text="Forecast" color="#1C7B68" key="forecast_paletteItem" />
};
