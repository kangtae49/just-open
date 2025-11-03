from flask import Flask
from api_dev import rest_bp

def main():
    server = Flask(__name__)
    server.register_blueprint(rest_bp)
    server.run(host='127.0.0.1', port=3000, debug=True)
    pass

if __name__ == '__main__':
    main()