import json

def get_output(solution, prepend, append, tests):
    error = False
    results = None

    try:
        namespace = {}
        compiled = compile(prepend, "submitted code", "exec")
        exec(compiled, namespace)
        compiled = compile(solution, "submitted code", "exec")
        exec(compiled, namespace)
        compiled = compile(append, "submitted code", "exec")
        exec(compiled, namespace)
        results = eval(tests, namespace)
    except Exception as e:
        results = type(e).__name__ + ": " + str(e)
        error = True
    return json.dumps({
        "output" : results,
        "error" : error
    })
