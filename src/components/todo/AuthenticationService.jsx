import axios from "axios";

class AuthenticationService {
     
    executeAuth(username,password){
        return axios.post('http://localhost:8080/authenticate',{
            username,password
        })

    }
    
    //sessionStorage在浏览器的application-local storage里面
    registerWithToken(username,token){
        let jwtToken = 'Bearer '+ token;
        console.log(jwtToken);
        sessionStorage.setItem("Username",username);
        this.setAxiosInterceptors(jwtToken);
    }

    logout(){
        sessionStorage.removeItem("Username");
    }

    isLoggedIn(){
        let name = sessionStorage.getItem("Username")
        // if(name===null) return false
        return true
    }

    getUsername(){
        let name = sessionStorage.getItem("Username")
        if(name===null) return ""
        return name
    }

    setAxiosInterceptors(jwtToken) {
        axios.interceptors.request.use(
            (config) => {
                if(this.isLoggedIn()) {
                    config.headers.authorization = jwtToken
                    console.log("拦截器设置成功")
                }
                return config
            }
        )
    }
}

export default new AuthenticationService()  //输出一个object 