  
//存取localStorage中的数据  
var store = {  
    save(key, value){  
        localStorage.setItem(key, JSON.stringify(value));  
    },  
    fetch(key){  
        return JSON.parse(localStorage.getItem(key))||[];  
    }  
};  

//取出所有值
var list = store.fetch("miaov");  


var vm = new Vue({  
    el: ".main",  
    data: {  
        list: list,  
        todo: "",  
        editorTodos: "",//记录正在编辑的数据  
        beforeTitle:'',  
  
        visibility: "all",//通过属性值变化对数据进行筛选  
    },  
    watch:{  
        /*list: function () {//监控list数据，当这个 
            store.save("miaov",this.list); 
        }*/  
        list: {  
            handler: function () {  
                store.save("miaov",this.list);  
            },  
            deep: true  
        },  
  
    },  
    computed:{  
        noCheckedLength: function () {  
            return this.list.filter(function(item){  
                return !item.isChecked  
            }).length  
        },  
        filteredList: function () {  
            // 过滤的三种情况  
            var filter = {  
                all: function () {  
                    return list;  
                },  
                finished: function () {  
                     return list.filter(function(item){  
                            return item.isChecked;  
                     });  
                },  
                unfinished: function () {  
                     return list.filter(function(item){  
                             return !item.isChecked;  
                             });  
                }  
            }; 
            return filter[this.visibility]?filter[this.visibility](list):list;  
        }  
    },  
    methods: {  
        addTodo(data,event) {  
            //添加任务  
            //向list中添加一项任务  
            //事件处理函数中的this指向的是当前的根实例  
            // if(event.keyCode === 13){  
                this.list.push({  
                    title: this.todo,  
                    isChecked: false  
                });  
            // }  
            this.todo="";  
  
        },  
        deleteTodo(todo){  
            var index = this.list.indexOf(todo);  
            this.list.splice(index,1);  
        },  
        editorTodo(todo){//编辑任务  
            // console.log(todo);  
            this.beforeTitle = todo.title;  
            this.editorTodos = todo;  
            console.log(todo);  
            console.log(this.editorTodos);  
        },  
        editorTodoed(todo){//编辑成功  
            this.editorTodos='';  
        },  
        cancelTodo(todo){//取消编辑  
            todo.title = this.beforeTitle;  
            this.editorTodos='';  
            this.beforeTitle = '';  
        }  
    },  
    directives:{  
        "focus": {  
            update(el, binding){  
                // console.log(el);  
                // console.log(binding);  
                if(binding.value){  
                    el.focus();  
                }  
            }  
        }  
    }  
});  
function watchHashChange() {  
    var hash = window.location.hash.slice(1);  
    console.log(hash);  
    vm.visibility = hash;  
}  
watchHashChange();  
window.addEventListener("hashchange",watchHashChange);  

