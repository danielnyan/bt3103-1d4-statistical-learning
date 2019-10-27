let variables = new Vue({
    el: '#app',
    data: {
        variables: [
            { name: "cylinder" },
            { name: "displacement" },
            { name: "horsepower" },
            { name: "weight" },
            { name: "acceleration" },
            { name: "year" },
            { name: "origin" }
        ],
        unselected: [
            { name: "cylinder" },
            { name: "displacement" },
            { name: "horsepower" },
            { name: "weight" },
            { name: "acceleration" },
            { name: "year" },
            { name: "origin" }
        ],
        selected: [],
        properties: [],
        rSquared: 0,
    },
    methods: {
        swapVar(name) {
            for (let index in this.unselected) {
                if (this.unselected[index].name === name) {
                    let variable = this.unselected[index];
                    this.selected.push(variable);
                    this.unselected.splice(index, 1);
                    this.submitToLambda(variable.name, "add");
                    return;
                }
            }
            for (let index in this.selected) {
                if (this.selected[index].name === name) {
                    let variable = this.selected[index];
                    this.unselected.push(variable);
                    this.selected.splice(index, 1);
                    this.submitToLambda(variable.name, "remove");
                    return;
                }
            }
        },
        submitToLambda(variable, operation) {
            if (operation === "remove") {
                for (let index in this.properties) {
                    if (this.properties[index].name === variable) {
                        this.properties.splice(index, 1);
                        break;
                    }
                }
            } else if (operation === "add") {
                this.properties.push({ name: variable, val: 0 });
            }
            
            let result = await new Promise((resolve, reject) => {
              const nekoUrl = "https://1b1u6ce6m6.execute-api.us-east-1.amazonaws.com/Prod/lambda_handler";
              const xmlHttp = new XMLHttpRequest();
              xmlHttp.onreadystatechange = function() { 
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                  resolve(xmlHttp.responseText);
                } 
              }
              xmlHttp.open("POST", nekoUrl, true); 
              xmlHttp.send(JSON.stringify({
                questionId:"2b", 
                answer:JSON.stringify(this.properties)
              }));
            });
            let resultInfoTest = JSON.parse(result);
            console.log(resultInfoTest);
            
            for (let item of this.properties) {
                item.val = Math.min(...Array.from({length: 10},()=>Math.random()));
            }
            if (this.properties.length == 0) {
                this.rSquared = 0;
            } else {
                this.rSquared = Math.random();
            }
        },
        initialise(e) {
            Vue.nextTick(() => {
                e.previousParent = e.$el.parentElement;
            })
        },
    }
});