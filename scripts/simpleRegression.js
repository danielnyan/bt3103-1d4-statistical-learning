let fuee = new Vue({
    el: '#app',
    data: {
        q1a: {
            correct: "Correct!",
            incorrect: "Incorrect!",
            status: "none",
            solved: false,
            wrong_attempts: 0
        },
        q1b: {
            correct: "Correct!",
            incorrect: "Incorrect!",
            status: "none",
            solved: false,
            wrong_attempts: 0
        },
    },
    methods: {
        submit1a: async function() {
            let answer = $("#answer1a").val();
            if (answer === "7.82") {
                this.q1a.status = "correct";
                this.q1a.solved = true;
                setProgress("1a");
            } else {
                this.q1a.status = "incorrect";
                this.q1a.wrong_attempts += 1;
            }
        },
        submit1b: async function() {
            let entered = parseCode("answer1b");
            this.q1b.status = "checking";
            let answerCorrect = false;
            
            if (entered === "importstatsmodels.formula.apiassmfols=smf.ols(formula='mpg~acceleration',data=df)ols_result=ols.fit()print(ols_result.summary())") {
              answerCorrect = true;
            }
            
            if (answerCorrect) {
                this.q1b.status = "correct";
                this.q1b.solved = true;
                setProgress("1b");
            } else {
                this.q1b.wrong_attempts += 1;
                this.q1b.status = "incorrect";
                this.q1b.incorrect = "Incorrect!";
            }
        },
        nextPage() {
            if ((this.q1a.solved && this.q1b.solved) || $("#prompt").css("display") !== "none") {
                window.location.href = "multiple_regression.html"
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
        initializeCodeblocks(["answer1b"]);
        retrieveProgress().then((result) => {
            if (result.includes("1a")) {
                this.q1a.solved = true;
            }
            if (result.includes("1b")) {
                this.q1b.solved = true;
            }
        });
    }
})