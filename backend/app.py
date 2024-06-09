from gradio_client import Client
from flask_cors import CORS
from flask import Flask, request, jsonify

app = Flask(__name__)

CORS(app)

@app.route('/query', methods=['GET'])

def query():
    query_string = request.args.get('query', '')
    print(query_string)
    client = Client("https://6dd41cd5e2a6ff8d87.gradio.live")
    result = client.predict(
		message=query_string,
		api_name="/chat"
    )
    response = {
        'received_query': result,
    }
    return jsonify(response)    

if __name__ == '__main__':
    app.run(debug=True)

# waitress-serve --listen=127.0.0.1:5000 app:app 