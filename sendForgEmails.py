def forgPassEmail(TO, USER, TOKEN):
    import smtplib
    from email.mime.multipart import MIMEMultipart
    from email.mime.text import MIMEText
    server = smtplib.SMTP('smtp.gmail.com')
    server.starttls()
    server.login('publiccommserv@gmail.com', 'imndubaghlyovusx')
    MESSAGE = MIMEMultipart('alternative')
    MESSAGE['Subject'] = 'Reset Password | PCS Help'
    MESSAGE['From'] = 'publiccommserv@gmail.com'
    MESSAGE['To'] = TO
    buttonStyle = """
font: bold 11px Arial;
text-decoration: none;
background-color: #EEEEEE;
color: #333333;
padding: 2px 6px 2px 6px;
border-top: 1px solid #CCCCCC;
border-right: 1px solid #333333;
border-bottom: 1px solid #333333;
border-left: 1px solid #CCCCCC;
border-radius: 4px;
"""
    text =  MIMEText(f'''\
<html>
    <body>
        <p>Dear {USER},</p>
        <br>
        <br>
        <p>You have requested a password reset link. If you do not\
 recognize this username or you have not requested a password reset, please\
 delete this email.</p>
        <br>
        <center>
            <p>To reset your password click this button:<br><br>
<a style="{buttonStyle}" href="https://malcolm07.github.io/Public-Communication-Service/commWebResetPass.html?user={TOKEN}">\
Reset Password</a><br><br>WARNING: After 24 hours, this link will not be usable!</p>
        </center>
        <br>
        <br>
        <p>From PCS Help</p>
    </body>
</html>
''', 'html')
    MESSAGE.attach(text)
    server.sendmail('publiccommserv@gmail.com', TO, MESSAGE.as_string())
    server.quit()

def forgUserEmail(TO, USER):
    import smtplib
    from email.mime.multipart import MIMEMultipart
    from email.mime.text import MIMEText
    server = smtplib.SMTP('smtp.gmail.com')
    server.starttls()
    server.login('publiccommserv@gmail.com', 'imndubaghlyovusx')
    MESSAGE = MIMEMultipart('alternative')
    MESSAGE['Subject'] = 'Find Username | PCS Help'
    MESSAGE['From'] = 'publiccommserv@gmail.com'
    MESSAGE['To'] = TO
    text =  MIMEText(f'''\
<html>
    <body>
        <p>Dear {USER},</p>
        <br>
        <br>
        <p>Your username is {USER}.</p>
        <br>
        <br>
        <p>From PCS Help</p>
    </body>
</html>
''', 'html')
    MESSAGE.attach(text)
    server.sendmail('publiccommserv@gmail.com', TO, MESSAGE.as_string())
    server.quit()
