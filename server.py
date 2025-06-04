from flask import Flask, request
import datetime
import os

app = Flask(__name__)

LOG_FILE = 'all_clicks_log.csv'

# Ensure the log file exists and has headers
if not os.path.exists(LOG_FILE):
    with open(LOG_FILE, 'w') as f:
        f.write("user,timestamp,ip_address\n")

@app.route('/log-phish', methods=['POST'])
def log_phish():
    data = request.get_json()
    user = data.get('user', 'unknown')
    timestamp = data.get('time', datetime.datetime.utcnow().isoformat())
    ip = request.remote_addr or 'unknown'

    with open(LOG_FILE, 'a') as f:
        f.write(f"{user},{timestamp},{ip}\n")

    return '', 204

if __name__ == '__main__':
    app.run(debug=True)
