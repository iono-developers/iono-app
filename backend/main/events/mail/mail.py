import smtplib
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()

# Access the environment variables
sender = os.getenv("SENDER")
password = os.getenv("PASSWORD")
smtp_server = os.getenv("SMTP_SERVER")
smtp_port = os.getenv("SMTP_PORT")


def send(subject, body, recipient):

    # Create the MIME object
    message = MIMEMultipart()
    message['From'] = sender
    message['To'] = ", ".join(recipient)
    message['Subject'] = subject

    # Add the email body
    body_html = f"""\
    <html>
        <head></head>
        <body>
            {body}
        </body>
    </html>
    """
    message.attach(MIMEText(body_html, 'html'))

    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(sender, password)
    server.sendmail(sender, recipient, message.as_string())
    server.quit()