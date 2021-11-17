import React, { Component } from 'react';
import moment from 'moment';
import { Form,Formik,Field, ErrorMessage } from 'formik';
import TodoDataSerive from '../../api/todo/TodoDataService.js'

//用formik创建form--因为react创建form比较复杂
//用moment library 去format Date
class TodoComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.id,//传过来的id
            description:'',
            targetDate:'',
            isDone:false
        }
        this.onSubmit=this.onSubmit.bind(this)
    }

    onSubmit(values){
        TodoDataSerive.updateTodo(this.state.id,{
            id:this.state.id,
            username:'admin',
            description:values.description,
            targetDate:values.targetDate,
            isDone:values.isDone
        })
        .then(()=>this.props.history.push("/list"))//重新回到list页面

    }

    validate(values){
        let errors={}
        if(!values.description){
            errors.description='enter a description'
        }else if(values.description.length<5){
            errors.description='description should more than 5 characters'
        }
        return errors
    }

    componentDidMount(){
        TodoDataSerive.findById(this.state.id)
        .then(
            response=>
                this.setState({
                description:response.data.description,
                targetDate:moment(response.data.targetDate).format('YYYY-MM-DD'),
                isDone:response.data.isDone
            })
            
        )
    }
    render(){
        return(
            <div>
                <div className="container">
                    <Formik initialValues={
                        {
                            id:this.state.id,
                            description:this.state.description,
                            targetDate:this.state.targetDate,
                            isDone:this.state.isDone
                        }}
                        onSubmit={this.onSubmit}
                        validate={this.validate}
                        validateOnBlur={false}
                        validateOnChange={false}
                        enableReinitialize={true}>
                    
                        {(props)=>(
                            <Form>
                                <ErrorMessage name="description" className="alert alert-warning" component="div"/>
                                <ErrorMessage name="isDone" className="alert alert-warning" component="div"/>
                                <label>id</label>
                                <Field type='text' name='id' /><br/>
                                <label>description</label>
                                <Field type='text' name='description'/><br/>
                                <label>targetDate</label>
                                <Field type='date' name='targetDate'/><br/>
                                <label>isDone</label>
                                <Field type='text' name='isDone'/><br/>
                                <button className="btn btn-success" type="submit">Save</button> 
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        )
    }
}

export default TodoComponent