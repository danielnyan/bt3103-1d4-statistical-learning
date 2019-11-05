let fuee = new Vue({
    el: '#app',
    data: {
        q2a: {
            correct: "Correct!",
            incorrect: "Incorrect!",
            status: "none",
            solved: false
        },
    },
    methods: {
        submit2a: async function() {
            let entered = parseCode("answer2a");
            this.q2a.status = "checking";
            let result = await new Promise((resolve, reject) => {
                const nekoUrl = window.location.origin + "/Prod/lambda_handler"
                const xmlHttp = new XMLHttpRequest();
                xmlHttp.onreadystatechange = function() {
                    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                        resolve(xmlHttp.responseText);
                    }
                }
                xmlHttp.open("POST", nekoUrl, true);
                xmlHttp.send(JSON.stringify({
                    questionId: "2a",
                    answer: JSON.stringify(entered)
                }));
            });
            let resultInfo = JSON.parse(result);
            console.log(resultInfo)
            if (resultInfo.correct) {
                this.q2a.status = "correct";
                this.q2a.solved = true;
            } else {
                this.q2a.status = "incorrect";
            }
        },
        nextPage() {
            if (this.q2a.solved || $("#prompt").css("display") !== "none") {
                window.location.href = "multiple_regression2.html"
            } else {
                $("#prompt").slideDown(500);
                setTimeout(this.hidePrompt, 5000)
            }
        },
        hidePrompt() {
            $("#prompt").slideUp(500);
        }
    },
    mounted() {
        initializeCodeblocks(["answer2a"]);
    }
})