# CCMS Frontend

## Requirements

1. Node v8.12.+
2. Yarn @latest npm i yarn -g

## Environment Setup Old

1. Login to [AWS](https://content-dev.signin.aws.amazon.com/console)
2. Go to region where you deployed the above services.
3. CodeBuild info TBD
4. Go to Cognito > Manage User Pools
5. Add a user for yourself and update password.
6. Click on **App client settings**
7. [Missing] Populate DynamoDB tables with data
8. Run `npm start`

## Environment Setup

1. `npm -g yarn`
2. `yarn install`
3. Create .env.local file in root with these properties:

```
REACT_APP_API_QUALITY=[endpoint from aws cloudformation stack]
REACT_APP_API_CURATION=[endpoint from aws cloudformation stack]
REACT_APP_COGNITO_CLIENT=[cognito client]
REACT_APP_COGNITO_POOL=[cognito pool]
```
## Adding Environment Variables
1. You can add variables to project directly to the .env file.  These should only be static properties that will not really change.
2. You can add environment variables into Code Build project in AWS Console. To move those variables into the "env.json", you must update the cicd-generate-env.js file see:
3. You can also add variables to the Environment Variables in Codebuild.

`FeatureFlags`, should be a comma separated list, or 'null'. Note, it must have a value or it will be skipped.
`CompressAssets`, flags staging and prod environments so that their webpack output isn't compressed.  CDN handles their compression.

The environment variables must be passed into cicd-generate-env.js in order.  The will be read as follows:
```
const stage = process.argv[2];
const REACT_APP_AIRBRAKE_KEY = process.argv[3];
const REACT_APP_AIRBRAKE_ID = process.argv[4];
const REACT_APP_FEATURE_FLAGS = process.argv[5];
const compressAssets = process.argv[6]

const configData = {
    REACT_APP_AIRBRAKE_KEY,
    REACT_APP_AIRBRAKE_ID,
    REACT_APP_FEATURE_FLAGS
};
```
3. Lastly the environment variable values must be passed into the Node execution of the cicd-generate-env.js in both "aws-build-package-dev.yml" and "aws-package.yml" see:
```
- cd $CODEBUILD_SRC_DIR; node cicd-generate-env.js $Stage $Airbrake_Key $Airbrake_Id $FeatureFlags
```



## Technologies

We are using **react-app-rewired** which allows you to utilize custom eslint and babelrc files.
[This article explains setup](https://medium.com/manato/introduce-babel-new-plugins-to-create-react-app-ea55f56c3811)

### Typescript
[Typescript & React Cheatsheet](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet)

### Styling

[Emotion](https://emotion.sh/) is being used for custom for styling.

[Bootstrap](https://getbootstrap.com) is being used for base styling.

Cornerstone is moving towards [xstyled](https://www.smooth-code.com/open-source/xstyled/). XStyled wraps [styled-components](https://www.styled-components.com/).

I prefer emotion because it allows you to separate element creation and element styling. Styled-components couples the two together in an, IMO, unpleasant way - maybe it would just take some getting used to [shrug]

### State Management

[Mobx](https://mobx.js.org) https://mobx-react.js.org/

### Build

The app's build is configured through react-create-app (RCA). In order to override RCA's settings we are using _react-app-rewired_ and _customize-cra_ libraries. The _config-overrides.js_ file contains changes to the webpack, babel, and linting configuration encapsulated in the RCA.

### AWS Dev Environment Deployment

First:

- Login to AWS content-dev North Virginia region
- Go to CodeBuild
- Select Build Projects

Next (Setup AWS shared resources):

- Select ccms-aws-shared-deploy
- Click "start build"
- Select "release" as Source version,
- Add [your name] as stage
- Click start build
- Wait for build to complete

Next (Setup Curation API):

- Go back to Build Projects
- Select ccms-curation-deploy
- Click "start build"
- Select "release" as Source version,
- Add [your name] as stage
- Click "start build"
- Wait for completion

Next (Setup Quality API):

- Go back to Build Projects
- Select ccms-quality-deploy
- Click "start build"
- Select "release" as Source version,
- Add [your name] as stage
- Click "start build"
- Wait for completion

Next (Setup frontend UI resources):

- Go to AWS CodeBuild
- Select ccms-ui-deploy
- Click "Start build"
- Add branch name or "release" as "Source version"
- Under environment variables as your first name to "Stage"
- If this is your very first deploy for the environment, add environment variable `IS_INITIAL_DEPLOY` and set it to `true`.
  - This skips describing the UI stack because it won't exist until after the codebuild is complete.
  - Describing the UI stack is required for E2E testing to retrieve cloudformation stack values for the UI but not for the deploy to complete successfully.
- Click "Start build"
- Wait for build to complete

Next (Retrieve your development environment):

- Go to AWS Cloudformation.
- Search for "ccms-ui-[your name]"
- Open this stack.
- Under "Outputs" copy "WebsiteUrl".
- Open browser and and visit "[Above WebsiteUrl].env".
- This will download the env file.
- Copy values from this file into your .env.local file.
- The next two steps are not needed if you follow this step.
- Under "Outputs" the "WebsiteUrl" is the url you can view site.

Next (Configure development environment):

- Go to AWS CloudFormation
- Select your stack "ccms-curation-[your name]"
- Open "Outputs"
- Copy CurationApiUrl this is curation api's base url.
- Apply url as value for REACT_APP_API_CURATION in .env.local
- Select your stack "ccms-quality-[your name]"
- Open "Outputs"
- Copy QualityApiUrl this is the quality api's base url.
- Apply url as value for REACT_APP_API_QUALITY in .env.local
)

Finally (This step is necessary for now. Will be part of CICD deploy at some point):

- In AWS look for secrets manager.
- Find default users secrets
- Use the csod_admin or csod_user credentials
- You can also go through the following steps
    - Go to AWS Cognito
    - Click "Mange User Pools"
    - Open your user pool ccms-[your name]-user-pool
    - Select "Users and groups"
    - Click "Create User"
    - Follow steps
    - Once created go to https://[CurationApiUrl from above ]/swagger
    - Under "Auth" open /v1/auth/password/temporary/change
    - Create and submit a new password
    - Visit site url and you should be able to login.


### Swagger Docs
From your local env file visit both api urls
- [curation api url]/swagger
- [quality api url]/swagger

#### Seeding data in Swagger
Each of the above apis have a DB section. In each there are three endpoints to clean data, clean courses, and seedData
##### TODO: What is the order that these need to be run?

### CICD
CICD for Prod and Staging are managed by AWS Code Pipeline

Files in pipeline order:
- aws-build.yml - is a executed in Codebuild. This step installs npm packages, runs unit tests, and creates a production build of the site. It then validates the serverless.yml file.
- aws-package.yml - builds the serverless file and packages the build files, and the serverless-packages.yml  to zip file on s3, which is the artifact for next pipeline step. Also note that in this step, cicd-generate-env.js is run to create env.json which stores all necessary environment variables to load into application.
- Then serverless-packaged.yml is used to create or update a cloud formation stack.
- Finally, the zip file created during the packaging phase is extracted in the s3 bucket.

### Personal Environments
Personal environments are built differently. They are not built using CodePipeline. They are built directly in CodeBuild.
TODO: Finish this.
