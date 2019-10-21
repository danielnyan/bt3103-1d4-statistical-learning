# Credits: Ourstress https://github.com/Ourstress for providing base functions
import json
import traceback
import doctest

import re

import signal
import time

def run_local(requestDict):
    solution = requestDict['solution'] + codeInfoChecker + byteCodeChecker
    # To do: throw error when import in solution. 
    tests = requestDict['tests']
    import io
    import sys
    old_stdout = sys.stdout
    output = io.StringIO()
    sys.stdout = output
      
    try:
        namespace = {}
        compiled = compile('import json', 'submitted code', 'exec')
        exec(compiled, namespace)
        compiled = compile(solution, 'submitted code', 'exec')
        exec(compiled, namespace)
        namespace['YOUR_SOLUTION'] = solution.strip()
        namespace['LINES_IN_YOUR_SOLUTION'] = len(solution.strip().splitlines())
        test_cases = doctest.DocTestParser().get_examples(tests)
        execute_test_cases(test_cases, namespace)
        results, solved = execute_test_cases(test_cases, namespace)
        printed = output.getvalue()
        responseDict = {"solved": solved , "results": results, "printed":printed}
        responseJSON = json.dumps(responseDict)
        return responseJSON
    except:
        errors = traceback.format_exc()
        responseDict = {'errors': '%s' % errors}
        responseJSON = json.dumps(responseDict)
        return responseJSON
    finally:
        sys.stdout = old_stdout

def execute_test_cases(testCases, namespace):
    resultList = []
    solved = True
    for e in testCases:
        if not e.want:
            exec(e.source) in namespace
            continue
        call = e.source.strip()
        got = eval(call, namespace)
        expected = eval(e.want, namespace)
        correct = True
        if got == expected:
          correct = True
        else:
          correct = solved = False
        resultDict = {'call': call, 'expected': expected, 'received': "%(got)s" % {'got': got}, 'correct': correct}
        resultList.append(resultDict)
    return resultList, solved
