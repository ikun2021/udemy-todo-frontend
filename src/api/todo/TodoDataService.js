import axios from "axios";
import { Component } from "react/cjs/react.production.min";

class TodoDataService extends Component{
    findAll(name){
        return axios.get(`http://localhost:8080/jpa/users/${name}/todos`)  
    }

    findById(name,id){
        return axios.get(`http://localhost:8080/jpa/users/${name}/todos/${id}`)
    }

    deleteById(name,id){
        return axios.delete(`http://localhost:8080/jpa/users/${name}/todos/${id}`)
    }

    updateTodo(name,id,todo){
        return axios.put(`http://localhost:8080/jpa/users/${name}/todos/${id}`,todo)
    }

    
    createTodo(name,todo){
        return axios.post(`http://localhost:8080/jpa/users/${name}/todos`,todo)
    }
}

export default new TodoDataService()