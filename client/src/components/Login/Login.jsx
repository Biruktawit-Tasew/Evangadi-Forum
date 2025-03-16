import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../../axiosConfig'
import styles from './login.module.css'
import { BiSolidHide, BiShow } from "react-icons/bi";  

function LogIn() {
    const navigate = useNavigate();
    const emailDom = useRef();
    const passwordDom = useRef();
    const [passwordVisible, setPasswordVisible] = useState(false);  

    async function handleSubmit(e) {
        e.preventDefault();

        const emailValue = emailDom.current.value;
        const passValue = passwordDom.current.value;

        if (!emailValue || !passValue) {
            alert("Please provide all required information");
            return;
        }

        try {
            await axios.post('/users/login', {
                email: emailValue,
                password: passValue,
            })
            alert('Login successful');
            navigate('/');
        } catch (error) {
            alert(error?.response?.data?.msg);
            console.log(error.response.data);
        }
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(prevState => !prevState);
    };

    return (
        <section>
            <div className={styles.container__wrapper}>
                <div className={styles.login__container}>
                    <h1>Login to your account</h1>
                    <div className={styles.signup}>
                        Don’t have an account? <a href="#">Create a new account</a>
                    </div>
                    <br />

                    <form onSubmit={handleSubmit}>
                        <div className={styles.form}>
                            <input className={styles.email} type="email" placeholder="Email address" id="email" ref={emailDom} required />
                        </div>

                        <div className={styles.form}>
                            <input 
                                className={styles.parent} 
                                type={passwordVisible ? "text" : "password"} 
                                placeholder="********" 
                                id="password" 
                                ref={passwordDom} 
                                required 
                            />
                            <div onClick={togglePasswordVisibility}>
                                {passwordVisible ? (
                                    <BiShow size={30} className={styles.eye} />
                                ) : (
                                    <BiSolidHide size={30} className={styles.eye} />
                                )}
                            </div>
                        </div>
                        <div className={styles.forget}>
                            <a href="#">Forgot password?</a>
                        </div>
                        <button type="submit" className={styles.login__button}>Login</button>
                    </form>

                </div>
            </div>
        </section>
    );
}

export default LogIn;
