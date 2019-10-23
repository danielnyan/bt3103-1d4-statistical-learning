import json
import sys
sys.path.append("./site-packages")

def get_output(solution, prepend, tests):
    import io
    old_stdout = sys.stdout
    output = io.StringIO()
    sys.stdout = output
    error = False
    results = None

    try:
        namespace = {}
        compiled = compile(prepend, "submitted code", "exec")
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
