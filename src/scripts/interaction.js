let fuee = new Vue({
    el: '#app',
    data: {
        q4: {
            solved: false
        },
        q4a: {
            correct: "Correct!",
            incorrect: "Incorrect!",
            status: "none",
            solved: false
        },
        q4b: {
            correct: "Correct!",
            incorrect: "Incorrect!",
            status: "none",
            solved: false
        },
    },
    methods: {
        submit4a: async function() {
            let answer = $("#answer4a").val();
            submitToLambda("4a", JSON.stringify(answer));
            if (answer === "") {
                this.q1a.status = "correct";
                this.q1a.solved = true;
            } else {
                this.q1a.status = "incorrect";
            }
        },
        submit4b: async function() {
            let answer = $("#answer1b").val();
            submitToLambda("4b", JSON.stringify(answer));
            if (answer === "7.82") {
                this.q1a.status = "correct";
                this.q1a.solved = true;
            } else {
                this.q1a.status = "incorrect";
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