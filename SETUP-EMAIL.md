# 📧 Email System Setup

For the contact form to work correctly, you need to configure environment variables for email sending.

## 🛠️ Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# SMTP Configuration (Example with Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Emails
SMTP_FROM=your-email@gmail.com
CONTACT_EMAIL=where-you-want-to-receive-emails@gmail.com
```

## 📋 Gmail Configuration

### Step 1: Enable 2-Step Verification
1. Go to your [Google Account](https://myaccount.google.com/)
2. Click on "Security"
3. Enable "2-Step Verification"

### Step 2: Create App Password
1. In the same "Security" section
2. Look for "App passwords"
3. Select "Mail" and your device
4. Google will give you a 16-character password
5. **Use this password in `SMTP_PASS`, NOT your normal password**

### Step 3: Configure Variables
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=abcd efgh ijkl mnop  # The 16-character app password
SMTP_FROM=your-email@gmail.com
CONTACT_EMAIL=your-email@gmail.com  # Or any other email where you want to receive messages
```

## 🔧 Configuration for Other Providers

### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
```

### Yahoo
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_SECURE=false
```

## ✅ Test the Configuration

1. Start the development server: `npm run dev`
2. Go to the form section on your site
3. Fill out and submit the form
4. Check your email to confirm the message arrived

## 🔒 Security

- **NEVER** upload your `.env.local` file to GitHub
- The `.env.local` file is already in `.gitignore`
- Use app passwords, not main passwords
- Environment variables are secure and only available on the server

## 🐛 Troubleshooting

### Error: "Invalid login"
- Verify you're using an app password, not your normal password
- Confirm that 2-step verification is enabled

### Error: "Connection timeout"
- Check your internet connection
- Some ISPs block port 587, try with 465 and `SMTP_SECURE=true`

### Error: "Authentication failed"
- Check that your email and app password are correct
- Make sure there are no extra spaces in the variables

## 📨 Example Email That Will Be Sent

When someone completes the form, you will receive an email like this:

**Subject:** New contact from DNXTLAB - [First Name] [Last Name]

**Content:**
- Client information (first name, last name, email)
- The complete message
- Professional HTML format
- Footer identifying it came from the DNXTLAB form

Your contact form is ready! 🚀 