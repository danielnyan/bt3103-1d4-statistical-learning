"""
Extracts the directory from the path then returns the appropriate body
"""
import base64

def content_parser(path):
    # path will be in the form /main.js or /style.css
    directory = path[1:]
    extension = path.split(".")[-1]
    if extension == "css":
        contentType = "text/css"
    elif extension == "js":
        contentType = "text/javascript"
    elif extension in ["jpg", "jpeg", "jpe"]:
        contentType = "image/jpeg"
    elif extension == "png":
        contentType = "image/png"
    elif extension == "txt":
        contentType = "text/plain"
    elif extension == "json":
        contentType = "application/json"
    else:
        contentType = "text/html"

    if "image" in contentType:
        with open(directory, "rb") as f:
            content = base64.b64encode(f.read()).decode()
        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": contentType,
            },
            "isBase64Encoded": True,
            "body": content
        }

    else:
        with open(directory, "r") as f:
            content = f.read()
        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": contentType,
            },
            "body": content
        }
