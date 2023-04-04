import styles from "./NotFound.module.css"

function NotFound(){
    return <div className={styles.container}>
        <div className={styles.content}>
        <h1>Error 404</h1>
        <h2>Oops!</h2>
        <h3>Sorry, the page you are looking for does not exist.</h3>
        </div>
    </div>
}

export default NotFound;