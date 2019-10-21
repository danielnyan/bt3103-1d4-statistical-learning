"""
Extracts the directory from the path then returns the appropriate body
"""

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
    with open(directory, "r") as f:
        content = f.read()
    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": contentType,
        },
        "body": content
    }
