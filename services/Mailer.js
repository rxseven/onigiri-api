// Module dependencies
const sendgrid = require('sendgrid');
const helper = sendgrid.mail;

const credentials = require('../config/credentials');

// Mailer class
class Mailer extends helper.Mail {
  // Constructor
  constructor({ from, recipients, subject }, content) {
    super();

    // Variables
    const fromEmail = from ? from : credentials.campaign.sender;

    // Class properties
    this.mailAPI = sendgrid(credentials.sendgrid.key);
    this.from_email = new helper.Email(fromEmail);
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }

  // Format email address
  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  // Add click tracking
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  // Add recipients
  addRecipients() {
    const personalize = new helper.Personalization();

    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });

    this.addPersonalization(personalize);
  }

  // Create a network request
  async send() {
    // Configuration
    const request = this.mailAPI.emptyRequest({
      body: this.toJSON(),
      method: 'POST',
      path: '/v3/mail/send'
    });

    // Send an email
    const response = await this.mailAPI.API(request);

    // Return a response
    return response;
  }
}

// Module exports
module.exports = Mailer;
