import React, { Component } from 'react';
import TodoDataSerive from '../../api/todo/TodoDataService.js'   
import moment from 'moment';

//we can pass method of parent component to child component as props  
class ListComponent extends Component{
    //constructor render componentDIdMount（lifecycle method）的执行顺序
    constructor(props){
        super(props)
        this.state ={
            list:[],
            message:null
        }
        this.deleteClicked =this.deleteClicked.bind(this)
        this.refresh=this.refresh.bind(this)
        this.updateClicked=this.updateClicked.bind(this)
        this.saveClicked=this.saveClicked.bind(this)
    }
    componentDidMount(){
        console.log("mount");
        this.refresh();
        
    }

    refresh(){
        TodoDataSerive.findAll()
        .then(
            response=>{
                console.log('here')
                console.log(response.data);
                this.setState({list:response.data})
            }
        )
        .catch()
    }

    deleteClicked(id){
        console.log(id)
        TodoDataSerive.deleteById(id)
        .then(
            response=>{
                this.setState({message:`delete of todo id ${id} successfully`})
                this.refresh()
            }
        )
        .catch()
    }
 
    updateClicked(id){
        this.props.history.push(`/todos/${id}`)
        
    }

    saveClicked(){
        this.props.history.push(`/todos/${this.state.list.length+1}`)
    }
    

    render(){
        return(
            <>
            <h1>List</h1> 
            <button className="btn btn-success" onClick={this.saveClicked}>Add new Todo</button>
            {this.state.message&&<div className="alert alert-success">{this.state.message}</div>}
            <div className="container">
            <table className="table">
                <tr>
                    <th>id</th>
                    <th>description</th>
                    <th>targetDate</th>
                    <th>isDone</th>
                    <th>delete</th>
                    <th>update</th>
                </tr>
                {this.state.list.map(
                    todo =>
                        <tr key={todo.id}>
                            <td>{todo.id}</td>
                            <td>{todo.description}</td>  
                            <td>{moment(todo.targetDate).format("YYYY-MM-DD")}</td> 
                            <td>{todo.done.toString()}</td> 
                            <td><button className="btn btn-warning" onClick={()=>this.deleteClicked(todo.username,todo.id)}>delete</button></td>
                            <td><button className="btn btn-success" onClick={()=>this.updateClicked(todo.suername,todo.id)}>update</button></td>
                        </tr>
                    )}   
            </table>
            </div>
            
            </>
        )
    }
}
//可以在class外define default props，还可以作props的type check
//ListComponent.defaultProps = {by:1};
//ListComponent.propTypes={
//     by:propTypes.number
// }

export default ListComponent

