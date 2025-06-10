from flask import Flask, request
from datetime import datetime, timezone
import smtplib
from email.mime.text import MIMEText

app = Flask(__name__)

@app.route('/')
def phishing_page():
    uid = request.args.get('uid', 'unknown')
    return f'''
    <!DOCTYPE html>
    <html>
    <head><title>Phish Page</title></head>
    <body style="font-family:Arial,background-color:#f8f9fa;text-align:center;padding:2em;">
        <img src="https://media1.tenor.com/m/_8Fm48kIrXQAAAAd/wahoo-fish.gif" alt="fish" width="300"><br>
        <h1 style="color:#c82333;">You’ve just been <strong>phished</strong>!</h1>
        <p>This was a security awareness test conducted by your team.</p>
        <div style="margin:2em auto;padding:2em;border:1px solid #ccc;border-radius:8px;max-width:400px;background:#fff;">
            <h2>Simulated Login Page</h2>
            <input type="text" placeholder="Username" style="width:100%;margin:0.5em 0;" disabled><br>
            <input type="password" placeholder="Password" style="width:100%;margin:0.5em 0;" disabled><br>
            <button disabled style="background:#007bff;color:white;padding:0.5em 1em;border:none;border-radius:4px;">Login</button>
            <p style="color:#888;font-size:0.9em;">(But actually... you're already caught!)</p>
        </div>
        <img src="/log-phish?user={uid}&time={datetime.now(timezone.utc).isoformat()}" style="display:none;">
    </body>
    </html>
    '''

@app.route('/log-phish')
def log_phish():
    user = request.args.get('user', 'unknown')
    time = request.args.get('time', 'unknown')
    ip = request.headers.get('X-Forwarded-For', request.remote_addr)

    print(f"[PHISH] UID: {user} | IP: {ip} | Time: {time}")

    send_email(
        subject="Phishing Test Alert",
        body=f"Phishing link clicked!\n\nUser: {user}\nIP: {ip}\nTime: {time}",
        recipient="creativebuilder66@gmail.com"
    )

    return '', 204

def send_email(subject, body, recipient):
    sender = 'creativebuilder66@gmail.com'  
    password = 'ckyx tgfb lssq gbvz'        

    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = sender
    msg['To'] = recipient

    try:
        with smtplib.SMTP('smtp.gmail.com', 587) as server:  
            server.starttls()
            server.login(sender, password)
            server.send_message(msg)
            print(f"Email sent to {recipient}")
    except Exception as e:
        print(f"Error sending email: {e}")

if __name__ == '__main__':
    app.run(port=5000)
