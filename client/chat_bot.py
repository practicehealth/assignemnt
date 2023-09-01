from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/', methods=['POST'])
def webhook():
    data = request.get_json()

    # Check if the message is a text message.
    if 'type' in data and data['type'] == 'MESSAGE':
        text = data['message']['text']

        # Check if the text message is not empty.
        if text.strip() != '':
            response = "Hello, World!"  # Your chatbot's response

            # Send the response back to the user.
            return jsonify({"text": response})

    return '', 200

if __name__ == '__main__':
    app.run(port=8080)
