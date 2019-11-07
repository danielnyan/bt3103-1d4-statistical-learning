let fuee = new Vue({
    el: '#app',
    data: {
        q5a: {
            correct: "Correct!",
            incorrect: "Incorrect!",
            status: "none",
            solved: false
        },
        q5b: {
            correct: "Correct!",
            incorrect: "Incorrect!",
            status: "none",
            solved: false
        },
    },
    methods: {
        submit5a: async function() {
            let answer = $("#answer5a").val();
            submitToLambda("5a", JSON.stringify(answer));
            if (answer === "7.82") {
                this.q5a.status = "correct";
                this.q5a.solved = true;
            } else {
                this.q5a.status = "incorrect";
            }
        },
        submit5b: async function() {
            let entered = parseCode("answer5b");
            this.q5b.status = "checking";

            let errorMessage = null;
            let result = await submitToLambda("5b", JSON.stringify(entered))
                .catch((err) => {
                    errorMessage = err || "Network request failed";
                });

            if (errorMessage !== null) {
                this.q5b.status = "incorrect";
                this.q5b.incorrect = "There appears to be a network error. Message: " + errorMessage;
            }

            let resultInfo = JSON.parse(result);
            if (resultInfo.correct) {
                this.q5b.status = "correct";
                this.q5b.solved = true;
            } else {
                this.q5b.status = "incorrect";
                this.q5b.incorrect = "Incorrect!";
            }
        },
        nextPage() {
            if ((this.q5a.solved && this.q5b.solved) || $("#prompt").css("display") !== "none") {
                window.location.href = "contents.html"
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
        initializeCodeblocks(["answer5a"]);
        initializeCodeblocks(["answer5b"]);
        retrieveProgress().then((result) => {
            if (result.includes("5a")) {
                this.q5a.solved = true;
            }
            if (result.includes("5b")) {
                this.q5b.solved = true;
            }
        });
    }
})