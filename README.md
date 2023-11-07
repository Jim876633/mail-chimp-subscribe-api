# Mailchimp Subscribe API

This is a simple API service build with [Netlify](https://www.netlify.com/) for front-end developers, allowing you to add members to a list using the [Mailchimp Subscribe API](https://mailchimp.com/developer/marketing/api/list-members/add-member-to-list/). Users can sign up for your mailing list directly from your website.

## Getting Started

Follow these steps to set up and run the project:

### 1. Installation

First, clone this repository and navigate to the project directory:

```bash
git clone https://github.com/Jim876633/mail-chimp-subscribe-api.git
cd mail-chimp-subscribe-api
```

Next, install the dependencies:

```bash
npm install
```

### 2. Configuration

Create a `.env` file in the root directory of the project. Add the following environment variables to the file:

```.env
MAILCHIMP_API_KEY=YOUR_MAILCHIMP_API_KEY
MAILCHIMP_PREFIX=YOUR_MAILCHIMP_PREFIX
MAILCHIMP_AUDIENCEID=YOUR_MAILCHIMP_AUDIENCEID
```

Here's how to obtain the necessary values:

- **MAILCHIMP_API_KEY**: Visit your Mailchimp account's "Account & Billing" page, click on "Extras," and select "API Keys" to create a new API key. Your API key will have a format like `xxx-us1`. The `xxx` part should be used as YOUR_MAILCHIMP_API_KEY.

- **MAILCHIMP_PREFIX**: Regarding the MAILCHIMP_PREFIX, use the `us1` part of your API key as YOUR_MAILCHIMP_PREFIX.

- **MAILCHIMP_AUDIENCE_ID**: To find your audience ID, navigate to "Audience" > "All Contacts" > "Settings" > "Audience name and defaults" in your Mailchimp account.

Replace the three values with your Mailchimp API key, prefix, and audience ID in the .env file.

### 3. Running the Project

To run the project, use the following command:

```bash
npm run start
```

The project will be available at `http://localhost:8888`.

### 4. Deploy the Project

If you want to deploy the project to Netlify, you have two options:

1. push the project to gitHub and connect your Netlify account to your GitHub account. Then, deploy the project from your GitHub repository.

2. run the following command:

```bash
npm run deploy
```

It will need to login to your Netlify account and create a new site for you.

## Usage

To add a member to your Mailchimp audience, send a POST request to the root URL of the project with the following JSON body:

```json
{
  "email": "YOUR_EMAIL_ADDRESS"
}
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
