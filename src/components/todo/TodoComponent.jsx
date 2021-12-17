import React, { Component } from 'react';
import moment from 'moment';
import { Form,Formik,Field, ErrorMessage } from 'formik';
import TodoDataSerive from '../../api/todo/TodoDataService.js'
import { useParams,useNavigate } from 'react-router';

//用formik创建form--因为react创建form比较复杂
//用moment library 去format Date
class TodoComponent extends Component{
    
    constructor(props){
        super(props)
        this.state={
            description:'',
            targetDate:moment(new Date()).format('YYYY-MM-DD'),
            isDone:false
        }
        this.onSubmit=this.onSubmit.bind(this)
    }
    

    //先validate 后submit
    validate(values){
        let errors={}
        if(!values.description){
            errors.description='enter a description'
        }else if(values.description.length<5){
            errors.description='description should more than 5 characters'
        }
        if(!moment(values.targetDate).isValid()){
            errors.targetDate='enter a valid date'
        }
        return errors
    }

    onSubmit(values){
        const params = this.props.myUseParams
        const myId = params.id
        const navigate = this.props.myNavigate
        let name = sessionStorage.getItem("Username")
        if(myId===-1){
            TodoDataSerive.createTodo(name,{
                description:values.description,
                targetDate:values.targetDate,
                done:values.isDone
            })
            .then(()=>navigate("/list"))
        }else{
            TodoDataSerive.updateTodo(name,myId,{
                id:myId,
                description:values.description,
                targetDate:values.targetDate,
                done:values.isDone
            })
            .then(()=>navigate("/list"))
        }
        

    }

    componentDidMount(){
        console.log(this.props)
        const params = this.props.myUseParams
        const myId = params.id
        if(myId===-1){
            return
        }
        let name = sessionStorage.getItem("Username")
        TodoDataSerive.findById(name,myId)
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
                    <Formik 
                    initialValues={ {
                            description:this.state.description,
                            targetDate:this.state.targetDate,
                            isDone:this.state.isDone
                        }}
                        validate={this.validate}
                        onSubmit={this.onSubmit}
                        validateOnBlur={false}
                        validateOnChange={false}
                        // 修改数据以后能在页面展示，而不是显示原来的数据
                        enableReinitialize={true}>   
                    
                        {(props)=>(
                            <Form>
                                <ErrorMessage name="description" className="alert alert-warning" component="div"/>
                                <ErrorMessage name="isDone" className="alert alert-warning" component="div"/>
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

function withMyHook(Component) {
    return function WrappedComponent(props) {
      const myNavigate = useNavigate();
      const myUseParams = useParams();
      return <Component {...props} myNavigate={myNavigate} myUseParams={myUseParams} />;
    }
}

export default withMyHook(TodoComponent)