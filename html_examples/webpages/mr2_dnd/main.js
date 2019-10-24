Vue.component("variableblock", {
    props: ["name"],
    template: `
    <span class="draggable block" @mousedown="handleMouseDown($event)" @mouseup="handleMouseUp($event)">
    {{name}}
    </span>
  `,
    methods: {
        handleMouseDown(e) {
            console.log("X: " + e.pageX + ", Y:" + e.pageY);
            this.$el.style.position = "absolute";
            this.$el.style.zIndex = 9001;
            document.body.appendChild(this.$el);

            this.moveAt(e.pageX, e.pageY);

            if (this.onMouseMove) return;

            this.onMouseMove = (e) => {
                this.moveAt(e.pageX, e.pageY);
                let elemsBelow = document.elementsFromPoint(e.clientX, e.clientY);

                let foundDroppable = false;
                for (candidate of elemsBelow) {
                    if (candidate.className.includes("droppable")) {
                        if (this.currentDroppable != candidate) {
                            this.currentDroppable = candidate;
                        }
                        foundDroppable = true;
                        break;
                    }
                }
                if (!foundDroppable) {
                    if (this.currentDroppable) {
                        this.currentDroppable = null;
                    }
                }
            };
            document.addEventListener("mousemove", this.onMouseMove);
        },
        moveAt(pageX, pageY) {
            this.$el.style.left = pageX - this.$el.offsetWidth / 2 + 'px';
            this.$el.style.top = pageY - this.$el.offsetHeight / 2 + 'px';
        },
        handleMouseUp(e) {
            document.removeEventListener("mousemove", this.onMouseMove);
            this.onMouseMove = null;
            this.$el.style.position = "";
            this.$el.style.zIndex = "";
            this.$el.style.left = "";
            this.$el.style.top = "";
            if (this.currentDroppable != null) {
                this.currentDroppable.appendChild(this.$el);
                this.previousParent = this.currentDroppable;
            } else {
                this.previousParent.appendChild(this.$el);
            }
        },
        itemclicked() {
            this.$emit("itemclicked", this);
        },
        data() {
            return {
                imageUrl: "",
                currentDroppable: null,
                previousParent: null,
                onMouseMove: null,
            }
        }
    }
});

let variables = new Vue({
    el: '#app',
    data: {
        unselected: [
            { name: "cylinder" },
            { name: "displacement" },
            { name: "horsepower" },
            { name: "weight" },
            { name: "acceleration" },
            { name: "year" },
            { name: "origin" }
        ],
        selected: []
    },
    methods: {
        removeItem() {},
        addItem() {}
    }
});