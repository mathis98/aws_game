import * as React from 'react';
import IconElement from 'components/IconElement';
import AWSPaletteItem from 'components/dnd/AWSPaletteItem';

export type IconLevelElement =
  "cam" |
  "bpol" |
  "cactus" |
  "camera" |
  "camera2" |
  "documents" |
  "shop" |
  "shop2" |
  "customer" |
  "users" |
  "users2" |
  "users3" |
  "gameserver" |
  "supportEmployee" |
  "weatherStation" |
  "browser" |
  "mobile" |
  "webServer" |
  "weatherData" |
  "vdots" |
  "mobiles" |
  "waterTap" |
  "client";

function getIcon(filename: IconLevelElement) {
  return require(`../../assets/img/${filename}.svg`)
}

// the decorative level elements without functionality
export const allIcons: Record<IconLevelElement, JSX.Element> = {
  cam: <IconElement image={getIcon('cam')} description="Kamera" />,
  bpol: <IconElement image={getIcon('bpol')} description="Bundespolizei" />,
  cactus: <IconElement image={getIcon('cactus')} description="Wunderpflanze mit Sensoren" color="#3e603e"/>,
  camera: <IconElement image={getIcon('camera')} description="Kamera" color="#E44800"/>,
  camera2: <IconElement image={getIcon('camera')} description="Kamera" color="#547B80"/>,
  documents: <IconElement image={getIcon('documents')} description="Kundendaten" color="#547B80"/>,
  shop: <IconElement image={getIcon('shop')} description="Shop" color="#00909D" />,
  shop2: <IconElement image={getIcon('shop')} description="Shop" color="#73A353" />,
  customer: <IconElement image={getIcon('customer')} description="Kunde" color="#8C3494"/>,
  users: <IconElement image={getIcon('users')} description="Benutzer" color="#004260"/>,
  users2: <IconElement image={getIcon('users')} description="Benutzer" color="#689676"/>,
  users3: <IconElement image={getIcon('users')} description="Benutzer" color="#8F6C56"/>,
  gameserver: <IconElement image={getIcon('gameserver')} description="Gameserver" />,
  supportEmployee: <IconElement image={getIcon('supportEmployee')} description="Support-Mitarbeiter" color="#CD912D"/>,
  weatherStation: <IconElement image={getIcon('weatherStation')} description="Wetterstation" color="#1498C3"/>,
  browser: <IconElement image={getIcon('browser')} description="Web-Browser" color="#7E82AD"/>,
  mobile: <IconElement image={getIcon('mobile')} description="Benutzer" color="#232F3E"/>,
  webServer: <IconElement image={getIcon('webServer')} description="Web Server" color="#7895A4"/>,
  weatherData: <IconElement image={getIcon('weatherData')} description="Wetterdaten" color="#7B7C7F"/>,
  vdots: <IconElement image={getIcon('vdots')}/>,
  mobiles: <IconElement image={getIcon('mobiles')} description="Empfänger"/>,
  client: <IconElement image={getIcon('client')} description="Client" color="#232F3E"/>,
  waterTap: <IconElement image={getIcon('waterTap')} description="Bewässerung" color="#689676"/>,
};


export type AWSProductLevelElement =
  "s3" |
  "dynamodb" |
  "shield" |
  "ses" |
  "lambdaTensorflow" |
  "lambda_image_metadata" |
  "lambda_stock_data" |
  "lambda_rec_data" |
  "kinesis" |
  "cognito" |
  "api_gateway"|
  "apiGateway" |
  "sns"|
  "lakeFormation" |
  "redshift" |
  "IoTCore" |
  "QuickSight" | 
  "Sagemaker" |
  "Analytics" |
  "forecast";

export const allAWSProducts: Record<AWSProductLevelElement, JSX.Element> = {
  s3: <AWSPaletteItem id="s3" icon="s3" text="S3" color="#3F8624" key="s3_paletteItem" />,
  dynamodb: <AWSPaletteItem id="dynamodb" icon="dynamodb" text="DynamoDB" color="#3B48CC" key="dynamodb_paletteItem" />,
  shield: <AWSPaletteItem id="shield" icon="shield" text="AWS Shield" color="#D6242D" key="shield_paletteItem" />,
  cognito: <AWSPaletteItem id="cognito" icon="cognito" text="Cognito" color="#D6242D" key="cognito_paletteItem" />,
  ses: <AWSPaletteItem id="ses" icon="ses" text="SES" color="#445EE0" key="ses_paletteItem" />,
  lambdaTensorflow: <AWSPaletteItem id="lambdaTensorflow" icon="lambda" text="Lambda für Tensorflow" color="#DC710E" key="lambdaTensorflow_paletteItem" />,
  lambda_image_metadata: <AWSPaletteItem id="lambda_image_metadata" icon="lambda" text="Lambda für Metadaten" color="#D86613" key="lambda_paletteItem" />,
  lambda_stock_data: <AWSPaletteItem id="lambda_stock_data" icon="lambda" text="Lambda für Aktienkurse" color="#D86613" key="lambda_paletteItem" />,
  lambda_rec_data: <AWSPaletteItem id="lambda_rec_data" icon="lambda" text="Lambda für Empfängerdaten" color="#D86613" key="lambda_paletteItem" />,
  kinesis: <AWSPaletteItem id="kinesis" icon="kinesis" text="Kinesis" color="#7A48D6" key="kinesis_paletteItem" />,
  api_gateway: <AWSPaletteItem id="api_gateway" icon="aws-api-gateway" text="API Gateway" color="#D5A449" key="api_gateway_paletteItem" />,
  apiGateway: <AWSPaletteItem id="apiGateway" icon="apiGateway" text="API Gateway" color="#7A48D6" key="apiGateway_paletteItem" />,
  sns: <AWSPaletteItem id="sns" icon="sns" text="SNS" color="#CC2264" key="sns_paletteItem" />,
  IoTCore: <AWSPaletteItem id="IoTCore" icon="IoTCore" text="IoTCore" color="#5FA232" key="IoTCore_paletteItem" />,
  QuickSight: <AWSPaletteItem id="QuickSight" icon="QuickSight" text="QuickSight" color="#7A48D6" key="quicksight_paletteItem" />,
  Sagemaker: <AWSPaletteItem id="Sagemaker" icon="Sagemaker" text="Sagemaker" color="#28977C" key="sagemaker_paletteItem" />,
  Analytics: <AWSPaletteItem id="Analytics" icon="Analytics" text="Analytics" color="#5FA232" key="analytics_paletteItem" />,
  lakeFormation: <AWSPaletteItem id="lakeFormation" icon="lakeFormation" text="Lake Formation" color="#693CC5" key="lakeFormation_paletteItem" />,
  redshift: <AWSPaletteItem id="redshift" icon="redshift" text="Redshift" color="#693CC5" key="redshift_paletteItem" />,
  forecast: <AWSPaletteItem id="forecast" icon="forecast" text="Forecast" color="#1C7B68" key="forecast_paletteItem" />
};
