from gradio_client import Client
from flask_cors import CORS
from flask import Flask, request, jsonify

app = Flask(__name__)
CORS(app)

@app.route('/query', methods=['GET'])
def query():
    query_string = request.args.get('query', '')
    print(query_string)
    client = Client("https://620e8062e7c5756c85.gradio.live")
    result = client.predict(
        input = query_string,  
        api_name = "/chat"
    )
    response = {
        'received_query': result,
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
