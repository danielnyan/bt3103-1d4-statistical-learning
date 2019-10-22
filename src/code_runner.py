import json

def get_output(solution, tests):
    import io
    import sys
    old_stdout = sys.stdout
    output = io.StringIO()
    sys.stdout = output
    error = False
    results = None

    try:
        namespace = {}
        compiled = compile("import json", "submitted code", "exec")
        exec(compiled, namespace)
        compiled = compile(solution, "submitted code", "exec")
        exec(compiled, namespace)
        compiled = compile(tests, "submitted code", "exec")
        exec(compiled, namespace)
        results = output.getvalue()
    except Exception as e:
        results = type(e).__name__ + ": " + str(e)
        error = True
    finally:
        sys.stdout = old_stdout
    return json.dumps({
        "output" : results,
        "error" : error
    })
