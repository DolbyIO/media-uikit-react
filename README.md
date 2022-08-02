# Dolby.io Media Music Mastering UIKit for React

# Overview

The Dolby.io Music Mastering UIKit for React is designed to help React developers reduce the complexity of building and embedding a Dolby.io Music Mastering application for the web.

The package consists of the following elements:

- **UI components**: Basic elements used to create a Music mastering web application.
- **Utilities**: Set of functions offering media processing logic.

# Getting Started

This guide demonstrates how to use the Music Mastering UI components to quickly build the foundations of a Music Mastering workflow for the web.

## Prerequisites

- A Dolby.io account and authentication credentials.
- React 16.5 or greater.
- A supported browser: Chrome 100+, Safari 15+, Firefox 100+, or Edge 100+

### How to get a Dolby.io account

Before you build a Music Mastering application, you need to create a Dolby.io account. To set it up, go to https://dashboard.dolby.io/signnup and complete the form. After confirming your email address, you will be logged in.

### Dolby.io dashboard

After you log in to your Dolby.io account, you get access to the full dashboard where you can manage your account. From this page https://dashboard.dolby.io/dashboard/applications/summary you can manage your profile and billing.

### How to get your authentication credentials

Before you start building a Music Mastering application, you need to go to the Dolby.io developer dashboard and add a new app to get your App key and App secret. You will use these credentials to authenticate your application.

Create your App key and App secret:

1. Log in to the Dolby.io developer dashboard: https://dashboard.dolby.io/.
2. Click **ADD NEW APP**.
3. In the **Application Name** box, enter your application name.
4. In the **API Keys** column, in the same row as your application, click **Get API keys**.
5. Click **Copy** to copy your App key and App secret.

## Install the UIKit

```
npm install @dolbyio/media-uikit-react
```

or

```
yarn add @dolbyio/media-uikit-react
```

## Use a component

### Example

```tsx
import { Waveform, WaveformProps } from '@dolbyio/media-uikit-react';

interface MyComponentProps extends WaveformProps {}

const MyComponent = (props: MyComponentProps) => {
  return (
    <div>
      <Waveform {...props}></Waveform>
    </div>
  );
};
```

## Use a utility

### Media Client

#### Constructor

The constructor takes a single JSON object as an argument with the following properties:
| Arguments | Description |
| ---- | ----------- |
| server | _String_<br>The Dolby.io base API URL. |
| apiKey | _String_<br>The Dolby.io Media API key. |

#### Methods

_apiCall_

```ts
apiCall({
  requestParams: RequestParams;
  restConfig?: RestConfig;
  onResponse?: Function;
  onProgress?: Function;
})*
```

| Arguments     | Description                                                                                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| requestParams | _RequestParams_<br>Request related parameters.         |
| restConfig    | _RestConfig_<br> Optional rest configuration override. |
| onResponse    | _Function_<br> Optional callback called when the Music Mastering API completes processing.                                                                               |
| onProgress    | _Function_<br>Optional callback called when the Music Mastering API is in progress. The parameter `progress` is a number between 0 and 100.                              |

#### Example

Below is an example of how to utilize the Media client utility to call the [Music Mastering Preview API](https://docs.dolby.io/media-apis/reference/media-music-mastering-preview-post).

The client expects the following as input:

- Server URL and corresponding Media API key.
- The Media endpoint. For example, https://api.dolby.com/media/master.
- The request body. To get more details about the Media APIs, see the [API Reference](https://docs.dolby.io/media-apis/docs).

```ts
import { MapiClient } from '@dolbyio/media-uikit-react';

const server = 'https://api.dolby.com';
const apiKey = 'YOUR_MEDIA_API_KEY';

const callMasteringPreviewApi = async () => {
  const mapiClient = new MapiClient({
    server,
    apiKey,
  });
  await mapiClient.apiCall({
    requestParams: {
      endpoint: '/media/master/preview',
      body: {
        inputs: [
          {
            source: "https://path-to-input-file.com",
            segment: {
              0,
              30,
            },
          },
        ],
        outputs: [{
          destination: "https://path-to-output-file.com",
          master: {
            dynamic_eq: {
              enable: true,
              preset: "a",
            },
            loudness: { enable: true, loudness: -14 },
          },
        }],
      },
    },
    onResponse: () => {
      // API response callback. Called when the API completes processing.
    },
    onProgress: (progress: number) => {
      // API in progress callback. Parameter progress is a number between 0 and 100.
    }
  });
};
```
